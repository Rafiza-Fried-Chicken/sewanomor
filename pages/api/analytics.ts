import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Data dummy analytics
  const analyticsData = {
    totalSent: 12450,
    botConnected: 3,
    botDisconnected: 1,
    activeSessions: 2,
    earningsToday: 67500
  };

  res.status(200).json(analyticsData);
}
