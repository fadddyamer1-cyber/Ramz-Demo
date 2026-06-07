import React from 'react';

export type ViewType = 
  | 'dashboard'
  | 'crm'
  | 'quotations'
  | 'projects'
  | 'maintenance'
  | 'hrms'
  | 'maps'
  | 'users-security'
  | 'ai';

export interface User {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  department: string;
}

export interface MetricCardConfig {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ElementType;
}
