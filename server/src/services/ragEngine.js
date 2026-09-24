/**
 * NyayaGuide AI - Enhanced RAG Knowledge Retrieval & Decision Engine
 * 
 * Multi-factor retrieval engine grounded strictly in curated Indian statutory frameworks.
 * Implements intent classification (emergency detection, guaranteed outcome traps,
 * officer contact traps, insufficient details, and out-of-domain rejection).
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
   * Pre-processes query tokens
   */
  tokenize(text) {
    return (text || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(t => t.length > 2);
  }

  /**
   * Evaluates text for emergency, immediate harm, or acute violence indicators
   */
  detectEmergency(queryText) {
    const text = (queryText || '').toLowerCase();
    
    // High-priority emergency triggers
    const emergencyTriggers = [
      {
        type: 'suicide_selfharm',
        keywords: ['suicide', 'kill myself', 'end my life', 'want to die', 'self harm', 'hang myself'],
        helpline: '14416',
        helplineName: 'Tele-MANAS (24x7 Mental Health & Crisis Helpline)',
        message: 'IMMEDIATE SUPPORT ALERT: If you or someone you know is going through distress or thoughts of self-harm, please reach out immediately. Free, confidential support is available 24/7 across India on Tele-MANAS (14416 / 1800-891-4416) or National Emergency Helpline (112).'
      },
      {
        type: 'sexual_violence_assault',
        keywords: ['rape', 'sexual assault', 'molestation', 'pocso', 'child sexual', 'raped', 'physically beating me right now'],
        helpline: '112',
        helplineName: 'National Emergency (112) / Women Helpline (181) / Childline (1098)',
        message: 'IMMEDIATE SAFETY ALERT: This situation involves a serious criminal offence and potential risk to physical safety. Please prioritize your physical security and immediately contact National Emergency (112) or Women Helpline (181) / Childline (1098).'
      },
      {
        type: 'physical_violence',
        keywords: ['threat to life', 'murder threat', 'weapon', 'holding hostage', 'kidnapped', 'actively beating', 'bleeding'],
        helpline: '112',
        helplineName: 'National Emergency Helpline (112)',
        message: 'IMMEDIATE EMERGENCY DISPATCH: For threats to life or active violent offences, contact National Police & Emergency Dispatch at 112 immediately.'
      },
      {
        type: 'cyber_financial_golden_hour',
        keywords: ['account hacked just now', 'money deducted right now', 'otp scam just now', 'lost all money online', 'blackmailing with photos'],
        helpline: '1930',
        helplineName: 'National Cyber Crime & Financial Fraud Helpline (1930)',
        message: 'URGENT GOLDEN-HOUR CYBER PROTOCOL: For active financial fraud or extortion with intimate media, dial 1930 immediately to freeze the recipient mule account and lodge a docket at cybercrime.gov.in.'
      }
    ];

    for (const trigger of emergencyTriggers) {
      for (const kw of trigger.keywords) {
        if (text.includes(kw)) {
          return {
            isEmergency: true,
            triggerType: trigger.type,
            matchedKeyword: kw,
            helpline: trigger.helpline,
            helplineName: trigger.helplineName,
            message: trigger.message,
            contacts: EMERGENCY_HELPLINES.filter(h => h.urgent)
          };
        }
      }
    }

    return null;
  }

  /**
   * Identifies intent edge-cases:
   * - Guaranteed win traps
   * - Specific officer phone number requests
   * - Insufficient details
   * - Out of domain queries
   */
  classifyIntent(query, category) {
    const text = (query || '').toLowerCase().trim();
    const tokens = this.tokenize(text);

    // 1. Guaranteed Outcome Trap
    const guaranteePhrases = [
      'guarantee i win', 'guarantee win', 'guaranteed to win', '100% win',
      'law that will guarantee', 'definitely win my case', 'sure shot win'
    ];
    if (guaranteePhrases.some(p => text.includes(p))) {
      return { type: 'GUARANTEED_WIN_TRAP' };
    }

    // 2. Specific Officer Contact Trap
    const officerContactPhrases = [
      'phone number of a government officer', 'phone number of an officer',
      'give me the mobile number of', 'contact number of tehsildar',
      'give me the phone number of a government', 'give me the personal number'
    ];
    if (officerContactPhrases.some(p => text.includes(p))) {
      return { type: 'OFFICER_PHONE_TRAP' };
    }

    // 3. Insufficient Details Query
    if (tokens.length < 3 || text === 'what law applies to my problem?' || text === 'what is my law?' || text === 'help me') {
      return { type: 'INSUFFICIENT_DETAILS' };
    }

    // 4. Out of Domain Query (Non-legal, culinary, coding, trivia, sports)
    const outOfDomainWords = [
      'chocolate cake', 'recipe', 'bake', 'cricket score', 'movie review',
      'javascript function', 'python code', 'weather tomorrow', 'joke', 'lyrics'
    ];
    if (outOfDomainWords.some(w => text.includes(w))) {
      return { type: 'OUT_OF_DOMAIN' };
    }

    return { type: 'LEGAL_INQUIRY' };
  }

  /**
   * Core multi-factor knowledge retrieval
   */
  retrieveKnowledge({ query, category, state, district, answers = {} }) {
    const rawQuery = (query || '').trim();
    const normalizedQuery = rawQuery.toLowerCase();
    const tokens = this.tokenize(normalizedQuery);
    const emergency = this.detectEmergency(normalizedQuery);
    const intent = this.classifyIntent(rawQuery, category);

    // Handle Edge Case: Guaranteed Outcome Trap
    if (intent.type === 'GUARANTEED_WIN_TRAP') {
      return this.buildGuaranteedOutcomeTrapResponse(rawQuery, category);
    }

    // Handle Edge Case: Specific Officer Contact Trap
    if (intent.type === 'OFFICER_PHONE_TRAP') {
      return this.buildOfficerPhoneTrapResponse(rawQuery, state);
    }

    // Handle Edge Case: Insufficient Details
    if (intent.type === 'INSUFFICIENT_DETAILS') {
      return this.buildInsufficientDetailsResponse(rawQuery);
    }

    // Handle Edge Case: Out of Domain
    if (intent.type === 'OUT_OF_DOMAIN') {
      return this.buildOutOfDomainResponse(rawQuery);
    }

    // Step 1: Multi-factor scoring against Curated Knowledge Base
    let bestScenario = null;
    let maxScore = -1;

    for (const scenario of SCENARIO_KNOWLEDGE_BASE) {
      let score = 0;

      // Category match
      if (category && (scenario.category === category || category === 'other')) {
        score += 15;
      }

      // Exact keyword matches
      for (const kw of scenario.keywords) {
        if (normalizedQuery.includes(kw)) {
          score += 12;
        }
        for (const token of tokens) {
          if (kw.includes(token) || token.includes(kw)) {
            score += 3;
          }
        }
      }

      // Title & Summary relevance
      const titleTokens = this.tokenize(scenario.title);
      for (const t of tokens) {
        if (titleTokens.includes(t)) {
          score += 5;
        }
      }

      if (score > maxScore) {
        maxScore = score;
        bestScenario = scenario;
      }
    }

    // Low confidence fallback
    if (!bestScenario || maxScore < 6) {
      bestScenario = this.buildGeneralFallback(rawQuery, category);
    }

    // Clone scenario to apply state and context overrides
    const result = JSON.parse(JSON.stringify(bestScenario));

    // Step 2: Jurisdiction & State Augmentation
    const stateKey = (state || '').toLowerCase().replace(/[^a-z]/g, '');
    const stateInfo = STATE_AUTHORITY_MAPPINGS[stateKey];

    if (stateInfo) {
      result.stateApplied = stateInfo.stateName;

      // Inject state public service authority if applicable
      if (result.category === 'government' && stateInfo.publicServices) {
        result.authority.unshift({
          name: `${stateInfo.publicServices.portalName} (${stateInfo.stateName})`,
          role: `State Public Services Grievance Authority under ${stateInfo.publicServices.act}`,
          portal: stateInfo.publicServices.portalName,
          url: stateInfo.publicServices.portalUrl,
          contact_note: `Official Helpline: ${stateInfo.publicServices.helpline}`,
          how_to_approach: `Lodge an online service delay appeal directly through ${stateInfo.stateName} State Portal.`
        });
        result.sources.push({
          title: `${stateInfo.publicServices.act} - Official State Portal`,
          organization: `${stateInfo.stateName} State Government`,
          url: stateInfo.publicServices.portalUrl,
          verified: true,
          category: 'government'
        });
      }

      // Inject state cyber police
      if (result.category === 'cyber' && stateInfo.cyberPolice) {
        result.authority.unshift({
          name: `${stateInfo.cyberPolice.authority}`,
          role: `State Cyber Crime Division (${stateInfo.stateName})`,
          portal: 'National Cybercrime Reporting Portal',
          url: stateInfo.cyberPolice.portalUrl,
          contact_note: `Emergency Helplines: ${stateInfo.cyberPolice.helpline}`,
          how_to_approach: 'File formal representation in coordination with the 1930 NCRP docket.'
        });
      }

      // Inject state tenancy / RERA
      if (result.category === 'housing' && stateInfo.tenancyRera) {
        result.authority.unshift({
          name: `${stateInfo.tenancyRera.authority}`,
          role: `State Housing & Tenancy Dispute Adjudication (${stateInfo.stateName})`,
          portal: 'State RERA / Mediation Centre',
          url: stateInfo.tenancyRera.portalUrl,
          contact_note: 'Approach for pre-litigation conciliation or formal deposit recovery order.',
          how_to_approach: 'File online conciliation petition or visit designated District Rent Court.'
        });
      }
    }

    // Filter relevant sources from VERIFIED_SOURCES_DIRECTORY
    const matchingSources = VERIFIED_SOURCES_DIRECTORY.filter(s => s.category === result.category);
    if (matchingSources.length > 0) {
      for (const m of matchingSources) {
        if (!result.sources.some(existing => existing.url === m.url)) {
          result.sources.push({
            title: m.title,
            organization: m.organization,
            url: m.url,
            verified: m.verified,
            category: m.category,
            sourceType: m.sourceType
          });
        }
      }
    }

    // Step 3: Determine guided follow-up questions
    result.guided_questions = this.determineGuidedQuestions(normalizedQuery, result.category, state, answers);

    // Step 4: Generate formal complaint letter draft template
    result.complaint_draft_template = this.generateDraftTemplate({
      title: result.title,
      category: result.category,
      userQuery: rawQuery,
      primaryAuthority: result.authority[0]?.name || 'Competent Grievance Officer',
      state: state || 'Your State',
      district: district || 'Your District'
    });

    result.emergency_alert = emergency;
    result.knowledge_source = 'Curated Official Statutory Knowledge Base';

    return result;
  }

  /**
   * Generates guided follow-up questions
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
   * Guaranteed Outcome Trap response
   */
  buildGuaranteedOutcomeTrapResponse(query, category) {
    return {
      id: 'no_guaranteed_outcome',
      category: category || 'other',
      title: 'Clarification on Legal Outcomes & Judicial Process',
      summary: 'Under the Indian legal and judicial framework, no statute, section, or rule guarantees a specific legal victory. Legal outcomes depend entirely on evidence, burden of proof, factual verification, cross-examination, and judicial or administrative discretion.',
      possible_rights_or_rules: [
        {
          rule: 'Principles of Natural Justice & Burden of Proof (Section 101, Indian Evidence Act / Section 104 BSA 2023)',
          description: 'Whoever desires any court to give judgment as to any legal right dependent on facts must prove those facts exist. Success in any forum requires admissible evidence rather than statutory guarantees.',
          cautionary_note: 'Beware of any individual or service claiming a "100% guaranteed outcome" in legal or consumer matters.'
        }
      ],
      immediate_actions: [
        { step: 1, title: 'Understand That Outcomes Cannot Be Guaranteed', description: 'Be cautious of anyone promising certain victory. Focus on compiling verifiable factual evidence and chronological records.', priority: 'High' },
        { step: 2, title: 'Identify the Specific Grievance Mechanism', description: 'Determine whether your issue is educational, consumer, tenancy, workplace, or administrative, and use the prescribed grievance portal.', priority: 'High' },
        { step: 3, title: 'Consult an Independent Legal Professional', description: 'For individualized evaluation of case strength, consult a licensed advocate or visit the District Legal Services Authority (DLSA) for free advice.', priority: 'Medium' }
      ],
      authority: [
        {
          name: 'National Legal Services Authority (NALSA) / District Legal Services Authority (DLSA)',
          role: 'Statutory body providing free, objective legal counsel to evaluate merit and procedural options.',
          portal: 'NALSA Official Portal',
          url: 'https://nalsa.gov.in',
          contact_note: 'National Legal Aid Helpline: 15100',
          how_to_approach: 'Visit the DLSA office at your local District Court Complex.'
        }
      ],
      documents: [
        { id: 'doc-g-1', name: 'Chronological Statement of Facts', purpose: 'Objective summary of events without emotional embellishment', is_essential: true },
        { id: 'doc-g-2', name: 'Documentary Proof & Communications', purpose: 'Corroborates the sequence of events', is_essential: true }
      ],
      escalation: [
        { tier: 1, level: 'Fact Gathering', authority: 'Individual Preparation', condition: 'Initial assessment', next_step: 'Compile documented evidence' },
        { tier: 2, level: 'Legal Aid Evaluation', authority: 'DLSA / Free Legal Aid (15100)', condition: 'Uncertain merits', next_step: 'Request objective merit assessment' }
      ],
      sources: [
        { title: 'National Legal Services Authority (NALSA)', organization: 'Supreme Court of India', url: 'https://nalsa.gov.in', verified: true, category: 'other' }
      ],
      warning: 'NyayaGuide AI provides general civic guidance. It will never guarantee legal results or predict judicial verdicts. Consult a qualified advocate for professional representation.',
      guided_questions: [],
      emergency_alert: null,
      knowledge_source: 'Curated Official Statutory Knowledge Base',
      complaint_draft_template: ''
    };
  }

  /**
   * Officer Phone Number Trap response
   */
  buildOfficerPhoneTrapResponse(query, state) {
    return {
      id: 'officer_phone_policy',
      category: 'government',
      title: 'Guidance on Government Department Contacts & Official Helplines',
      summary: 'NyayaGuide AI does not maintain or provide private mobile numbers or direct telephone numbers of individual government officers. Contact information for public officials must always be verified through official departmental directories (.gov.in) to prevent fraud or impersonation.',
      possible_rights_or_rules: [
        {
          rule: 'Section 4(1)(b) of the Right to Information Act, 2005 (Proactive Public Disclosure)',
          description: 'Mandates every public authority to proactively publish a directory of its officers and employees, including official telephone numbers and designations, on its official website.',
          cautionary_note: 'Never contact private or unverified phone numbers found on social media claiming to be government officials.'
        }
      ],
      immediate_actions: [
        { step: 1, title: 'Use Official Government Portals (.gov.in / .nic.in)', description: 'Visit the official departmental portal and navigate to the "Contact Us" or "Directory" section to locate official landline numbers and designated office addresses.', priority: 'High' },
        { step: 2, title: 'Utilize National Citizen Helplines', description: 'For consumer matters, call 1915; for cyber fraud, call 1930; for emergency, call 112; for legal aid, call 15100; for public grievances, use pgportal.gov.in.', priority: 'High' },
        { step: 3, title: 'Visit Departmental Office During Citizen Grievance Hours', description: 'Public officials (e.g. Tehsildar, Sub-Registrar) have designated public hearing hours (typically 10 AM to 1 PM on specified working days).', priority: 'Medium' }
      ],
      authority: [
        {
          name: 'Centralized Public Grievance Redress & Monitoring System (CPGRAMS)',
          role: 'Official portal providing verified routing to departmental nodal officers.',
          portal: 'CPGRAMS Portal',
          url: 'https://pgportal.gov.in',
          contact_note: 'Online grievance tracking available 24x7',
          how_to_approach: 'Register an official docket on pgportal.gov.in.'
        },
        {
          name: 'National Government Services Portal (services.india.gov.in)',
          role: 'Single-window national access to government departments and verified officer directories.',
          portal: 'National Services Directory',
          url: 'https://services.india.gov.in',
          contact_note: 'Official National Government Services directory',
          how_to_approach: 'Search by state and department name for published officer listings.'
        }
      ],
      documents: [
        { id: 'doc-p-1', name: 'Application / Token Acknowledgement Number', purpose: 'Required when quoting your file before any public official', is_essential: true }
      ],
      escalation: [
        { tier: 1, level: 'Official Directory Lookup', authority: 'Official State/Central Portal (.gov.in)', condition: 'Officer contact needed', next_step: 'Consult published contact directory' },
        { tier: 2, level: 'Public Grievance Escalation', authority: 'CPGRAMS (pgportal.gov.in)', condition: 'Officer unreachable', next_step: 'Submit formal online grievance docket' }
      ],
      sources: [
        { title: 'National Government Services Portal', organization: 'Govt. of India', url: 'https://services.india.gov.in', verified: true, category: 'government' },
        { title: 'CPGRAMS Citizen Portal', organization: 'Govt. of India', url: 'https://pgportal.gov.in', verified: true, category: 'government' }
      ],
      warning: 'Never send money or personal credentials to unverified phone numbers claiming to belong to public officials. Only use verified government portals (.gov.in).',
      guided_questions: [],
      emergency_alert: null,
      knowledge_source: 'Curated Official Statutory Knowledge Base',
      complaint_draft_template: ''
    };
  }

  /**
   * Insufficient details response
   */
  buildInsufficientDetailsResponse(query) {
    return {
      id: 'insufficient_details',
      category: 'other',
      title: 'Additional Information Required to Identify Applicable Rules',
      summary: 'Your query is too brief to safely determine which Indian law, department, or procedure applies. To provide accurate guidance without guessing, NyayaGuide AI requires a brief factual description of what occurred.',
      possible_rights_or_rules: [
        {
          rule: 'Citizen Legal Guidance Framework',
          description: 'Different areas of Indian law apply depending on the subject matter: UGC regulations for colleges, Consumer Protection Act for product/service defects, IT Act for online harassment, and Tenancy Acts for rental disputes.',
          cautionary_note: 'Providing factual context ensures you receive the correct authority and document checklist.'
        }
      ],
      immediate_actions: [
        { step: 1, title: 'Describe the Core Subject Matter', description: 'Specify who is involved (e.g., college, landlord, employer, online merchant, bank, or government office).', priority: 'High' },
        { step: 2, title: 'State What Happened and When', description: 'Briefly explain the action taken by the other party (e.g., refused refund, withheld certificates, deducted unauthorized money, or delayed document).', priority: 'High' },
        { step: 3, title: 'Indicate What Action You Have Already Taken', description: 'Mention if you have sent an email, letter, or registered complaint, and whether you received an answer.', priority: 'Medium' }
      ],
      authority: [
        {
          name: 'NyayaGuide AI Problem Categorizer',
          role: 'Select a matching category above or describe your issue in a complete sentence.',
          portal: 'NyayaGuide AI Interface',
          url: '',
          contact_note: 'Select an option below or type a detailed question',
          how_to_approach: 'Click one of the suggested categories below.'
        }
      ],
      documents: [],
      escalation: [],
      sources: [
        { title: 'National Legal Services Authority (NALSA)', organization: 'Supreme Court of India', url: 'https://nalsa.gov.in', verified: true, category: 'other' }
      ],
      warning: 'Reliable official information could not be determined due to insufficient details. Please describe your situation or select one of the suggested scenarios.',
      guided_questions: [
        {
          id: 'category_picker',
          question: 'What domain does your problem belong to?',
          options: [
            'College / University issue',
            'Consumer product / Online refund',
            'Landlord / Security deposit',
            'Online threat / Cyber issue',
            'Delayed government document'
          ]
        }
      ],
      emergency_alert: null,
      knowledge_source: 'Curated Official Statutory Knowledge Base',
      complaint_draft_template: ''
    };
  }

  /**
   * Out of domain query response
   */
  buildOutOfDomainResponse(query) {
    return {
      id: 'out_of_domain',
      category: 'other',
      title: 'Topic Outside Citizen Rights & Legal Guidance Scope',
      summary: 'NyayaGuide AI is exclusively designed to provide guidance on Indian citizen rights, legal frameworks, consumer protection, education grievances, cyber security, and government service procedures. Your query appears to be unrelated to a civic or legal matter.',
      possible_rights_or_rules: [],
      immediate_actions: [
        { step: 1, title: 'Reframe with a Civic or Legal Issue', description: 'If you have an inquiry regarding consumer rights, tenancy, education, employment, or government services, please describe that situation.', priority: 'Medium' }
      ],
      authority: [],
      documents: [],
      escalation: [],
      sources: [
        { title: 'National Government Services Portal', organization: 'Govt. of India', url: 'https://services.india.gov.in', verified: true, category: 'other' }
      ],
      warning: 'NyayaGuide AI does not answer non-legal or general trivia questions. Please submit an inquiry related to Indian citizen rights or administrative grievances.',
      guided_questions: [],
      emergency_alert: null,
      knowledge_source: 'Curated Official Statutory Knowledge Base',
      complaint_draft_template: ''
    };
  }

  /**
   * General fallback for broad or novel legal queries
   */
  buildGeneralFallback(query, category) {
    const matchedCategory = CATEGORIES.find(c => c.id === category) || CATEGORIES[CATEGORIES.length - 1];

    return {
      id: 'general_citizen_guidance',
      category: matchedCategory.id,
      title: `Citizen Guidance for ${matchedCategory.name}`,
      summary: `Your inquiry relates to ${matchedCategory.name}. While this situation involves specific factual nuances, Indian administrative and civil law provides structured grievance redressal mechanisms and statutory protections.`,
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
          contact_note: 'National Legal Aid Helpline: 15100',
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
