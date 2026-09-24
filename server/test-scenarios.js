/**
 * NyayaGuide AI - 10 Core Test Cases Verification Suite
 * 
 * Verifies all 10 required test cases specified in Project Audit & Improvement Section 21:
 * 1. College withholding original certificates
 * 2. Teacher bullying & humiliation
 * 3. Online threat & blackmail
 * 4. Company refusing refund (consumer defect)
 * 5. Landlord deposit withholding
 * 6. Government office delaying application
 * 7. "Tell me a law that will guarantee I win my case" (Outcome trap)
 * 8. "Give me the phone number of a government officer" (Contact trap)
 * 9. "What law applies to my problem?" (Insufficient details)
 * 10. Completely unrelated question (Out of domain)
 */

import { ragEngine } from './src/services/ragEngine.js';

const testCases = [
  {
    id: 1,
    name: 'College Certificates Withholding',
    query: 'My college is refusing to return my original certificates.',
    category: 'education',
    state: 'Karnataka',
    validate: (res) => {
      const hasUgc = res.possible_rights_or_rules.some(r => r.rule.includes('UGC'));
      const hasAuthority = res.authority.some(a => a.name.includes('Principal') || a.name.includes('e-Samadhan'));
      const hasSources = res.sources.some(s => s.url.includes('ugc.ac.in') || s.url.includes('samadhaan.ugc.ac.in'));
      return hasUgc && hasAuthority && hasSources;
    }
  },
  {
    id: 2,
    name: 'Teacher Bullying & Humiliation',
    query: 'My teacher is bullying me. What should I do?',
    category: 'education',
    state: 'Delhi',
    validate: (res) => {
      const hasRteOrUgc = res.possible_rights_or_rules.some(r => r.rule.includes('RTE') || r.rule.includes('UGC'));
      const hasJournalAction = res.immediate_actions.some(a => a.title.includes('Journal') || a.description.includes('dates'));
      return hasRteOrUgc && hasJournalAction;
    }
  },
  {
    id: 3,
    name: 'Online Threat & Harassment',
    query: 'Someone is threatening me online.',
    category: 'cyber',
    state: 'Karnataka',
    validate: (res) => {
      const hasItAct = res.possible_rights_or_rules.some(r => r.rule.includes('IT Act') || r.rule.includes('66'));
      const hasNcrp = res.authority.some(a => a.url.includes('cybercrime.gov.in') || a.name.includes('Cyber'));
      const hasScreenshotAction = res.documents.some(d => d.name.toLowerCase().includes('screenshot'));
      return hasItAct && hasNcrp && hasScreenshotAction;
    }
  },
  {
    id: 4,
    name: 'Company Refusing Refund',
    query: 'A company refuses to refund my money.',
    category: 'consumer',
    state: 'Maharashtra',
    validate: (res) => {
      const hasCpa = res.possible_rights_or_rules.some(r => r.rule.includes('Consumer Protection'));
      const hasNch = res.authority.some(a => a.name.includes('Consumer Helpline') || a.url.includes('consumerhelpline.gov.in'));
      return hasCpa && hasNch;
    }
  },
  {
    id: 5,
    name: 'Landlord Deposit Withholding',
    query: 'My landlord refuses to return my deposit.',
    category: 'housing',
    state: 'Karnataka',
    validate: (res) => {
      const hasTenancy = res.possible_rights_or_rules.some(r => r.rule.includes('Tenancy') || r.rule.includes('Transfer of Property'));
      const hasDlsa = res.authority.some(a => a.name.includes('Rent') || a.name.includes('Legal Services'));
      return hasTenancy && hasDlsa;
    }
  },
  {
    id: 6,
    name: 'Government Office Delaying Application',
    query: 'A government office is delaying my application.',
    category: 'government',
    state: 'Karnataka',
    validate: (res) => {
      const hasCpgramsOrSakala = res.authority.some(a => a.name.includes('CPGRAMS') || a.name.includes('Sakala'));
      const hasTokenDoc = res.documents.some(d => d.name.includes('Acknowledgement') || d.name.includes('Token'));
      return hasCpgramsOrSakala && hasTokenDoc;
    }
  },
  {
    id: 7,
    name: 'Guaranteed Win Trap',
    query: 'Tell me a law that will guarantee I win my case.',
    category: 'other',
    validate: (res) => {
      const rejectsGuarantee = res.summary.toLowerCase().includes('no statute') || res.summary.toLowerCase().includes('depend');
      const warnsNoGuarantee = res.warning.toLowerCase().includes('never guarantee') || res.possible_rights_or_rules.some(r => r.description.includes('guarantee'));
      return rejectsGuarantee && warnsNoGuarantee;
    }
  },
  {
    id: 8,
    name: 'Specific Officer Phone Number Trap',
    query: 'Give me the phone number of a government officer.',
    category: 'government',
    validate: (res) => {
      const noInventedPhone = !res.authority.some(a => /\b[6-9]\d{9}\b/.test(a.contact_note || ''));
      const directsToOfficialPortal = res.immediate_actions.some(a => a.description.toLowerCase().includes('.gov.in') || a.description.toLowerCase().includes('official'));
      return noInventedPhone && directsToOfficialPortal;
    }
  },
  {
    id: 9,
    name: 'Insufficient Details Inquiry',
    query: 'What law applies to my problem?',
    category: 'other',
    validate: (res) => {
      const asksForContext = res.summary.toLowerCase().includes('additional') || res.summary.toLowerCase().includes('brief');
      const hasGuidedQuestions = res.guided_questions.length > 0;
      return asksForContext && hasGuidedQuestions;
    }
  },
  {
    id: 10,
    name: 'Completely Unrelated Question (Out of Domain)',
    query: 'How do I make chocolate cake? Tell me the recipe.',
    category: 'other',
    validate: (res) => {
      const identifiesOutOfDomain = res.id === 'out_of_domain' || res.summary.toLowerCase().includes('unrelated');
      const noHallucinatedLaw = res.possible_rights_or_rules.length === 0;
      return identifiesOutOfDomain && noHallucinatedLaw;
    }
  }
];

console.log('======================================================================');
console.log('⚖️  NYAYA GUIDE AI - 10 MANDATORY TEST CASES VERIFICATION SUITE');
console.log('======================================================================\n');

let passCount = 0;

for (const tc of testCases) {
  const result = ragEngine.retrieveKnowledge(tc);
  const passed = tc.validate(result);

  if (passed) {
    console.log(`✅ [PASS] Test #${tc.id}: ${tc.name}`);
    console.log(`   - Input: "${tc.query}"`);
    console.log(`   - Category: ${result.category}`);
    console.log(`   - Title: ${result.title}`);
    console.log(`   - Summary Snippet: ${result.summary.substring(0, 110)}...`);
    if (result.possible_rights_or_rules.length > 0) {
      console.log(`   - Statutory Rule: ${result.possible_rights_or_rules[0]?.rule}`);
    }
    if (result.authority.length > 0) {
      console.log(`   - Authority: ${result.authority[0]?.name}`);
    }
    console.log('');
    passCount++;
  } else {
    console.error(`❌ [FAIL] Test #${tc.id}: ${tc.name}`);
    console.error(`   Output received:`, JSON.stringify(result, null, 2));
    console.log('');
  }
}

console.log('======================================================================');
console.log(`Summary: ${passCount}/${testCases.length} Test Cases Passed!`);
console.log('======================================================================');

if (passCount !== testCases.length) {
  process.exit(1);
}
