import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { speed, message, targetCount } = req.body;
    
    // Simulasi proses blast
    const cost = targetCount * 450;
    
    // Di sini Anda akan mengintegrasikan dengan WhatsApp API nyata
    // Untuk sekarang kita simulasikan saja
    
    setTimeout(() => {
      res.status(200).json({
        success: true,
        message: `Blast berhasil dikirim ke ${targetCount} kontak`,
        cost,
        messagesSent: targetCount
      });
    }, 2000);
    
  } else if (req.method === 'GET') {
    const { action } = req.query;
    
    if (action === 'status') {
      res.status(200).json({ connected: true, sessions: 1 });
    }
    
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
