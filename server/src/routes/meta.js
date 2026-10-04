import { Router } from 'express';
import { CATEGORIES, EMERGENCY_HELPLINES } from '../data/verifiedSources.js';
import { db } from '../db.js';

export const metaRouter = Router();

metaRouter.get('/categories', (req, res) => {
  res.json({ categories: CATEGORIES });
});

metaRouter.get('/helplines', (req, res) => {
  res.json({ helplines: EMERGENCY_HELPLINES });
});

metaRouter.get('/stats', (req, res) => {
  const stats = db.getDashboardStats();
  res.json({ stats });
});

metaRouter.get('/demo-scenarios', (req, res) => {
  const demoScenarios = [
    {
      id: 'demo-1',
      category: 'education',
      title: 'College Withholding Certificates',
      prompt: 'My college is refusing to return my original certificates. What can I do?',
      subtitle: 'Higher education institution withholding documents despite fee clearance',
      badge: 'Education & Academics'
    },
    {
      id: 'demo-2',
      category: 'education',
      title: 'Teacher Humiliation & Bullying',
      prompt: 'My teacher keeps publicly humiliating and bullying me. What should I do?',
      subtitle: 'Addressing classroom mental harassment and institutional grievance',
      badge: 'Student Rights'
    },
    {
      id: 'demo-3',
      category: 'consumer',
      title: 'Defective E-Commerce Product',
      prompt: 'I purchased a product online but the company is refusing to refund me.',
      subtitle: 'Defective goods, misleading specs, and unfair e-commerce trade practices',
      badge: 'Consumer Protection'
    },
    {
      id: 'demo-4',
      category: 'cyber',
      title: 'Online Threat & Blackmail',
      prompt: 'Someone is threatening me through messages and I have screenshots.',
      subtitle: 'Preserving digital evidence, NCRP reporting, and emergency safety',
      badge: 'Cyber Safety (Urgent)'
    },
    {
      id: 'demo-5',
      category: 'government',
      title: 'Delayed Public Document',
      prompt: 'I applied for a government document but my application has not been processed.',
      subtitle: 'Enforcing time-bound public service delivery and CPGRAMS appeals',
      badge: 'Public Services Guarantee'
    },
    {
      id: 'demo-6',
      category: 'housing',
      title: 'Landlord Withholding Deposit',
      prompt: 'My landlord is refusing to return my security deposit after vacating.',
      subtitle: 'Model Tenancy rules, key handover protocol, and DLSA mediation',
      badge: 'Tenancy & Housing'
    },
    {
      id: 'demo-7',
      category: 'employment',
      title: 'Withheld Salary / FnF Dues',
      prompt: 'My previous company is not paying my pending salary and final settlement.',
      subtitle: 'Payment of Wages Act, Shram Suvidha, and Labour Commissioner notice',
      badge: 'Workplace Rights'
    },
    {
      id: 'demo-8',
      category: 'banking',
      title: 'Unauthorized Bank Debit',
      prompt: 'Money was debited from my bank account without my OTP or permission.',
      subtitle: '72-Hour zero liability rule, 1930 golden hour hold, and RBI CMS Ombudsman',
      badge: 'Banking & Financial Security'
    }
  ];

  res.json({ demoScenarios });
});
