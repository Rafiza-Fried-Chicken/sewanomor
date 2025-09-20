export default function handler(req, res) {
  // Dummy data analytics
  res.status(200).json({
    saldo: 10000,
    totalSent: 100,
    botConnected: 1,
    botDisconnected: 0,
  });
}
