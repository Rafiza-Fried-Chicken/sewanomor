// Contoh sederhana tanpa database, gunakan DB nyata untuk produksi
let users = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Login
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      res.status(200).json({ message: 'Login berhasil' });
    } else {
      res.status(401).json({ message: 'Email atau password salah' });
    }
  } else if (req.method === 'PUT') {
    // Register
    const { email, password } = req.body;
    if (users.find(u => u.email === email)) {
      res.status(400).json({ message: 'Email sudah terdaftar' });
    } else {
      users.push({ email, password });
      res.status(201).json({ message: 'Registrasi berhasil' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
