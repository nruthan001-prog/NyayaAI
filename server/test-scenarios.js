/**
 * Comprehensive Scenario Verification Script for NyayaGuide AI
 */
import { ragEngine } from './src/services/ragEngine.js';
import { db } from './src/db.js';

const testScenarios = [
  {
    name: 'College Certificates Withholding',
    query: 'My college is refusing to return my original certificates.',
    category: 'education',
    state: 'Karnataka'
  },
  {
    name: 'Teacher Bullying & Humiliation',
    query: 'My teacher keeps publicly humiliating and bullying me. What should I do?',
    category: 'education',
    state: 'Delhi'
  },
  {
    name: 'Consumer E-Commerce Refund Denial',
    query: 'I purchased a product online but the company is refusing to refund me.',
    category: 'consumer',
    state: 'Maharashtra'
  },
  {
    name: 'Cyber Threat & Blackmail',
    query: 'Someone is threatening me through messages and I have screenshots.',
    category: 'cyber',
    state: 'Karnataka'
  },
  {
    name: 'Government Document Delay',
    query: 'I applied for a government document but my application has not been processed.',
    category: 'government',
    state: 'Karnataka'
  },
  {
    name: 'Landlord Deposit Withholding',
    query: 'My landlord is refusing to return my security deposit after vacating.',
    category: 'housing',
    state: 'Karnataka'
  }
];

console.log('⚖️ Running NyayaGuide AI Statutory Verification Test Suite...\n');

let passed = 0;
for (const sc of testScenarios) {
  const result = ragEngine.retrieveKnowledge(sc);
  
  const hasTitle = !!result.title;
  const hasActions = result.immediate_actions?.length >= 3;
  const hasAuthority = result.authority?.length >= 2;
  const hasDocs = result.documents?.length >= 2;
  const hasEscalation = result.escalation?.length >= 3;
  const hasSources = result.sources?.length >= 1;
  const hasDraft = !!result.complaint_draft_template;

  const allChecks = hasTitle && hasActions && hasAuthority && hasDocs && hasEscalation && hasSources && hasDraft;
  
  if (allChecks) {
    console.log(`✅ [PASS] ${sc.name}`);
    console.log(`   - Category: ${result.category}`);
    console.log(`   - Applicable Rule: ${result.possible_rights_or_rules[0]?.rule.substring(0, 60)}...`);
    console.log(`   - Primary Authority: ${result.authority[0]?.name}`);
    console.log(`   - Verified Source: ${result.sources[0]?.title} (${result.sources[0]?.url})`);
    console.log(`   - Escalation Tiers: ${result.escalation.length} tiers mapped`);
    console.log(`   - Evidence Items: ${result.documents.length} required documents`);
    console.log(`   - Draft Generated: ${result.complaint_draft_template.length} characters\n`);
    passed++;
  } else {
    console.error(`❌ [FAIL] ${sc.name}`);
  }
}

console.log(`=================================================`);
console.log(`Results: ${passed}/${testScenarios.length} scenarios verified successfully!`);
console.log(`=================================================`);
