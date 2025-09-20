import { useState } from 'react';
import { BlastSettings } from '../types';

interface BlastControlProps {
  onBlastComplete: () => void;
}

const defaultMessages = [
  "Hai! Tertarik dengan promo spesial kami? Dapatkan penawaran terbatas sekarang! 🎯",
  "🔥 Promo Mingguan! Diskon hingga 50% untuk pembelian pertama. Jangan lewatkan!",
  "Halo! Ada kabar baik nih. Mau dapat voucher spesial? Klik link ini untuk info lebih lanjut!",
  "Selamat! Anda terpilih untuk penawaran eksklusif. Hubungi kami sekarang untuk klaim!",
  "📱 Update terbaru! Fitur baru telah tersedia. Yuk, coba dan beri tahu pendapat Anda!"
];

export default function BlastControl({ onBlastComplete }: BlastControlProps) {
  const [settings, setSettings] = useState<BlastSettings>({
    speed: 1,
    message: defaultMessages[0],
    targetCount: 100
  });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleBlast = async () => {
    if (settings.targetCount <= 0) {
      alert('Jumlah target harus lebih dari 0');
      return;
    }

    setLoading(true);
    setProgress(0);

    try {
      const res = await fetch('/api/wa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        // Simulasi progress bar
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              setLoading(false);
              onBlastComplete();
              return 100;
            }
            return prev + 5;
          });
        }, 200);
      } else {
        throw new Error('Blast gagal');
      }
    } catch (error) {
      setLoading(false);
      alert('Terjadi kesalahan saat mengirim blast');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Kontrol Blast Message</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kecepatan Blast (pesan/detik)
          </label>
          <select
            value={settings.speed}
            onChange={(e) => setSettings({ ...settings, speed: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={1}>1 pesan/detik (Slow)</option>
            <option value={2}>2 pesan/detik (Medium)</option>
            <option value={5}>5 pesan/detik (Fast)</option>
            <option value={10}>10 pesan/detik (Very Fast)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jumlah Target
          </label>
          <input
            type="number"
            min="1"
            max="1000"
            value={settings.targetCount}
            onChange={(e) => setSettings({ ...settings, targetCount: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Jumlah kontak target"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pesan yang akan dikirim
        </label>
        <select
          value={settings.message}
          onChange={(e) => setSettings({ ...settings, message: e.target.value })}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
        >
          {defaultMessages.map((msg, index) => (
            <option key={index} value={msg}>
              {msg.slice(0, 50)}...
            </option>
          ))}
        </select>
        <textarea
          value={settings.message}
          onChange={(e) => setSettings({ ...settings, message: e.target.value })}
          rows={4}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tulis pesan custom di sini..."
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Estimasi Biaya
        </label>
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <p className="text-yellow-800">
            Biaya: {settings.targetCount * 450}p
            <br />
            <span className="text-sm">(450p per pesan terkirim)</span>
          </p>
        </div>
      </div>

      <button
        onClick={handleBlast}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? 'Mengirim Blast...' : 'Mulai Blast'}
      </button>

      {loading && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            Mengirim {progress}% ({Math.round((progress / 100) * settings.targetCount)} dari {settings.targetCount} pesan)
          </p>
        </div>
      )}

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="font-medium text-green-800 mb-2">Info Penting:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
          <li>1 pesan terkirim = 450p</li>
          <li>Pesan akan dikirim ke kontak random</li>
          <li>Pastikan WA sudah terhubung sebelum blast</li>
          <li>Saldo akan dipotong setelah blast selesai</li>
        </ul>
      </div>
    </div>
  );
}
