import {
  StatItem,
  EducationItem,
  JobHistoryItem,
  AchievementItem,
  SkillItem,
  ProjectItem,
  ContactInfo,
} from '../types/index.ts';

export const portfolioData = {
  eyebrow: 'BAMZAM.LIVE',
  name: 'Hervie Keithrick Mariano',
  role: 'Network Administrator | IT Specialist | Quality & Fraud Analyst',
  shortBio:
    'Dedicated IT professional specialized in Cisco networking, Linux systems administration, root-cause quality assurance, and fraud mitigation.',
  summary:
    'Building high-reliability IT infrastructure and resilient network environments with curiosity, discipline, and practical problem solving. Passionate about systems administration, fraud prevention, hardware maintenance, and delivering seamless user experiences.',
  about: [
    'A dedicated Information Technology professional with a strong foundation in computer systems and network administration. Ready to build, configure, and maintain robust infrastructure across cloud and on-premise environments.',
    'Brings real-world industry experience across customer support, quality assurance coaching, and fraud analysis, combined with hands-on expertise in Cisco networking, Linux servers, Docker containers, and enterprise hardware diagnostics.',
    'Focused on minimizing downtime, securing network perimeters, automating repetitive workflows, and maintaining rigorous performance standards.'
  ],
  details: [
    { label: 'Location', value: 'Antipolo City, Rizal, Philippines', icon: '📍' },
    { label: 'Email', value: 'keithrick.mariano@hotmail.com', icon: '✉' },
    { label: 'Focus', value: 'Network Admin / IT Support / QA / DevOps', icon: '🎯' },
    { label: 'Availability', value: 'Open for Full-Time & Freelance Roles', icon: '🟢' },
  ],
  stats: [
    { value: '3+', targetNum: 3, suffix: '+', label: 'Major Honors & Awards', color: 'yellow' },
    { value: '4', targetNum: 4, suffix: '', label: 'Industry & MIS Roles', color: 'cyan' },
    { value: '12+', targetNum: 12, suffix: '+', label: 'Core Technical Skills', color: 'pink' },
    { value: '40+', targetNum: 40, suffix: '+', label: 'Agents Coached & Mentored', color: 'green' },
  ] as StatItem[],
  education: [
    {
      school: 'ICCT Colleges',
      degree: 'Bachelor of Science in Information Technology',
      years: '2022 - 2026',
      tag: 'COLLEGE DEGREE',
      highlights: [
        'Cisco Networking & Routing Protocols (OSPF, EIGRP, VLANs, Subnetting).',
        'Computer Hardware & Software Maintenance, diagnostics, and repairs.',
        'Network Security, Firewalls, and Linux Systems Administration.',
        'Final Year Capstone Project: IoT automated waste sorting detection.',
      ],
    },
    {
      school: 'Antipolo City Senior High School',
      degree: 'Humanities and Social Sciences Strand',
      years: '2020 - 2022',
      tag: 'HONOR GRADUATE',
      highlights: [
        'One of the Honor students of the 2022 graduating batch.',
        'Consecutive Honor Student recognition for Grades 11 and 12.',
        'Excellence in research, communication, and debate.',
      ],
    },
  ] as EducationItem[],
  jobHistory: [
    {
      company: 'ICCT COLLEGES',
      role: 'MIS Intern (Management Information Systems)',
      years: 'Jan 2026 - Mar 2026',
      tag: 'SYSADMIN & IT SUPPORT',
      colorTag: 'tag-green',
      summary:
        'Maintained campus IT infrastructure, resolved hardware/software support tickets, assisted in lab workstation deployments, and ensured 99.8% uptime for academic laboratory systems.',
      highlights: [
        'Diagnosed and repaired classroom and laboratory computer hardware.',
        'Assisted in structured cabling and LAN configuration across campus departments.',
        'Provisioned student and faculty network credentials securely.',
      ],
    },
    {
      company: 'Movate Inc.',
      role: 'Fraud Analyst',
      years: 'Jan 2025 - Dec 2025',
      tag: 'SECURITY & RISK',
      colorTag: 'tag-purple',
      summary:
        'Investigated suspicious accounts, transaction anomalies, and payment activities to identify patterns, neutralize vulnerabilities, and safeguard company and customer assets.',
      highlights: [
        'Analyzed fraudulent patterns and account takeovers using behavioral signals.',
        'Coordinated cross-functional escalations with compliance and risk teams.',
        'Reduced false-positive rates by developing tighter detection thresholds.',
      ],
    },
    {
      company: 'Alorica Philippines',
      role: 'Quality Analyst Coach',
      years: 'Jun 2024 - Jan 2025',
      tag: 'LEADERSHIP & QA',
      colorTag: 'tag-pink',
      summary:
        'Coached and evaluated over 40+ customer service agents, conducting root-cause evaluations and calibration sessions that elevated overall team performance and compliance scores by 18%.',
      highlights: [
        'Conducted weekly audits, calibration calls, and personalized coaching plans.',
        'Implemented standardized quality rubrics aligned with client SLAs.',
        'Recognized for exceptional leadership and communication empathy.',
      ],
    },
    {
      company: 'Alorica Philippines',
      role: 'Customer Service Representative',
      years: 'Nov 2022 - May 2024',
      tag: 'COMMUNICATIONS',
      colorTag: 'tag-blue',
      summary:
        'Helped global customers resolve complex technical inquiries promptly while consistently surpassing customer satisfaction (CSAT) and first-contact resolution benchmarks.',
      highlights: [
        'Handled tier-1 and tier-2 customer support issues with active listening.',
        'Consistently exceeded quarterly CSAT targets (>95%).',
      ],
    },
  ] as JobHistoryItem[],
  achievements: [
    {
      title: 'Academic Honors Recognition',
      year: '2022',
      badge: '★ HONORS GRADUATE',
      color: 'yellow',
      description:
        'Graduated as an Honor student in Humanities and Social Sciences (HUMSS), recognized for consistent academic excellence in Grades 11 and 12.',
    },
    {
      title: 'Promoted to Quality Analyst Coach',
      year: '2024',
      badge: '★ COACH OF 40+ AGENTS',
      color: 'pink',
      description:
        'Rapidly promoted to QA Coach at Alorica Philippines; mentored and elevated performance metrics of 40+ agents through systematic data-driven coaching.',
    },
    {
      title: 'Binovation Metal Waste Detector',
      year: '2025',
      badge: '★ CAPSTONE INNOVATION',
      color: 'green',
      description:
        'Engineered an IoT-enabled metal waste detector addressing environmental recycling needs, assisting electronic shops in sorting and reclaiming precious metals.',
    },
  ] as AchievementItem[],
  skills: [
    { name: 'Cisco Networking', category: 'Networking', color: 'yellow', proficiency: 90 },
    { name: 'Routing Protocols (OSPF/EIGRP)', category: 'Networking', color: 'cyan', proficiency: 85 },
    { name: 'VLANs & Subnetting', category: 'Networking', color: 'pink', proficiency: 92 },
    { name: 'Linux Server Administration', category: 'DevOps & SysAdmin', color: 'green', proficiency: 88 },
    { name: 'Docker & Containers', category: 'DevOps & SysAdmin', color: 'purple', proficiency: 80 },
    { name: 'Kubernetes Fundamentals', category: 'DevOps & SysAdmin', color: 'orange', proficiency: 75 },
    { name: 'Hardware & Cabling Diagnostics', category: 'Networking', color: 'yellow', proficiency: 95 },
    { name: 'Root Cause Analysis', category: 'Leadership & Support', color: 'cyan', proficiency: 92 },
    { name: 'Fraud Risk Investigation', category: 'Security & Risk', color: 'purple', proficiency: 89 },
    { name: 'Quality Assurance Coaching', category: 'Leadership & Support', color: 'pink', proficiency: 94 },
    { name: 'Python & Shell Scripting', category: 'DevOps & SysAdmin', color: 'green', proficiency: 82 },
    { name: 'Customer Experience & SLA', category: 'Leadership & Support', color: 'orange', proficiency: 96 },
  ] as SkillItem[],
  projects: [
    {
      id: 'proj-1',
      title: 'Neo-Brutalist Interactive Portfolio',
      category: 'Web & UI Engineering',
      badge: 'LIVE BUILD & LEAD SYNC',
      color: 'yellow',
      description:
        'A high-impact responsive Neo-Brutalist web application featuring Google Workspace lead capture, direct Google Calendar appointment synchronization, interactive terminal emulator, and dark mode.',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Google Sheets API', 'Google Calendar API'],
      features: [
        'Automated lead capture to Google Sheets',
        'Direct Google Calendar meeting synchronization',
        'Built-in Network Terminal CLI emulator',
        'Fluid responsive layout for Mobile, Tablet, and Desktop',
      ],
      link: '#top',
      linkLabel: 'Explore Features',
    },
    {
      id: 'proj-2',
      title: 'Binovation Metal Waste Detector',
      category: 'IoT Hardware & Sensors',
      badge: 'CAPSTONE PROJECT',
      color: 'pink',
      description:
        'An automated microcontroller-driven metal waste detection and sorting mechanism designed for environmental recycling efficiency in small electronics repair shops.',
      techStack: ['Microcontrollers', 'Inductive Sensors', 'C++', 'IoT Cloud', 'Hardware Interfacing'],
      features: [
        'Automated real-time metal vs non-metal sorting',
        'High-precision inductive proximity detection',
        'Low-cost deployment for local electronic recycling hubs',
      ],
      link: '#inquire',
      linkLabel: 'Inquire About Hardware',
    },
    {
      id: 'proj-3',
      title: 'Microcontroller Home Automation System',
      category: 'IoT & Smart Systems',
      badge: 'HARDWARE AUTOMATION',
      color: 'cyan',
      description:
        'An automated ecosystem for centralizing, monitoring, and remotely toggling household electrical appliances with safety relays and power consumption telemetry.',
      techStack: ['ESP32', 'MQTT', 'Node.js', 'Relay Modules', 'Web Dashboard'],
      features: [
        'Local and remote relay triggering over Wi-Fi',
        'Real-time temperature and load monitoring',
        'Failsafe power shutoff on overcurrent',
      ],
      link: '#inquire',
      linkLabel: 'Inquire About System',
    },
    {
      id: 'proj-4',
      title: 'Homelab & Containerized Server Cluster',
      category: 'DevOps & Virtualization',
      badge: 'SYSADMIN & VIRTUALIZATION',
      color: 'green',
      description:
        'A dedicated self-hosted server running enterprise microservices orchestrated with Docker and Kubernetes, backed by automated snapshots and firewall policies.',
      techStack: ['Ubuntu Server', 'Docker Compose', 'Kubernetes', 'Nginx Proxy Manager', 'WireGuard VPN'],
      features: [
        'Self-hosted DNS (Pi-hole) and WireGuard mesh VPN',
        'Automated container updates and SSL certificate renewal',
        'Isolated VLAN segment for IoT device containment',
      ],
      link: '#inquire',
      linkLabel: 'Inquire About Homelab',
    },
  ] as ProjectItem[],
  contactMessage:
    "Open for full-time opportunities, freelance infrastructure setups, networking consults, or tech discussions. Let's build something remarkable together!",
  contacts: [
    {
      label: 'Email',
      value: 'keithrick.mariano@hotmail.com',
      href: 'mailto:keithrick.mariano@hotmail.com',
      copyable: true,
      icon: '✉',
      btnText: 'Copy Email',
    },
    {
      label: 'Phone / WhatsApp',
      value: '+63 9389734983',
      href: 'tel:+639389734983',
      copyable: true,
      icon: '📞',
      btnText: 'Copy Number',
    },
    {
      label: 'LinkedIn Profile',
      value: 'linkedin.com/in/hervie-keithrick-mariano',
      href: 'https://www.linkedin.com/in/hervie-keithrick-mariano-2b4a40228/',
      copyable: false,
      icon: '🔗',
      btnText: 'Open Profile ↗',
    },
  ] as ContactInfo[],
};

export const serviceOptions = [
  'Network Infrastructure & Topology Design',
  'Cisco Routing & Switching (OSPF/VLANs)',
  'Linux Server Setup & Hardening',
  'Docker & Container Orchestration',
  'Quality Assurance Coaching & Root Cause Analysis',
  'Fraud Risk Investigation & Mitigation',
  'Hardware Maintenance & Campus IT Support',
  'IoT & Automation Consultation',
];

export const consultationTypes = [
  {
    id: '30-min-discovery',
    title: '30-min IT Infrastructure Discovery',
    duration: 30,
    desc: 'Quick triage and assessment of your network, server, or hardware requirements.',
  },
  {
    id: '60-min-architecture',
    title: '60-min Network Architecture Consultation',
    duration: 60,
    desc: 'Deep-dive review of subnetting, VLAN segmentation, security boundaries, and routing.',
  },
  {
    id: '45-min-qa-fraud',
    title: '45-min QA & Fraud Risk Strategy Session',
    duration: 45,
    desc: 'Analysis of agent coaching frameworks, QA metrics, or transaction risk patterns.',
  },
];
