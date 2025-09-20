import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [waConnected, setWaConnected] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [saldo, setSaldo] = useState(0);
  const [blastStatus, setBlastStatus] = useState('');
  const [analytics, setAnalytics] = useState({ totalSent: 0, botConnected: 0, botDisconnected: 0 });

  useEffect(() => {
    // Fetch initial data seperti saldo dan status WA
    async function fetchData() {
      const res = await fetch('/api/analytics');
      if (res.ok) {
        const data = await res.json();
        setSaldo(data.saldo);
        setAnalytics(data);
        setWaConnected(data.botConnected > 0);
      }
    }
    fetchData();
  }, []);

  const handleConnectWA = async () => {
    // Logika connect WA (misal QR code)
    alert('Fitur connect WA belum diimplementasikan');
  };

  const handleBlast = async () => {
    setBlastStatus('Mengirim blast...');
    const res = await fetch('/api/wa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ speed }),
    });
    if (res.ok) {
      const data = await res.json();
      setSaldo(data.newSaldo);
      setBlastStatus('Blast selesai!');
    } else {
      setBlastStatus('Blast gagal');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Dashboard SewaNomer</h1>
      <p>Status WA: {waConnected ? 'Terhubung' : 'Tidak Terhubung'}</p>
      <button onClick={handleConnectWA}>Tautkan Perangkat WA</button>

      <div style={{ marginTop: 20 }}>
        <label>Pilih Kecepatan Blast:</label>
        <select value={speed} onChange={e => setSpeed(Number(e.target.value))}>
          <option value={1}>1 pesan/detik</option>
          <option value={2}>2 pesan/detik</option>
          <option value={5}>5 pesan/detik</option>
        </select>
      </div>

      <button onClick={handleBlast} style={{ marginTop: 20 }}>Blast</button>
      <p>{blastStatus}</p>

      <h2>Saldo Anda: {saldo}p</h2>

      <h3>Analisis</h3>
      <ul>
        <li>Total Pesan Terkirim: {analytics.totalSent}</li>
        <li>Bot Terhubung: {analytics.botConnected}</li>
        <li>Bot Terputus: {analytics.botDisconnected}</li>
      </ul>
    </div>
  );
}
