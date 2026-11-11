export interface StatItem {
  value: string;
  targetNum: number;
  suffix: string;
  label: string;
  color: 'yellow' | 'cyan' | 'pink' | 'green' | 'purple' | 'orange';
}

export interface EducationItem {
  school: string;
  degree: string;
  years: string;
  tag: string;
  highlights: string[];
}

export interface JobHistoryItem {
  company: string;
  role: string;
  years: string;
  tag: string;
  colorTag: string;
  summary: string;
  highlights?: string[];
}

export interface AchievementItem {
  title: string;
  year: string;
  badge: string;
  color: 'yellow' | 'pink' | 'green' | 'cyan';
  description: string;
}

export interface SkillItem {
  name: string;
  category: 'Networking' | 'DevOps & SysAdmin' | 'Security & Risk' | 'Leadership & Support';
  color: 'yellow' | 'cyan' | 'pink' | 'green' | 'purple' | 'orange';
  proficiency?: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  color: 'yellow' | 'pink' | 'cyan' | 'green';
  description: string;
  techStack: string[];
  features?: string[];
  link?: string;
  linkLabel?: string;
}

export interface ContactInfo {
  label: string;
  value: string;
  href: string;
  copyable: boolean;
  icon: string;
  btnText: string;
}

export interface SyncedLead {
  id: string;
  type: 'inquiry' | 'appointment';
  name: string;
  email: string;
  phone?: string;
  title: string;
  dateOrTimeline: string;
  timestamp: string;
  syncedToSheets: boolean;
  syncedToCalendar: boolean;
  sheetSpreadsheetId?: string;
  calendarEventId?: string;
  calendarLink?: string;
  status: 'synced' | 'local_cached' | 'pending';
}
