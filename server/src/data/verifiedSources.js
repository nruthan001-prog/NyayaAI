/**
 * NyayaGuide AI - Verified Legal, Civic & Grievance Knowledge Base
 * 
 * All citations, authorities, portals, and emergency helplines are verified
 * against official Government of India and State Government statutory sources.
 */

export const CATEGORIES = [
  { id: 'education', name: 'Education & Academics', icon: 'GraduationCap', desc: 'Certificate withholding, teacher harassment, anti-ragging, exam issues' },
  { id: 'consumer', name: 'Consumer Rights & E-Commerce', icon: 'ShoppingBag', desc: 'Defective products, refund denials, misleading ads, unfair trade' },
  { id: 'cyber', name: 'Cyber & Online Security', icon: 'ShieldAlert', desc: 'Online harassment, identity theft, financial cyber fraud, extortion' },
  { id: 'employment', name: 'Workplace & Employment', icon: 'Briefcase', desc: 'Unpaid wages, PF/gratuity delays, wrongful termination, PoSH' },
  { id: 'government', name: 'Government & Public Services', icon: 'Building2', desc: 'Delayed certificates, CPGRAMS, Right to Public Services, Sakala' },
  { id: 'housing', name: 'Housing & Tenancy', icon: 'Home', desc: 'Security deposit withholding, illegal eviction, Rent Authority, RERA' },
  { id: 'women_child', name: 'Women & Child Protection', icon: 'Users', desc: 'PoSH workplace harassment, domestic violence, POCSO, Childline 1098' },
  { id: 'senior_citizens', name: 'Senior Citizen Welfare', icon: 'HeartHandshake', desc: 'Maintenance & Welfare Act 2007, property reclaim, Elderline 14567' },
  { id: 'documents', name: 'Documents & Certificates', icon: 'FileText', desc: 'Lost marksheet, Aadhaar grievance, Passport verification, DigiLocker' },
  { id: 'banking', name: 'Banking & Financial Fraud', icon: 'Landmark', desc: 'Unauthorized debits, recovery harassment, RBI Ombudsman CMS 14448' },
  { id: 'rti', name: 'Right to Information (RTI)', icon: 'Search', desc: 'Public department inquiry, RTI appeals, Section 7/19 guidelines' },
  { id: 'other', name: 'General Citizen Rights', icon: 'Scale', desc: 'Civic complaints, NALSA legal aid, fundamental citizen rights' }
];

export const EMERGENCY_HELPLINES = [
  { number: '112', title: 'National Emergency Helpline', coverage: 'All India Police / Fire / Ambulance', urgent: true },
  { number: '1930', title: 'National Cyber Financial Fraud Helpline', coverage: 'Cybercrime Portal / Golden Hour banking hold', urgent: true },
  { number: '1915', title: 'National Consumer Helpline (NCH)', coverage: 'Department of Consumer Affairs, Govt. of India', urgent: false },
  { number: '15100', title: 'NALSA Free Legal Aid Helpline', coverage: 'National Legal Services Authority', urgent: false },
  { number: '1098', title: 'Childline Helpline', coverage: 'Ministry of Women & Child Development', urgent: true },
  { number: '181', title: 'Women in Distress Helpline', coverage: 'All India Women Crisis & Support Centre', urgent: true },
  { number: '14567', title: 'Elderline - Senior Citizen Helpline', coverage: 'Ministry of Social Justice & Empowerment', urgent: false },
  { number: '14448', title: 'RBI CMS Helpline', coverage: 'Reserve Bank of India Banking Ombudsman', urgent: false }
];

export const VERIFIED_SOURCES_DIRECTORY = [
  {
    id: 'src-ugc-certificates',
    category: 'education',
    title: 'UGC Public Notice on Non-Retention of Original Certificates by Higher Education Institutions',
    organization: 'University Grants Commission (UGC), Ministry of Education, Govt. of India',
    url: 'https://www.ugc.gov.in',
    portalName: 'UGC e-Samadhan Portal',
    portalUrl: 'https://samadhaan.ugc.ac.in',
    verified: true,
    lastChecked: '2025-01-15',
    summary: 'Prohibits HEIs from retaining original academic certificates (10th/12th/Degree) beyond verification.'
  },
  {
    id: 'src-ugc-antiragging',
    category: 'education',
    title: 'UGC Regulations on Curbing the Menace of Ragging in Higher Educational Institutions, 2009',
    organization: 'University Grants Commission (UGC)',
    url: 'https://www.antiragging.in',
    portalName: 'National Anti-Ragging Portal & 24x7 Helpline (1800-180-5522)',
    portalUrl: 'https://www.antiragging.in',
    verified: true,
    lastChecked: '2025-01-15',
    summary: 'Mandates zero-tolerance anti-ragging committees, helpline, and criminal action for harassment.'
  },
  {
    id: 'src-consumer-act-2019',
    category: 'consumer',
    title: 'Consumer Protection Act, 2019 & E-Commerce Rules, 2020',
    organization: 'Department of Consumer Affairs, Ministry of Consumer Affairs, Food & Public Distribution',
    url: 'https://consumeraffairs.nic.in',
    portalName: 'National Consumer Helpline (NCH)',
    portalUrl: 'https://consumerhelpline.gov.in',
    verified: true,
    lastChecked: '2025-02-01',
    summary: 'Enforces rights against defective goods, unfair trade practices, and provides e-Daakhil filing.'
  },
  {
    id: 'src-edaakhil',
    category: 'consumer',
    title: 'e-Daakhil Portal for Online Consumer Court Case Filing',
    organization: 'National Consumer Disputes Redressal Commission (NCDRC) & NIC',
    url: 'https://edaakhil.nic.in',
    portalName: 'e-Daakhil Consumer Court System',
    portalUrl: 'https://edaakhil.nic.in',
    verified: true,
    lastChecked: '2025-02-01',
    summary: 'Enables Indian consumers to file disputes before District, State, and National Consumer Commissions online.'
  },
  {
    id: 'src-cybercrime-portal',
    category: 'cyber',
    title: 'National Cyber Crime Reporting Portal (NCRP) & IT Act 2000',
    organization: 'Indian Cyber Crime Coordination Centre (I4C), Ministry of Home Affairs',
    url: 'https://cybercrime.gov.in',
    portalName: 'National Cyber Crime Reporting Portal',
    portalUrl: 'https://cybercrime.gov.in',
    verified: true,
    lastChecked: '2025-02-10',
    summary: 'Centralized government portal for reporting cyber harassment, online threats, financial frauds, and child sexual abuse material.'
  },
  {
    id: 'src-cpgrams',
    category: 'government',
    title: 'Centralized Public Grievance Redress and Monitoring System (CPGRAMS)',
    organization: 'Department of Administrative Reforms and Public Grievances (DARPG), Govt. of India',
    url: 'https://pgportal.gov.in',
    portalName: 'CPGRAMS Citizen Portal',
    portalUrl: 'https://pgportal.gov.in',
    verified: true,
    lastChecked: '2025-01-20',
    summary: 'Citizen grievance redressal portal connecting over 80+ central ministries and state departments.'
  },
  {
    id: 'src-rti-online',
    category: 'rti',
    title: 'Right to Information Act, 2005 Online Portal',
    organization: 'Department of Personnel and Training (DoPT), Govt. of India',
    url: 'https://rtionline.gov.in',
    portalName: 'RTI Online India',
    portalUrl: 'https://rtionline.gov.in',
    verified: true,
    lastChecked: '2025-01-10',
    summary: 'Enables citizens to file RTI applications and first appeals to central public authorities online.'
  },
  {
    id: 'src-nalsa-legalaid',
    category: 'other',
    title: 'Legal Services Authorities Act, 1987 & Free Legal Aid Scheme',
    organization: 'National Legal Services Authority (NALSA), Supreme Court of India',
    url: 'https://nalsa.gov.in',
    portalName: 'NALSA Citizen Portal',
    portalUrl: 'https://nalsa.gov.in',
    verified: true,
    lastChecked: '2025-02-05',
    summary: 'Guarantees free legal aid, legal representation, and Lok Adalat dispute settlement to eligible citizens.'
  },
  {
    id: 'src-rbi-cms',
    category: 'banking',
    title: 'Reserve Bank - Integrated Ombudsman Scheme (RB-IOS), 2021',
    organization: 'Reserve Bank of India (RBI)',
    url: 'https://www.rbi.org.in',
    portalName: 'RBI Complaint Management System (CMS)',
    portalUrl: 'https://cms.rbi.org.in',
    verified: true,
    lastChecked: '2025-02-12',
    summary: 'Single window grievance redressal for bank, NBFC, and payment system complaints with 14448 support.'
  },
  {
    id: 'src-model-tenancy',
    category: 'housing',
    title: 'Model Tenancy Act & State Rent Authority Guidelines',
    organization: 'Ministry of Housing and Urban Affairs (MoHUA), Govt. of India',
    url: 'https://mohua.gov.in',
    portalName: 'State Rent Authority & Conciliation System',
    portalUrl: 'https://mohua.gov.in',
    verified: true,
    lastChecked: '2025-01-18',
    summary: 'Regulates tenancy agreements, caps security deposits, and sets clear protocols for deposit refund and rent courts.'
  },
  {
    id: 'src-posh-act',
    category: 'women_child',
    title: 'Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (PoSH)',
    organization: 'Ministry of Women and Child Development (MWCD), Govt. of India',
    url: 'https://wcd.nic.in',
    portalName: 'SHe-Box (Sexual Harassment Electronic Box)',
    portalUrl: 'https://shebox.wcd.gov.in',
    verified: true,
    lastChecked: '2025-02-01',
    summary: 'Mandatory Internal Committee (IC) in every establishment, grievance lodging, and inquiry protocols.'
  },
  {
    id: 'src-senior-citizens-act',
    category: 'senior_citizens',
    title: 'Maintenance and Welfare of Parents and Senior Citizens Act, 2007',
    organization: 'Ministry of Social Justice and Empowerment, Govt. of India',
    url: 'https://socialjustice.gov.in',
    portalName: 'Elderline (14567) Senior Citizen Portal',
    portalUrl: 'https://elderline.dosje.gov.in',
    verified: true,
    lastChecked: '2025-01-25',
    summary: 'Empowers senior citizens to claim monthly maintenance and apply before SDM Tribunal to cancel gift deeds in case of neglect.'
  },
  {
    id: 'src-epfo-grievance',
    category: 'employment',
    title: 'Employees Provident Fund & Miscellaneous Provisions Act, 1952',
    organization: 'Employees’ Provident Fund Organisation (EPFO), Ministry of Labour',
    url: 'https://www.epfindia.gov.in',
    portalName: 'EPFiGMS Grievance Management System',
    portalUrl: 'https://epfigms.gov.in',
    verified: true,
    lastChecked: '2025-02-15',
    summary: 'Online registration of EPF settlement, transfer, pension, and employer non-deposit complaints.'
  }
];

export const STATE_AUTHORITY_MAPPINGS = {
  karnataka: {
    stateName: 'Karnataka',
    publicServices: {
      act: 'Karnataka Sakala Services Act, 2011',
      portalName: 'Sakala Citizen Portal',
      portalUrl: 'https://sakala.kar.nic.in',
      helpline: '080-44554455 / 1902'
    },
    cyberPolice: {
      authority: 'CID Cyber Crime Police Station / Karnataka State Cyber Cell',
      helpline: '1930 / 112'
    },
    tenancyRera: {
      authority: 'Karnataka Real Estate Regulatory Authority (K-RERA) & Bengaluru Civil Court / Mediation Centre',
      portalUrl: 'https://rera.karnataka.gov.in'
    },
    lokayukta: {
      authority: 'Karnataka Lokayukta (Anti-Corruption & Administrative Injustice)',
      portalUrl: 'https://lokayukta.kar.nic.in'
    }
  },
  maharashtra: {
    stateName: 'Maharashtra',
    publicServices: {
      act: 'Maharashtra Right to Public Services Act, 2015',
      portalName: 'Aaple Sarkar Grievance & Citizen Portal',
      portalUrl: 'https://aaplesarkar.mahaonline.gov.in',
      helpline: '1800 120 8040'
    },
    cyberPolice: {
      authority: 'Maharashtra Cyber Police & BKC Cyber Cell, Mumbai',
      helpline: '1930 / 112'
    },
    tenancyRera: {
      authority: 'MahaRERA Conciliation Forum & Mumbai Small Causes Court',
      portalUrl: 'https://maharera.mahaonline.gov.in'
    },
    lokayukta: {
      authority: 'Maharashtra Lokayukta Office',
      portalUrl: 'https://lokayukta.maharashtra.gov.in'
    }
  },
  delhi: {
    stateName: 'Delhi (NCT)',
    publicServices: {
      act: 'Delhi (Right of Citizen to Time Bound Delivery of Services) Act, 2011',
      portalName: 'e-District Delhi Citizen Services',
      portalUrl: 'https://edistrict.delhigovt.nic.in',
      helpline: '1076 (Doorstep Delivery & Grievances)'
    },
    cyberPolice: {
      authority: 'IFSO (Intelligence Fusion & Strategic Operations) Unit, Delhi Police',
      helpline: '1930 / 112'
    },
    tenancyRera: {
      authority: 'Delhi Rent Control Court / Delhi RERA Conciliation',
      portalUrl: 'https://rera.delhi.gov.in'
    }
  },
  tamilnadu: {
    stateName: 'Tamil Nadu',
    publicServices: {
      act: 'Tamil Nadu Right to Services Bill & Citizen Charter',
      portalName: 'Chief Minister’s Special Cell (CMSC) / TN e-Sevai',
      portalUrl: 'https://cmcell.tn.gov.in',
      helpline: '1100'
    },
    cyberPolice: {
      authority: 'Cyber Crime Wing, Tamil Nadu Police',
      helpline: '1930 / 112'
    },
    tenancyRera: {
      authority: 'TNRERA & Tamil Nadu Rent Court',
      portalUrl: 'https://www.rera.tn.gov.in'
    }
  },
  uttarpradesh: {
    stateName: 'Uttar Pradesh',
    publicServices: {
      act: 'UP Right to Citizen Services & Jan-Sunwai Samadhan Scheme',
      portalName: 'IGRS Jan-Sunwai Portal',
      portalUrl: 'https://jansunwai.up.nic.in',
      helpline: '1076 (CM Helpline)'
    },
    cyberPolice: {
      authority: 'UP Cyber Police Headquarters & Regional Cyber Thana',
      helpline: '1930 / 112'
    },
    tenancyRera: {
      authority: 'UP RERA Conciliation Forum',
      portalUrl: 'https://www.up-rera.in'
    }
  }
};

/**
 * Knowledge Base rules for matching scenarios
 */
export const SCENARIO_KNOWLEDGE_BASE = [
  {
    id: 'edu_college_certificates',
    category: 'education',
    keywords: ['certificate', 'certificates', 'original', 'marksheet', 'withholding', 'withheld', 'college', 'university', 'refusing to return', 'tc', 'transfer certificate', 'degree', 'documents held'],
    title: 'Withholding of Original Academic Certificates by Higher Educational Institutions',
    summary: 'Higher Education Institutions (colleges, universities) frequently refuse to return original certificates upon withdrawal, graduation, or due to fee disputes. Under official UGC regulations, retaining original documents beyond instantaneous physical verification is explicitly prohibited.',
    possible_rights_or_rules: [
      {
        rule: 'UGC Notification on Verification and Non-Retention of Original Certificates (2018)',
        description: 'Mandates that HEIs can only physically verify original documents in the student’s presence and must return them immediately. Retention under any pretext (including fee dues) is impermissible.',
        cautionary_note: 'Institutions may pursue legitimate dues through ordinary civil procedures, but cannot hold educational certificates hostage.'
      },
      {
        rule: 'UGC (Redress of Grievances of Students) Regulations, 2023',
        description: 'Requires every college to have a Student Grievance Redressal Committee (SGRC) and universities to appoint an Ombudsperson for speedy resolution within 15 days.',
        cautionary_note: 'Procedural timelines must be documented with formal postal or digital receipts.'
      }
    ],
    immediate_actions: [
      { step: 1, title: 'Draft a Formal Written Representation', description: 'Submit an application to the College Principal/Registrar demanding return of original certificates, citing UGC Regulations 2018. Obtain a stamped acknowledgement copy or send via Registered Post AD.', priority: 'High' },
      { step: 2, title: 'Preserve All Fee and Admission Receipts', description: 'Compile payment receipts, no-objection certificates (NOCs) from lab/library, and admission letters demonstrating your bonafide status.', priority: 'High' },
      { step: 3, title: 'Lodge Grievance on UGC e-Samadhan', description: 'If the institution fails to return documents within 7 working days, register a formal complaint on the official UGC e-Samadhan Portal (samadhaan.ugc.ac.in).', priority: 'Medium' },
      { step: 4, title: 'File Consumer or Legal Notice', description: 'If urgently needed for employment or higher education, issue an advocate legal notice or file before District Consumer Commission for deficiency in service.', priority: 'Medium' }
    ],
    authority: [
      {
        name: 'College Principal / Registrar / Student Grievance Redressal Committee (SGRC)',
        role: 'Primary institutional authority responsible for custodian records and immediate release.',
        portal: 'College Administrative Office',
        url: '',
        contact_note: 'Submit physical letter with receiving seal or email Registrar with CC to Vice Chancellor.',
        how_to_approach: 'First point of contact. Allow 7 working days for response.'
      },
      {
        name: 'University Ombudsperson / Vice-Chancellor Office',
        role: 'Appellate university authority overseeing affiliated colleges.',
        portal: 'Affiliating State / Central University Portal',
        url: '',
        contact_note: 'Contact details available on official University website under Student Grievance Cell.',
        how_to_approach: 'Approach if the college Principal ignores the initial representation.'
      },
      {
        name: 'University Grants Commission (UGC) e-Samadhan',
        role: 'National statutory regulator with authority to revoke institutional funding or accreditation.',
        portal: 'UGC e-Samadhan Portal',
        url: 'https://samadhaan.ugc.ac.in',
        contact_note: 'Toll Free: 1800-111-656',
        how_to_approach: 'Submit online complaint attaching copy of the college refusal and fee receipts.'
      }
    ],
    documents: [
      { id: 'doc-1', name: 'Original Admission / Fee Receipts', purpose: 'Proves bonafide enrolment and current fee clearance status', is_essential: true },
      { id: 'doc-2', name: 'Formal Written Request Letter with Receiving Seal', purpose: 'Constitutes legal proof of demand and date of institutional refusal', is_essential: true },
      { id: 'doc-3', name: 'Copy of Relevant UGC Circular on Certificate Retention', purpose: 'Attached to notice to alert college administration of statutory violation', is_essential: false },
      { id: 'doc-4', name: 'Offer Letter or Higher Study Proof (if applicable)', purpose: 'Demonstrates immediate irreparable injury/urgency if legal injunction is sought', is_essential: false }
    ],
    escalation: [
      { tier: 1, level: 'Institutional Authority', authority: 'College Principal / SGRC Committee', condition: 'Initial application submitted', next_step: 'Wait 7 days for release of certificates' },
      { tier: 2, level: 'University Oversight', authority: 'University Ombudsperson & Registrar', condition: 'No response or refusal after 7 days', next_step: 'Submit formal grievance petition with acknowledgement copy' },
      { tier: 3, level: 'Statutory Regulator', authority: 'UGC e-Samadhan & State Higher Education Dept', condition: 'University/College fails to comply within 15 days', next_step: 'File regulatory complaint on UGC e-Samadhan' },
      { tier: 4, level: 'Legal Remedy', authority: 'District Consumer Forum or High Court Writ', condition: 'Urgent career jeopardy or bad-faith detention', next_step: 'Engage legal counsel or NALSA/DLSA for emergency writ petition (Mandamus)' }
    ],
    sources: [
      { title: 'UGC Public Notice on Non-Retention of Original Certificates', organization: 'University Grants Commission (UGC)', url: 'https://samadhaan.ugc.ac.in', verified: true, category: 'education' },
      { title: 'UGC Student Grievance Redressal Regulations', organization: 'Ministry of Education, Govt. of India', url: 'https://www.ugc.gov.in', verified: true, category: 'education' }
    ],
    warning: 'NyayaGuide AI provides general legal and civic information. If withholding prevents timely university enrollment or joining employment, consult a qualified advocate promptly to evaluate filing an emergency Writ Petition (Mandamus) before the High Court.'
  },
  {
    id: 'edu_teacher_bullying',
    category: 'education',
    keywords: ['teacher', 'professor', 'faculty', 'bullying', 'humiliating', 'harassment', 'publicly humiliating', 'abusive', 'scolding', 'mental agony', 'school', 'student harassment'],
    title: 'Bullying, Humiliation or Harassment by Faculty / Institutional Staff',
    summary: 'A student experiencing persistent humiliation, public harassment, or abusive conduct by a teacher or faculty member. Indian educational frameworks strictly prohibit mental harassment and corporal punishment.',
    possible_rights_or_rules: [
      {
        rule: 'Section 17, Right of Children to Free and Compulsory Education (RTE) Act, 2009 (for school students under 14-18)',
        description: 'Strictly bans physical punishment and mental harassment of children in educational institutions. Disciplinary action is mandated against errant staff.',
        cautionary_note: 'Applies primarily to school education; higher education is covered under UGC grievance rules.'
      },
      {
        rule: 'UGC Regulations on Curbing Ragging & Institutional Harassment',
        description: 'Requires colleges to maintain an active Anti-Ragging and Student Grievance Redressal Committee where complaints against faculty misconduct can be adjudicated without academic reprisal.',
        cautionary_note: 'Retaliation against complainants by faculty is itself a severe institutional infraction.'
      }
    ],
    immediate_actions: [
      { step: 1, title: 'Maintain an Incident Journal', description: 'Carefully record dates, times, classroom locations, exact words used, and names of classmates present during each incident.', priority: 'High' },
      { step: 2, title: 'Involve Parents / Trusted Guardian', description: 'Brief your family or guardian so formal communication carries guardian support, protecting against isolated retaliation.', priority: 'High' },
      { step: 3, title: 'Submit a Confidential Complaint to the Principal / Head of Department (HoD)', description: 'Submit a written, objective factual account requesting internal inquiry and assurance of non-retaliation.', priority: 'High' },
      { step: 4, title: 'Approach External Statutory Commissions if Ignored', description: 'If the institution covers up the harassment, submit a petition to the District Education Officer (DEO), State Child Rights Commission (SCPCR) or UGC Ombudsperson.', priority: 'Medium' }
    ],
    authority: [
      {
        name: 'School Principal / College Head of Department & Grievance Cell',
        role: 'Internal institutional disciplinary authority obligated to maintain safe academic environment.',
        portal: 'School / College Administration',
        url: '',
        contact_note: 'Request a formal written acknowledgement of the complaint.',
        how_to_approach: 'Submit signed complaint jointly with parents or guardians.'
      },
      {
        name: 'District Education Officer (DEO) / University Ombudsperson',
        role: 'Government administrative supervisor for schools and affiliated colleges in the district.',
        portal: 'District Collectorate / Education Department',
        url: '',
        contact_note: 'Located at District Education Office / Collectorate complex.',
        how_to_approach: 'File formal representation if the Principal fails to take corrective measures within 10 days.'
      },
      {
        name: 'National Commission for Protection of Child Rights (NCPCR) / e-BaalNidan',
        role: 'National statutory protector of child rights (for students under 18).',
        portal: 'e-BaalNidan Online Grievance System',
        url: 'https://ebaalnidan.nic.in',
        contact_note: 'Toll-Free Helpline: 1098 (Childline)',
        how_to_approach: 'File online petition if physical or severe mental abuse is occurring.'
      }
    ],
    documents: [
      { id: 'doc-1', name: 'Chronological Incident Log', purpose: 'Documents exact timeline, statements, and locations without reliance on memory alone', is_essential: true },
      { id: 'doc-2', name: 'Digital Evidence (Emails, Teams/Zoom chats, WhatsApp notices)', purpose: 'Corroborates discriminatory or inappropriate remarks', is_essential: false },
      { id: 'doc-3', name: 'Witness Statements from Classmates', purpose: 'Corroborating statements from fellow students who observed the conduct', is_essential: false },
      { id: 'doc-4', name: 'Medical / Counselor Consultation Note (if distress experienced)', purpose: 'Evidences psychological impact if formal compensation or suspension is sought', is_essential: false }
    ],
    escalation: [
      { tier: 1, level: 'Institutional Inquiry', authority: 'Head of Institution / Student Grievance Committee', condition: 'Initial incident report filed', next_step: 'Institutional inquiry and protection from retaliation' },
      { tier: 2, level: 'District Supervisory Body', authority: 'District Education Officer (DEO) / University Registrar', condition: 'Institution fails to take action or faculty retaliates', next_step: 'Written escalation requesting external inspection' },
      { tier: 3, level: 'Statutory Child / Human Rights Commission', authority: 'NCPCR (e-BaalNidan) or State Human Rights Commission', condition: 'Institutional cover-up or severe mental distress', next_step: 'Lodge formal statutory complaint via e-BaalNidan / SHRC' },
      { tier: 4, level: 'Legal & Police Protection', authority: 'Child Welfare Committee (CWC) / NALSA / Police', condition: 'Criminal intimidation, physical battery or sexual overtones', next_step: 'Call 1098 or approach police for FIR under RTE/POCSO/BNS' }
    ],
    sources: [
      { title: 'NCPCR Guidelines on Eliminating Corporal Punishment & Harassment in Schools', organization: 'National Commission for Protection of Child Rights', url: 'https://ncpcr.gov.in', verified: true, category: 'education' },
      { title: 'UGC Regulations on Student Grievance Redressal', organization: 'University Grants Commission', url: 'https://ugc.gov.in', verified: true, category: 'education' }
    ],
    warning: 'If any harassment involves sexual overtones, physical abuse, or immediate danger of self-harm, immediately notify Childline (1098), National Emergency (112), or a trusted adult guardian.'
  },
  {
    id: 'consumer_defective_refund',
    category: 'consumer',
    keywords: ['product', 'online', 'refund', 'company', 'refusing', 'refusing to refund', 'defective', 'damaged', 'ecommerce', 'amazon', 'flipkart', 'order', 'seller', 'return window', 'warranty', 'money back'],
    title: 'Refusal of Refund or Replacement for Defective Product / E-Commerce Purchase',
    summary: 'A consumer purchased goods or services online or offline that arrived defective, counterfeit, or differed from description, but the merchant/platform refuses to refund or honour the return policy.',
    possible_rights_or_rules: [
      {
        rule: 'Consumer Protection Act, 2019 (Sections 2(47), 35, 84-87: Product Liability & Unfair Trade Practice)',
        description: 'Guarantees the Right to be Protected against hazardous goods, Right to be Informed about quality/price, and Right to seek Redressal against unfair trade practices or defective goods.',
        cautionary_note: 'Platforms cannot absolve themselves of liability if they facilitated payment and guaranteed fulfillment.'
      },
      {
        rule: 'Consumer Protection (E-Commerce) Rules, 2020',
        description: 'Mandates every e-commerce entity to acknowledge consumer complaints within 48 hours, resolve them within 1 month, and prohibits cancellation charges post-confirmation unless justified.',
        cautionary_note: 'A merchant cannot impose blanket "no refund" policies on inherently defective items.'
      }
    ],
    immediate_actions: [
      { step: 1, title: 'Preserve Physical and Digital Evidence', description: 'Take high-resolution photographs and continuous unboxing video showing the defect, serial number, and shipping label. Do not discard packaging.', priority: 'High' },
      { step: 2, title: 'Send Written Dispute to Nodal Grievance Officer', description: 'Do not rely solely on customer care chats. Locate the mandatory "Grievance Officer" details on the platform’s website and send a formal email detailing the order ID, defect, and demanding refund/replacement within 7 days.', priority: 'High' },
      { step: 3, title: 'Lodge Grievance on National Consumer Helpline (NCH)', description: 'Register on consumerhelpline.gov.in or call toll-free 1915 or WhatsApp to 8800001915 with order details and invoice. NCH directly engages registered companies for pre-litigation resolution.', priority: 'High' },
      { step: 4, title: 'File Online Consumer Case on e-Daakhil', description: 'If NCH resolution fails, file a formal complaint before the District Consumer Disputes Redressal Commission via the official portal (edaakhil.nic.in). Minimal filing fee applies.', priority: 'Medium' }
    ],
    authority: [
      {
        name: 'National Consumer Helpline (NCH)',
        role: 'Central government pre-litigation conciliation service under Department of Consumer Affairs.',
        portal: 'NCH Portal',
        url: 'https://consumerhelpline.gov.in',
        contact_note: 'Toll-Free: 1915 or SMS/WhatsApp: 8800001915',
        how_to_approach: 'Register online with order ID and invoice. The portal routes the ticket to the company’s nodal officer.'
      },
      {
        name: 'Company / E-Commerce Platform Grievance Officer',
        role: 'Mandatory statutory officer under Consumer Protection E-Commerce Rules 2020.',
        portal: 'Company Legal / Grievance Page',
        url: '',
        contact_note: 'Details must be published on the seller’s terms page by law.',
        how_to_approach: 'Email directly citing Order ID and statutory 48-hour response obligation.'
      },
      {
        name: 'District Consumer Disputes Redressal Commission (DCDRC) via e-Daakhil',
        role: 'Statutory quasi-judicial consumer court empowered to order full refund, compensation for mental agony, and legal costs.',
        portal: 'e-Daakhil Portal',
        url: 'https://edaakhil.nic.in',
        contact_note: 'Jurisdiction up to ₹50 Lakhs claim value.',
        how_to_approach: 'File online petition through e-Daakhil without needing an advocate.'
      }
    ],
    documents: [
      { id: 'doc-1', name: 'Tax Invoice / Order Receipt', purpose: 'Proves transaction date, seller identity, amount paid, and product specifications', is_essential: true },
      { id: 'doc-2', name: 'Photographs & Unboxing Video of Defect', purpose: 'Unambiguous visual proof of defective or mismatched condition upon delivery', is_essential: true },
      { id: 'doc-3', name: 'Email / Chat Transcripts with Customer Support', purpose: 'Demonstrates customer care refusal or failure to resolve within reasonable time', is_essential: true },
      { id: 'doc-4', name: 'Bank / UPI Debit Statement', purpose: 'Confirms payment execution and deduction from consumer account', is_essential: false }
    ],
    escalation: [
      { tier: 1, level: 'Merchant Grievance Officer', authority: 'Platform Nodal Officer', condition: 'Customer care refusal', next_step: 'Formal email demanding resolution within 7 days' },
      { tier: 2, level: 'Pre-Litigation Conciliation', authority: 'National Consumer Helpline (1915 / consumerhelpline.gov.in)', condition: 'Platform fails to respond or refuses refund', next_step: 'Lodge NCH docket and track status' },
      { tier: 3, level: 'Quasi-Judicial Consumer Court', authority: 'District Consumer Commission via e-Daakhil', condition: 'Company refuses conciliation through NCH', next_step: 'Submit formal consumer petition under Section 35 on edaakhil.nic.in' },
      { tier: 4, level: 'Appellate Forum', authority: 'State Consumer Disputes Redressal Commission', condition: 'Appeal against District Commission order', next_step: 'File statutory appeal within 45 days' }
    ],
    sources: [
      { title: 'National Consumer Helpline Official Portal', organization: 'Department of Consumer Affairs, Govt. of India', url: 'https://consumerhelpline.gov.in', verified: true, category: 'consumer' },
      { title: 'e-Daakhil Electronic Consumer Court Filing', organization: 'National Consumer Commission & NIC', url: 'https://edaakhil.nic.in', verified: true, category: 'consumer' }
    ],
    warning: 'Consumers can represent themselves before the Consumer Commission without hiring an expensive lawyer. Beware of fraudulent "recovery agents" online; only use the official government portal consumerhelpline.gov.in.'
  },
  {
    id: 'cyber_online_threats',
    category: 'cyber',
    keywords: ['threat', 'threatening', 'threats', 'messages', 'screenshots', 'blackmail', 'extortion', 'harassment', 'stalking', 'morphing', 'leak', 'online abuse', 'whatsapp threats', 'instagram', 'fake profile'],
    title: 'Online Threat, Blackmail, Cyber Stalking or Digital Harassment',
    summary: 'A citizen is receiving threatening, defamatory, or extortionate messages across messaging apps or social media, with screenshots preserved as primary evidence.',
    possible_rights_or_rules: [
      {
        rule: 'Information Technology Act, 2000 (Sections 66C, 66D, 66E, 67)',
        description: 'Penalizes identity theft, cheating by personation, violation of bodily privacy, and transmitting obscene or sexually explicit material electronically.',
        cautionary_note: 'Preserving full headers, URLs, and unaltered digital copies is critical for judicial admissibility under Section 65B of the Indian Evidence Act / Section 63 BSA 2023.'
      },
      {
        rule: 'Bharatiya Nyaya Sanhita (BNS) 2023 / IPC Provisions',
        description: 'Sections dealing with Criminal Intimidation (BNS Sec 351), Cyber Stalking (BNS Sec 78), and Outraging Modesty of Women (BNS Sec 79).',
        cautionary_note: 'Threats involving bodily harm, extortion, or non-consensual images are cognizable criminal offenses requiring immediate police intervention.'
      }
    ],
    immediate_actions: [
      { step: 1, title: 'DO NOT Delete Messages or Media', description: 'Keep the original conversation intact. Take full-screen screenshots showing the phone number/handle, date, timestamp, and message bubble. Do not crop out the system status bar.', priority: 'High' },
      { step: 2, title: 'Export Complete Chat Backup', description: 'Use the messaging app’s "Export Chat without media" feature to save a raw .txt file with raw metadata onto cloud or USB drive.', priority: 'High' },
      { step: 3, title: 'File Online Report on National Cyber Crime Portal', description: 'Visit cybercrime.gov.in and register under "Report Other Cyber Crimes" or "Report Crime Against Women/Children" (with anonymous option if needed).', priority: 'High' },
      { step: 4, title: 'Involve Cyber Helpline / Golden Hour Hold (if financial)', description: 'If extortion involves immediate demands for money or bank details, dial 1930 immediately or 112 for physical safety threats.', priority: 'High' }
    ],
    authority: [
      {
        name: 'National Cyber Crime Reporting Portal (NCRP)',
        role: 'Centralized MHA portal coordinating directly with state cyber crime police cells and nodal platform officers.',
        portal: 'National Cyber Crime Reporting Portal',
        url: 'https://cybercrime.gov.in',
        contact_note: 'Helpline: 1930 (24x7 National Cyber Helpline)',
        how_to_approach: 'Submit complaint online with screenshots, sender handle/number, and timeline.'
      },
      {
        name: 'Local Police Station Cyber Cell / SHO',
        role: 'Jurisdictional police station obligated to register Zero FIR or forward cognizable threats to specialized Cyber Crime PS.',
        portal: 'Local Police Station / City Commissionerate',
        url: '',
        contact_note: 'Dial 112 for immediate dispatch or visit in person.',
        how_to_approach: 'Present printed copy of cybercrime.gov.in acknowledgement and written complaint to Station House Officer.'
      },
      {
        name: 'Platform Grievance Officer (Meta / Google / X / Telegram)',
        role: 'Intermediary compliance officer mandated under IT Rules 2021 to take down offensive/intimidating content within 24-36 hours.',
        portal: 'Platform In-App Safety Centre',
        url: '',
        contact_note: 'Published on app settings under Help/Grievance.',
        how_to_approach: 'Submit urgent takedown notice attaching FIR/Cybercrime complaint acknowledgement.'
      }
    ],
    documents: [
      { id: 'doc-1', name: 'Uncropped Full-Screen Screenshots', purpose: 'Shows sender mobile number, username, profile link, dates, and threat texts', is_essential: true },
      { id: 'doc-2', name: 'Exported Chat Log (.txt / .zip)', purpose: 'Provides raw text metadata and continuity of communication', is_essential: true },
      { id: 'doc-3', name: 'Profile URL / Account Link of Sender', purpose: 'Allows cyber cell investigators to request IP/account logs from service providers', is_essential: true },
      { id: 'doc-4', name: 'Transaction Slips / Demands (if financial extortion)', purpose: 'Shows UPI IDs, beneficiary bank accounts, or crypto wallets used for extortion', is_essential: false }
    ],
    escalation: [
      { tier: 1, level: 'Immediate Evidence & Reporting', authority: 'cybercrime.gov.in / Dial 1930 / Dial 112', condition: 'Threat received', next_step: 'Secure uncropped screenshots and file online NCRP complaint' },
      { tier: 2, level: 'Police Station / Cyber Cell FIR', authority: 'Station House Officer (SHO) / Cyber Crime PS', condition: 'Persistent threat or physical harm risk', next_step: 'Submit physical representation and insist on FIR registration' },
      { tier: 3, level: 'Superintendent of Police / Commissioner', authority: 'DCP / SP (Cyber Crime)', condition: 'Local police station refuses to file FIR', next_step: 'Submit petition under Section 175(3) BNSS / 154(3) CrPC to SP by registered post' },
      { tier: 4, level: 'Judicial Magistrate / Legal Aid', authority: 'Judicial Magistrate First Class (JMFC)', condition: 'Police inaction persists', next_step: 'Approach JMFC under Section 175(4) BNSS / 156(3) CrPC with DLSA free legal aid counsel' }
    ],
    sources: [
      { title: 'National Cyber Crime Reporting Portal', organization: 'Indian Cyber Crime Coordination Centre (I4C), Ministry of Home Affairs', url: 'https://cybercrime.gov.in', verified: true, category: 'cyber' },
      { title: 'IT Rules 2021 Intermediary Guidelines', organization: 'Ministry of Electronics & Information Technology (MeitY)', url: 'https://www.meity.gov.in', verified: true, category: 'cyber' }
    ],
    warning: 'EMERGENCY WARNING: If you are experiencing extortion involving non-consensual private photos, threats to life, or child exploitation, dial 1930 / 112 immediately. Under law, platforms must remove non-consensual intimate imagery within 24 hours of notice.'
  },
  {
    id: 'govt_delayed_application',
    category: 'government',
    keywords: ['government document', 'application', 'not processed', 'delayed', 'delay', 'pending', 'caste certificate', 'income certificate', 'domicile', 'driving licence', 'ration card', 'revenue department', 'tehsildar', 'taluk'],
    title: 'Unreasonable Delay or Stoppage in Processing Government Document / Citizen Application',
    summary: 'A citizen applied for a public certificate, permit, document, or welfare benefit through a government department, but the statutory processing window has lapsed without explanation.',
    possible_rights_or_rules: [
      {
        rule: 'State Right to Public Services Legislation (e.g. Sakala in KA, Aaple Sarkar in MH, UP Jan-Sunwai, Delhi Citizen Services)',
        description: 'Guarantees time-bound delivery of notified citizen services (caste, income, birth/death, revenue records). If officials fail to deliver within the stipulated days, citizens are entitled to daily compensatory allowances.',
        cautionary_note: 'Citizen must hold a valid Application Number (GSC/Acknowledgement Slip).'
      },
      {
        rule: 'Centralized Public Grievance Redress and Monitoring System (CPGRAMS)',
        description: 'Central portal connecting central ministries and state departments, mandating grievance redressal within 30-45 days under senior monitoring.',
        cautionary_note: 'Applies to state administrative offices and central government bodies.'
      }
    ],
    immediate_actions: [
      { step: 1, title: 'Locate Application Acknowledgement & GSC Number', description: 'Verify the application submission date and find the statutory time limit specified on the receipt or departmental citizen charter.', priority: 'High' },
      { step: 2, title: 'File First Appeal under State Public Services Guarantee', description: 'Approach the designated First Appellate Officer (typically the Assistant Commissioner or Sub-Divisional Magistrate) citing non-delivery within statutory days.', priority: 'High' },
      { step: 3, title: 'Lodge Online Grievance on CPGRAMS / State CM Helpline', description: 'Register grievance on pgportal.gov.in or the State CM Helpline (e.g. Sakala 1902 in Karnataka, 1076 in Delhi/UP) with application number.', priority: 'High' },
      { step: 4, title: 'File an Online RTI Application for Daily Progress', description: 'File a ₹10 RTI query requesting inspection of file movement, reasons recorded for delay, and name of the dealing assistant holding the file.', priority: 'Medium' }
    ],
    authority: [
      {
        name: 'Designated Public Grievance Officer / Tehsildar / Sub-Divisional Officer',
        role: 'Field administrative officer responsible for initial verification and issuance of documents.',
        portal: 'Taluk / Tehsil Administrative Office',
        url: '',
        contact_note: 'Meet during citizen grievance hours (usually 10 AM to 1 PM on designated weekdays).',
        how_to_approach: 'Present original acknowledgement receipt and request written status note.'
      },
      {
        name: 'CPGRAMS / Department of Administrative Reforms & Public Grievances',
        role: 'Centralized government monitoring platform routing complaints to senior nodal officers.',
        portal: 'CPGRAMS Portal',
        url: 'https://pgportal.gov.in',
        contact_note: 'Monitored at Secretary & Cabinet Secretariat level.',
        how_to_approach: 'Register online at pgportal.gov.in with PDF of original application acknowledgement.'
      },
      {
        name: 'State Lokayukta / Upalokayukta Office',
        role: 'Statutory ombudsman investigating administrative delays, bureaucratic harassment, and maladministration.',
        portal: 'State Lokayukta Official Website',
        url: '',
        contact_note: 'Handles grievances where officials demand bribes or cause deliberate harassment.',
        how_to_approach: 'Submit statutory Form I/II complaint with affidavit if corruption/deliberate delay is suspected.'
      }
    ],
    documents: [
      { id: 'doc-1', name: 'Application Acknowledgement Slip with GSC / Token Number', purpose: 'Undeniable proof of filing date, office location, and promised service delivery timeline', is_essential: true },
      { id: 'doc-2', name: 'Fee Payment Receipt / Challan', purpose: 'Confirms that all prescribed statutory fees were discharged', is_essential: true },
      { id: 'doc-3', name: 'Copies of Supporting Documents Uploaded', purpose: 'Shows application was complete with no missing attachments on applicant part', is_essential: true },
      { id: 'doc-4', name: 'Identity Proof (Aadhaar / Voter ID)', purpose: 'Standard identification requirement for applicant status verification', is_essential: false }
    ],
    escalation: [
      { tier: 1, level: 'Designated Office Visit', authority: 'Tehsildar / Sub-Registrar / Ward Office', condition: 'Service timeline expired', next_step: 'Present token slip during citizen grievance hours' },
      { tier: 2, level: 'First Appeal under Services Act', authority: 'Sub-Divisional Magistrate (SDM) / First Appellate Authority', condition: 'No resolution from dealing office', next_step: 'Submit statutory Form of Appeal under Public Services Act' },
      { tier: 3, level: 'Central / State Grievance Redressal', authority: 'CPGRAMS (pgportal.gov.in) & CM Helpline', condition: 'Appellate officer fails to adjudicate', next_step: 'Register formal CPGRAMS docket for higher administrative monitoring' },
      { tier: 4, level: 'RTI / Lokayukta', authority: 'Public Information Officer (RTI) / State Lokayukta', condition: 'Willful obstruction or bribery demand', next_step: 'File RTI inquiry into file movement or submit complaint to Lokayukta' }
    ],
    sources: [
      { title: 'CPGRAMS Centralized Public Grievance Portal', organization: 'Department of Administrative Reforms and Public Grievances (DARPG)', url: 'https://pgportal.gov.in', verified: true, category: 'government' },
      { title: 'RTI Online Central Portal', organization: 'Department of Personnel & Training (DoPT)', url: 'https://rtionline.gov.in', verified: true, category: 'rti' }
    ],
    warning: 'Government officials are bound by Citizen Charters and Public Service Guarantee Acts. If any official solicits an unauthorized fee or gratification, report immediately to the Anti-Corruption Bureau / Lokayukta helpline.'
  },
  {
    id: 'housing_deposit_withheld',
    category: 'housing',
    keywords: ['landlord', 'tenant', 'deposit', 'security deposit', 'refusing to return', 'rent', 'rental', 'vacate', 'vacated', 'house owner', 'withholding deposit', 'painting charges', 'damage deduction'],
    title: 'Landlord Refusing to Return Rental Security Deposit upon Vacating',
    summary: 'A tenant vacated a rental residential or commercial property in compliance with notice terms, but the owner/landlord wrongfully withholds or makes unjustified deductions from the security deposit.',
    possible_rights_or_rules: [
      {
        rule: 'Model Tenancy Act, 2021 / State Tenancy & Rent Control Provisions',
        description: 'Specifies that security deposits must be refunded to the tenant upon vacating and handing over possession, after deducting valid dues/damages. Security deposit caps are recommended at maximum 2 months rent for residential premises.',
        cautionary_note: 'Unilateral deductions for ordinary wear-and-tear (e.g. routine wall painting) cannot be made unless explicitly stated in the agreement.'
      },
      {
        rule: 'Transfer of Property Act, 1882 (Section 108: Rights & Liabilities of Lessee)',
        description: 'Obligates tenant to surrender possession in as good condition as received, subject to reasonable wear and tear; landlord holds security deposit purely in trust.',
        cautionary_note: 'Retaining deposit after handover constitutes wrongful civil retention of tenant funds.'
      }
    ],
    immediate_actions: [
      { step: 1, title: 'Document Handover Condition with Video & Photos', description: 'Record high-definition video of all empty rooms, walls, fixtures, and electricity/water meters on the date of key handover to disprove false damage claims.', priority: 'High' },
      { step: 2, title: 'Obtain Key Handover Written Acknowledgement', description: 'Send an email or WhatsApp message documenting: "Keys handed over on [Date]. Current meter reading [XYZ]. Requesting refund of security deposit of ₹[Amount] to bank account [Details] within 7 days."', priority: 'High' },
      { step: 3, title: 'Issue a Formal Legal Demand Notice', description: 'If the landlord fails to transfer the amount, issue a formal demand notice giving 15 days cure period before initiating proceedings before Rent Court or Lok Adalat.', priority: 'High' },
      { step: 4, title: 'Approach Rent Authority or Legal Services Authority (DLSA) Mediation', description: 'Apply before the District Legal Services Authority (DLSA) for free pre-litigation mediation or file before the Rent Tribunal / Small Causes Court.', priority: 'Medium' }
    ],
    authority: [
      {
        name: 'District Rent Authority / Rent Court (under State Tenancy Act)',
        role: 'Designated statutory tribunal established to adjudicate tenancy disputes and deposit recovery.',
        portal: 'State Revenue / Housing Department',
        url: '',
        contact_note: 'Presided over by Deputy Collector / Rent Controller.',
        how_to_approach: 'File formal application enclosing lease agreement, handover proof, and bank statement.'
      },
      {
        name: 'District Legal Services Authority (DLSA) - Pre-Litigation Mediation',
        role: 'Court-annexed statutory mediation body resolving civil disputes quickly without court fees.',
        portal: 'NALSA Portal / District Court Complex',
        url: 'https://nalsa.gov.in',
        contact_note: 'Available in every District Court Complex across India.',
        how_to_approach: 'Submit a simple mediation request form. The secretary issues a notice to the landlord for amicable settlement.'
      },
      {
        name: 'Civil Court (Small Causes Court)',
        role: 'Jurisdictional court for summary suit recovery of liquidated debt.',
        portal: 'District e-Courts Portal',
        url: 'https://services.ecourts.gov.in',
        contact_note: 'Order 37 of Civil Procedure Code (Summary Suit).',
        how_to_approach: 'Engage an advocate or legal aid counsel to file summary recovery suit.'
      }
    ],
    documents: [
      { id: 'doc-1', name: 'Signed Rental / Lease Agreement', purpose: 'Defines original deposit amount, notice period, and terms of refund', is_essential: true },
      { id: 'doc-2', name: 'Deposit Payment Bank / UPI Record', purpose: 'Conclusive evidence of the initial security deposit sum paid to the owner', is_essential: true },
      { id: 'doc-3', name: 'Key Handover Confirmation (Email / WhatsApp / Letter)', purpose: 'Proves date possession was surrendered and keys were received by landlord', is_essential: true },
      { id: 'doc-4', name: 'Photos / Video of Vacated Premises', purpose: 'Disproves fabricated claims of property destruction or unauthorized alterations', is_essential: true }
    ],
    escalation: [
      { tier: 1, level: 'Formal Written Demand', authority: 'Direct Landlord Notice', condition: 'Keys returned, 7 days passed', next_step: 'Send formal demand with 15 days deadline citing agreement' },
      { tier: 2, level: 'Pre-Litigation Mediation', authority: 'District Legal Services Authority (DLSA) / Lok Adalat', condition: 'Landlord ignores or refuses return', next_step: 'Apply for free pre-litigation mediation at District Court complex' },
      { tier: 3, level: 'Statutory Tenancy Tribunal', authority: 'Rent Authority / Rent Court', condition: 'Mediation fails', next_step: 'File formal dispute under State Tenancy Act' },
      { tier: 4, level: 'Civil Recovery Suit', authority: 'Small Causes Court (Summary Suit)', condition: 'Prolonged bad faith withholding', next_step: 'File Summary Suit under Order XXXVII CPC for debt plus interest' }
    ],
    sources: [
      { title: 'Model Tenancy Act Official Framework', organization: 'Ministry of Housing and Urban Affairs (MoHUA)', url: 'https://mohua.gov.in', verified: true, category: 'housing' },
      { title: 'National Legal Services Authority (NALSA)', organization: 'Supreme Court of India', url: 'https://nalsa.gov.in', verified: true, category: 'other' }
    ],
    warning: 'Always retain written proof of handing over keys and house inspection. Avoid informal cash transactions without receipts. Pre-litigation mediation at DLSA resolves over 70% of deposit disputes within 30-45 days.'
  },
  {
    id: 'emp_unpaid_salary',
    category: 'employment',
    keywords: ['unpaid', 'salary', 'wages', 'employer', 'company', 'not paying', 'pending salary', 'resigned', 'full and final', 'fnf', 'gratuity', 'pf delay', 'provident fund', 'termination', 'laid off'],
    title: 'Unpaid Salary, Withheld Full-and-Final (FnF) Settlement or PF Non-Deposit',
    summary: 'An employee resigned or was terminated, but the employer is withholding earned wages, delaying Full-and-Final settlement beyond 30 days, or failed to deposit deducted PF.',
    possible_rights_or_rules: [
      {
        rule: 'Payment of Wages Act, 1936 & Code on Wages, 2019',
        description: 'Earned wages must be paid within 7 to 10 days of wage period close. In case of resignation or removal, wages and settlement dues must be cleared within 2 working days under the new wage code.',
        cautionary_note: 'Employers cannot impose arbitrary penalties or forfeit salary for notice period if not legitimately quantified.'
      },
      {
        rule: 'Employees’ Provident Funds and Miscellaneous Provisions Act, 1952',
        description: 'Deducting PF from an employee’s salary without remitting it to EPFO is a criminal breach of trust under the Indian Penal Code / BNS.',
        cautionary_note: 'EPFO complaints can trigger statutory recovery warrants against directors.'
      }
    ],
    immediate_actions: [
      { step: 1, title: 'Download All Employment Documents Immediately', description: 'Secure copies of appointment letter, promotion letters, past 6-12 months payslips, resignation email, and acceptance acknowledgement before work email access is revoked.', priority: 'High' },
      { step: 2, title: 'Submit a Formal FnF Demand Letter', description: 'Send a professional email to HR, Finance, and Director specifying exact pending days, amount due, and setting a 7-day payment deadline.', priority: 'High' },
      { step: 3, title: 'File Online Grievance with Labour Commissioner (Shram Suvidha)', description: 'Register a complaint on the Ministry of Labour portal (shramsuvidha.gov.in) or with the Deputy Labour Commissioner office of your district.', priority: 'High' },
      { step: 4, title: 'Lodge EPFO Grievance on EPFiGMS (if PF issue)', description: 'If PF was deducted but not reflected in UAN passbook, submit complaint on epfigms.gov.in.', priority: 'High' }
    ],
    authority: [
      {
        name: 'Office of the Deputy Labour Commissioner / Conciliation Officer',
        role: 'District statutory authority for resolving wage disputes and unfair labour practices.',
        portal: 'State Labour Department / Shram Suvidha',
        url: 'https://shramsuvidha.gov.in',
        contact_note: 'Present in every district headquarters.',
        how_to_approach: 'File formal petition under Section 33C(2) of Industrial Disputes Act / Payment of Wages Act.'
      },
      {
        name: 'EPFiGMS - EPFO Grievance Portal',
        role: 'Centralized provident fund grievance adjudication platform.',
        portal: 'EPFiGMS Portal',
        url: 'https://epfigms.gov.in',
        contact_note: 'Toll Free: 1800-118-005',
        how_to_approach: 'Enter UAN and PPO number to track employer non-compliance.'
      },
      {
        name: 'Labour Court / Industrial Tribunal',
        role: 'Judicial body competent to issue wage recovery certificates with interest.',
        portal: 'District Labour Court',
        url: '',
        contact_note: 'Free legal aid available through DLSA for workers.',
        how_to_approach: 'Matter is referred by Conciliation Officer if employer refuses amicable settlement.'
      }
    ],
    documents: [
      { id: 'doc-1', name: 'Appointment Letter & Employment Agreement', purpose: 'Proves contractual relationship, monthly salary terms, and notice conditions', is_essential: true },
      { id: 'doc-2', name: 'Past 3 to 6 Months Salary Slips', purpose: 'Demonstrates baseline monthly earnings and standard deductions', is_essential: true },
      { id: 'doc-3', name: 'Bank Account Statements Showing Salary Stoppage', purpose: 'Evidence that salary credits ceased on the disputed dates', is_essential: true },
      { id: 'doc-4', name: 'Resignation & Acceptance Email Chain', purpose: 'Proves formal conclusion of employment and handover compliance', is_essential: true }
    ],
    escalation: [
      { tier: 1, level: 'HR & Management Notice', authority: 'Company Management / HR Head', condition: 'Settlement exceeds 30 days', next_step: 'Formal demand email with 7 days cure deadline' },
      { tier: 2, level: 'Government Labour Conciliation', authority: 'Assistant Labour Commissioner (ALC)', condition: 'Employer ignores demand notice', next_step: 'Submit petition for conciliation proceedings under Labour Laws' },
      { tier: 3, level: 'EPFO / Statutory Regulatory Action', authority: 'EPFO Regional Office (EPFiGMS)', condition: 'PF deducted but not credited to UAN', next_step: 'Lodge statutory non-remittance complaint on epfigms.gov.in' },
      { tier: 4, level: 'Labour Court / Recovery Certificate', authority: 'Labour Court / District Collector', condition: 'Employer fails conciliation', next_step: 'Obtain Revenue Recovery Certificate from Labour Court for asset attachment' }
    ],
    sources: [
      { title: 'Ministry of Labour and Employment Portal', organization: 'Govt. of India', url: 'https://labour.gov.in', verified: true, category: 'employment' },
      { title: 'EPFiGMS Grievance Management System', organization: 'Employees’ Provident Fund Organisation (EPFO)', url: 'https://epfigms.gov.in', verified: true, category: 'employment' }
    ],
    warning: 'Do not sign full-and-final discharge vouchers or "no due" undertakings until the funds have actually cleared in your bank account.'
  },
  {
    id: 'banking_unauthorized_fraud',
    category: 'banking',
    keywords: ['bank', 'unauthorized', 'upi', 'fraud', 'atm', 'debit', 'scam', 'money deducted', 'account hacked', 'loan agent', 'harassment', 'recovery agent', 'rbi', 'credit card'],
    title: 'Unauthorized Electronic Banking Debit, UPI Scam or Harassment by Recovery Agents',
    summary: 'A citizen suffered an unauthorized electronic debit from their bank account or is facing illegal harassment, intimidation, or social shaming by loan recovery agents.',
    possible_rights_or_rules: [
      {
        rule: 'RBI Master Circular on Customer Protection – Limiting Liability in Unauthorized Transactions (2017)',
        description: 'Zero Liability if reported within 3 working days of receiving unauthorized transaction alert. Limited liability (max ₹10,000 for savings) if reported within 4-7 days. Bank must credit shadow reversal within 10 days.',
        cautionary_note: 'Crucial to notify the bank within 72 hours via official recorded channels.'
      },
      {
        rule: 'RBI Fair Practices Code for Lenders & Recovery Agents',
        description: 'Recovery agents cannot call before 8 AM or after 7 PM, cannot harass or intimidate, cannot contact friends or relatives, and cannot use abusive language. Lenders are strictly responsible for third-party agents.',
        cautionary_note: 'Harassment by agents entitles borrower to punitive damages via RBI Ombudsman.'
      }
    ],
    immediate_actions: [
      { step: 1, title: 'Block Card / Net-Banking IMMEDIATELY', description: 'Call your bank’s 24x7 toll-free emergency number or use mobile banking app to freeze card, net-banking, and UPI access to prevent further debits.', priority: 'High' },
      { step: 2, title: 'Report to Bank within 72 Hours (Golden Rule)', description: 'Submit a formal written complaint with your home branch and obtain a complaint reference number. This preserves your statutory right to Zero Liability.', priority: 'High' },
      { step: 3, title: 'Call 1930 & Register on cybercrime.gov.in', description: 'Dial 1930 within the "golden hour" to enable Indian Cyber Crime Coordination Centre to freeze the fraudulent beneficiary account.', priority: 'High' },
      { step: 4, title: 'Escalate to RBI Ombudsman (CMS Portal)', description: 'If the bank fails to resolve within 30 days or rejects legitimate refund, file a complaint on cms.rbi.org.in or dial 14448.', priority: 'Medium' }
    ],
    authority: [
      {
        name: 'Bank Principal Nodal Officer (PNO) / Internal Ombudsman',
        role: 'Highest in-house appellate authority within the commercial bank.',
        portal: 'Bank Official Website (Grievance Redressal Section)',
        url: '',
        contact_note: 'Must acknowledge complaints within 48 hours.',
        how_to_approach: 'Approach if the branch manager does not credit interim reversal within 10 days.'
      },
      {
        name: 'RBI Integrated Ombudsman Scheme (CMS Portal)',
        role: 'Statutory regulatory ombudsman empowered to pass binding compensation awards up to ₹20 Lakhs plus ₹1 Lakh for mental agony.',
        portal: 'RBI Complaint Management System (CMS)',
        url: 'https://cms.rbi.org.in',
        contact_note: 'Toll-Free Helpline: 14448',
        how_to_approach: 'File online at cms.rbi.org.in after 30 days of bank inaction or upon unsatisfactory response.'
      },
      {
        name: 'National Cyber Crime Reporting Portal / 1930',
        role: 'Law enforcement network for freezing recipient banking and wallet nodes.',
        portal: 'National Cybercrime Portal',
        url: 'https://cybercrime.gov.in',
        contact_note: 'Helpline: 1930 (Golden Hour freeze)',
        how_to_approach: 'Provide transaction UTR numbers and recipient account/UPI ID immediately.'
      }
    ],
    documents: [
      { id: 'doc-1', name: 'Bank Account / Card Statement Highlighting Fraudulent Debits', purpose: 'Shows exact timestamp, UTR reference number, and deduction amount', is_essential: true },
      { id: 'doc-2', name: 'SMS / Email Alerts Received', purpose: 'Proves the exact time you were notified of the debit', is_essential: true },
      { id: 'doc-3', name: 'Formal Bank Complaint Acknowledgement & Reference Token', purpose: 'Crucial for establishing that notification was given within the 72-hour zero liability window', is_essential: true },
      { id: 'doc-4', name: 'Audio Recordings / Call Logs (for recovery harassment)', purpose: 'Evidences abusive timing or threats by unauthorized recovery agents', is_essential: false }
    ],
    escalation: [
      { tier: 1, level: 'Bank Branch & Customer Care', authority: 'Bank Grievance Officer', condition: 'Debit occurs', next_step: 'Immediate card block and written dispute submission within 72 hours' },
      { tier: 2, level: 'Law Enforcement / Cyber Police', authority: '1930 Helpline & cybercrime.gov.in', condition: 'Cyber scam / phishing', next_step: 'Register docket to freeze mule account within golden hour' },
      { tier: 3, level: 'Bank Principal Nodal Officer (PNO)', authority: 'Appellate Grievance Redressal Officer', condition: 'No response after 15 days', next_step: 'Escalate to Bank PNO with reference number' },
      { tier: 4, level: 'Reserve Bank of India Ombudsman', authority: 'RBI CMS Portal (cms.rbi.org.in / 14448)', condition: '30 days lapse or rejection of valid claim', next_step: 'File statutory dispute before RBI Ombudsman for refund and compensation' }
    ],
    sources: [
      { title: 'RBI Integrated Ombudsman Scheme Portal', organization: 'Reserve Bank of India (RBI)', url: 'https://cms.rbi.org.in', verified: true, category: 'banking' },
      { title: 'National Cyber Fraud Helpline 1930', organization: 'Ministry of Home Affairs', url: 'https://cybercrime.gov.in', verified: true, category: 'cyber' }
    ],
    warning: 'Never share OTP, PIN, UPI password, or CVV with anyone claiming to be a bank official or police officer. Banks never ask for secret credentials.'
  }
];
