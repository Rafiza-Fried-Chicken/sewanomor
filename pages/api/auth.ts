import { NextApiRequest, NextApiResponse } from 'next';

// Simulasi database (gunakan database nyata untuk production)
let users: any[] = [];
let sessions: any = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { action, ...data } = req.body || {};
  const { action: queryAction } = req.query;

  if (req.method === 'GET' && queryAction === 'me') {
    // Check session
    const sessionId = req.headers.authorization;
    if (sessionId && sessions[sessionId]) {
      return res.status(200).json(sessions[sessionId]);
    }
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    if (action === 'login') {
      const { email, password } = data;
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        const sessionId = Math.random().toString(36).substring(7);
        sessions[sessionId] = { ...user, password: undefined };
        
        res.setHeader('Set-Cookie', `session=${sessionId}; Path=/; HttpOnly`);
        return res.status(200).json({ message: 'Login berhasil' });
      }
      
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    if (action === 'register') {
      const { name, email, password } = data;
      
      if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'Email sudah terdaftar' });
      }

      const newUser = {
        id: Math.random().toString(36).substring(7),
        name,
        email,
        password,
        saldo: 10000, // Saldo awal
        waConnected: false
      };

      users.push(newUser);
      return res.status(201).json({ message: 'Registrasi berhasil' });
    }

    if (action === 'logout') {
      const sessionId = req.headers.authorization;
      if (sessionId) {
        delete sessions[sessionId];
      }
      res.setHeader('Set-Cookie', 'session=; Path=/; HttpOnly; Max-Age=0');
      return res.status(200).json({ message: 'Logout berhasil' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
