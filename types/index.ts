export interface User {
  id: string;
  email: string;
  name: string;
  saldo: number;
  waConnected: boolean;
}

export interface AnalyticsData {
  totalSent: number;
  botConnected: number;
  botDisconnected: number;
  activeSessions: number;
  earningsToday: number;
}

export interface BlastSettings {
  speed: number;
  message: string;
  targetCount: number;
}
