/**
 * NyayaGuide AI - RAG Knowledge Retrieval & Decision Engine
 * 
 * Performs semantic keyword and category matching against verified statutory
 * frameworks, applies state-specific overrides, and injects official authorities.
 */

import {
  CATEGORIES,
  VERIFIED_SOURCES_DIRECTORY,
  STATE_AUTHORITY_MAPPINGS,
  SCENARIO_KNOWLEDGE_BASE,
  EMERGENCY_HELPLINES
} from '../data/verifiedSources.js';

export class RagEngine {
  /**
   * Evaluates text for emergency indicators
   */
  detectEmergency(queryText) {
    const text = queryText.toLowerCase();
    const urgentKeywords = [
      'suicide', 'kill', 'threat to life', 'murder', 'physically beating',
      'beaten', 'bleeding', 'assault', 'weapon', 'rape', 'sexual assault',
      'child abuse', 'molestation', 'kidnap', 'immediate danger', 'hostage'
    ];

    for (const kw of urgentKeywords) {
      if (text.includes(kw)) {
        return {
          isEmergency: true,
          matchedKeyword: kw,
          helpline: '112',
          message: 'IMMEDIATE SAFETY ALERT: Your situation may involve imminent physical danger or a serious cognizable crime. Please prioritize your safety and contact National Emergency Helpline (112) or approach the nearest police station immediately.',
          contacts: EMERGENCY_HELPLINES.filter(h => h.urgent)
        };
      }
    }
    return null;
  }

  /**
   * Retrieves relevant knowledge and synthesizes structured guidance
   */
  retrieveKnowledge({ query, category, state, district, answers = {} }) {
    const normalizedQuery = (query || '').toLowerCase().trim();
    const queryTokens = normalizedQuery.split(/\W+/).filter(t => t.length > 2);
    const emergency = this.detectEmergency(normalizedQuery);

    let bestScenario = null;
    let maxScore = -1;

    for (const scenario of SCENARIO_KNOWLEDGE_BASE) {
      let score = 0;

      // Category match boost
      if (category && (scenario.category === category || category === 'other')) {
        score += 15;
      }

      // Keyword matches
      for (const kw of scenario.keywords) {
        if (normalizedQuery.includes(kw)) {
          score += 10;
        }
        for (const token of queryTokens) {
          if (kw.includes(token) || token.includes(kw)) {
            score += 4;
          }
        }
      }

      if (score > maxScore) {
        maxScore = score;
        bestScenario = scenario;
      }
    }

    // Default fallback if score is too low or out of domain
    if (!bestScenario || maxScore < 5) {
      bestScenario = this.buildGeneralFallback(query, category);
    }

    // Clone scenario to augment with state and custom data
    const result = JSON.parse(JSON.stringify(bestScenario));

    // Augment with state-specific authorities if state provided
    const stateKey = (state || '').toLowerCase().replace(/[^a-z]/g, '');
    const stateInfo = STATE_AUTHORITY_MAPPINGS[stateKey];

    if (stateInfo) {
      result.stateApplied = stateInfo.stateName;

      // Inject state-specific public service authority
      if (result.category === 'government' && stateInfo.publicServices) {
        result.authority.unshift({
          name: `${stateInfo.publicServices.portalName} (${stateInfo.stateName})`,
          role: `State Public Services Grievance Authority under ${stateInfo.publicServices.act}`,
          portal: stateInfo.publicServices.portalName,
          url: stateInfo.publicServices.portalUrl,
          contact_note: `Helpline: ${stateInfo.publicServices.helpline}`,
          how_to_approach: `Lodge an online application/appeal directly with ${stateInfo.stateName} State Portal.`
        });
        result.sources.push({
          title: `${stateInfo.publicServices.act} - Official State Portal`,
          organization: `${stateInfo.stateName} State Government`,
          url: stateInfo.publicServices.portalUrl,
          verified: true,
          category: 'government'
        });
      }

      // Inject state cyber police if cyber issue
      if (result.category === 'cyber' && stateInfo.cyberPolice) {
        result.authority.unshift({
          name: `${stateInfo.cyberPolice.authority}`,
          role: `State Cyber Crime Investigation Division (${stateInfo.stateName})`,
          portal: 'State Police Cyber Cell',
          url: '',
          contact_note: `Helpline: ${stateInfo.cyberPolice.helpline}`,
          how_to_approach: 'File formal representation in coordination with the 1930 NCRP docket.'
        });
      }

      // Inject state RERA / tenancy if housing
      if (result.category === 'housing' && stateInfo.tenancyRera) {
        result.authority.unshift({
          name: `${stateInfo.tenancyRera.authority}`,
          role: `State Housing & Tenancy Adjudication Forum (${stateInfo.stateName})`,
          portal: 'State RERA / Rent Court',
          url: stateInfo.tenancyRera.portalUrl,
          contact_note: 'Approach for conciliation or statutory deposit refund order.',
          how_to_approach: 'File online conciliation petition or visit designated District Rent Court.'
        });
      }
    }

    // Determine follow-up guided questions if context is incomplete
    result.guided_questions = this.determineGuidedQuestions(normalizedQuery, result.category, state, answers);

    // Generate formal draft template
    result.complaint_draft_template = this.generateDraftTemplate({
      title: result.title,
      category: result.category,
      userQuery: query,
      primaryAuthority: result.authority[0]?.name || 'Competent Authority',
      state: state || 'Your State',
      district: district || 'Your District'
    });

    result.emergency_alert = emergency;

    return result;
  }

  /**
   * Generates intelligent guided follow-up questions
   */
  determineGuidedQuestions(query, category, state, answers) {
    const questions = [];

    if (!state && !answers.state) {
      questions.push({
        id: 'state_selection',
        question: 'Which Indian State or Union Territory does this issue relate to?',
        options: ['Karnataka', 'Maharashtra', 'Delhi', 'Tamil Nadu', 'Uttar Pradesh', 'Other State']
      });
    }

    if (category === 'education' && !answers.has_written_proof) {
      questions.push({
        id: 'has_written_proof',
        question: 'Do you have written proof of your request (e.g. an email, letter with receiving seal, or fee receipt)?',
        options: ['Yes, I have written proof / email', 'No, requests were verbal only', 'I have fee receipts only']
      });
    }

    if (category === 'consumer' && !answers.merchant_notified) {
      questions.push({
        id: 'merchant_notified',
        question: 'Have you already written to the platform’s designated Grievance Officer or Customer Support?',
        options: ['Yes, customer support refused refund', 'Yes, but received no response for over 48 hours', 'Not yet, seeking guidance first']
      });
    }

    if (category === 'cyber' && !answers.screenshots_saved) {
      questions.push({
        id: 'screenshots_saved',
        question: 'Have you preserved uncropped screenshots showing sender phone numbers or usernames?',
        options: ['Yes, uncropped screenshots preserved', 'Only partial screenshots', 'Messages were deleted']
      });
    }

    return questions;
  }

  /**
   * General fallback for broad or novel queries
   */
  buildGeneralFallback(query, category) {
    const matchedCategory = CATEGORIES.find(c => c.id === category) || CATEGORIES[CATEGORIES.length - 1];

    return {
      id: 'general_citizen_guidance',
      category: matchedCategory.id,
      title: `Citizen Guidance for ${matchedCategory.name}`,
      summary: `Your inquiry relates to ${matchedCategory.name}. While this situation involves specific factual nuances, Indian administrative and civil law provides structured grievance redressal mechanisms and statutory consumer / citizen protections.`,
      possible_rights_or_rules: [
        {
          rule: 'Principles of Natural Justice & Administrative Fair Procedure (Article 14 & 21)',
          description: 'Every citizen is entitled to fair consideration of grievances without arbitrary administrative delay or procedural oppression.',
          cautionary_note: 'Factual evidence must be systematically preserved before submitting legal notices.'
        },
        {
          rule: 'Legal Services Authorities Act, 1987',
          description: 'Guarantees free legal aid, legal representation, and pre-litigation Lok Adalat mediation through District and State Legal Services Authorities.',
          cautionary_note: 'Income eligibility thresholds apply, though women, children, and SC/ST citizens are eligible regardless of income.'
        }
      ],
      immediate_actions: [
        { step: 1, title: 'Compile a Chronological Fact Sheet', description: 'Write down a clean timeline of events, dates, communications, and parties involved.', priority: 'High' },
        { step: 2, title: 'Send Written Notice or Grievance', description: 'Submit a formal written representation via Registered Post or official email to establish a verifiable paper trail.', priority: 'High' },
        { step: 3, title: 'Lodge Grievance with Statutory Nodal Authority', description: 'Approach the designated administrative or regulatory grievance portal (e.g. CPGRAMS, Consumer Forum, or District Collectorate).', priority: 'Medium' },
        { step: 4, title: 'Consult Free Legal Aid (NALSA / DLSA)', description: 'If unresolved, visit the District Legal Services Authority at your local district court complex for free legal counsel.', priority: 'Medium' }
      ],
      authority: [
        {
          name: 'Centralized Public Grievance Redress & Monitoring System (CPGRAMS)',
          role: 'Apex citizen grievance portal connecting all major ministries and departments.',
          portal: 'CPGRAMS Portal',
          url: 'https://pgportal.gov.in',
          contact_note: 'Toll-free and online registration available 24x7.',
          how_to_approach: 'Register online with scanned copies of your written complaints.'
        },
        {
          name: 'District Legal Services Authority (DLSA) / Taluk Legal Services Committee',
          role: 'Statutory body providing free legal counsel and pre-litigation mediation.',
          portal: 'NALSA Portal',
          url: 'https://nalsa.gov.in',
          contact_note: 'Helpline: 15100',
          how_to_approach: 'Visit in person at the local District Court complex.'
        }
      ],
      documents: [
        { id: 'doc-gen-1', name: 'Identity & Address Proof (Aadhaar / Voter ID)', purpose: 'Verification of bonafide complainant identity', is_essential: true },
        { id: 'doc-gen-2', name: 'Written Representations / Communication Proof', purpose: 'Evidence of previous attempts to resolve amicably', is_essential: true },
        { id: 'doc-gen-3', name: 'Transaction Slips / Receipts / Agreements', purpose: 'Corroborating documentation of underlying transaction or relationship', is_essential: true }
      ],
      escalation: [
        { tier: 1, level: 'First Authority / Grievance Officer', authority: 'Opposite Party / Local Office', condition: 'Initial dispute', next_step: 'Submit formal written notice giving 15 days deadline' },
        { tier: 2, level: 'Departmental Grievance Portal', authority: 'CPGRAMS / Sectoral Regulator', condition: 'No response after 15 days', next_step: 'File statutory grievance online' },
        { tier: 3, level: 'Pre-Litigation Mediation', authority: 'DLSA / Lok Adalat', condition: 'Dispute remains unresolved', next_step: 'Seek free mediation at District Court complex' },
        { tier: 4, level: 'Judicial / Tribunal Remedy', authority: 'Competent Court / High Court', condition: 'Legal rights infringed', next_step: 'Engage legal counsel to file appropriate petition or suit' }
      ],
      sources: [
        { title: 'National Legal Services Authority (NALSA)', organization: 'Supreme Court of India', url: 'https://nalsa.gov.in', verified: true, category: 'other' },
        { title: 'CPGRAMS Citizen Portal', organization: 'Govt. of India', url: 'https://pgportal.gov.in', verified: true, category: 'government' }
      ],
      warning: 'NyayaGuide AI provides general civic and legal information for guidance purposes only. It is not a substitute for a qualified lawyer or judicial authority.'
    };
  }

  /**
   * Generates a formal complaint letter draft template
   */
  generateDraftTemplate({ title, category, userQuery, primaryAuthority, state, district }) {
    const today = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    return `Date: ${today}

To,
The Grievance Redressal Officer / Head of Office,
${primaryAuthority},
${district}, ${state}

SUBJECT: Formal Representation & Grievance Regarding ${title}

Respected Sir/Madam,

I am writing this formal representation to bring to your urgent attention a serious grievance that requires your immediate administrative intervention.

1. BACKGROUND & STATEMENT OF FACTS:
${userQuery}

2. STATUTORY RIGHTS & PROCEDURAL ENTITLEMENT:
Under the applicable rules and guidelines established by the Government of India and statutory authorities governing this matter, I am entitled to fair, time-bound consideration and redressal. The actions or omissions in question cause substantial hardship, mental agony, and disruption.

3. PRESERVATION OF EVIDENCE:
I have maintained all relevant supporting documents, receipts, communications, and evidence in safe custody, copies of which are attached herewith for your ready perusal.

4. RELIEF SOUGHT:
In light of the above facts, I respectfully request your good office to:
  a) Take immediate cognizance of this grievance;
  b) Initiate appropriate inquiry and grant the necessary relief/documents/refund without further delay;
  c) Issue a formal written acknowledgement and decision within 7 working days.

Kindly note that should this matter remain unaddressed within the stipulated time, I reserve the statutory right to escalate this complaint to the appropriate Appellate Authority, Ombudsman, and the District Legal Services Authority / Consumer Commission.

Thanking you,

Yours sincerely,

___________________________
[Complainant Name]
[Address / Contact Number]
[Email Address]

Enclosures:
1. Proof of Identity & Address
2. Copy of Receipts / Communications
3. Relevant Supporting Evidence`;
  }
}

export const ragEngine = new RagEngine();
