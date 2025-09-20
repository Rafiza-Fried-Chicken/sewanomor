// Dummy API untuk simulasi blast pesan
let totalSent = 0;
let saldo = 10000; // saldo awal user

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { speed } = req.body;
    // Simulasi blast 10 pesan
    const pesanTerkirim = 10;
    const cost = pesanTerkirim * 450;

    if (saldo < cost) {
      return res.status(400).json({ message: 'Saldo tidak cukup' });
    }

    saldo -= cost;
    totalSent += pesanTerkirim;

    return res.status(200).json({ newSaldo: saldo, pesanTerkirim });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
