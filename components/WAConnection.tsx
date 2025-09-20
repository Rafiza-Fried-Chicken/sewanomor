import { useState } from 'react';

export default function WAConnection() {
  const [qrCode, setQrCode] = useState('');
  const [status, setStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [loading, setLoading] = useState(false);

  const connectWA = async () => {
    setLoading(true);
    setStatus('connecting');
    
    try {
      // Simulasi generate QR code
      setTimeout(() => {
        setQrCode('https://placeholder-image-service.onrender.com/image/300x300?prompt=QR%20Code%20for%20WhatsApp%20connection%20scan%20to%20link%20device&id=wa-qr-123');
        setStatus('connected');
        setLoading(false);
      }, 2000);
    } catch (error) {
      setStatus('disconnected');
      setLoading(false);
      alert('Gagal menghubungkan WA');
    }
  };

  const disconnectWA = async () => {
    setLoading(true);
    try {
      await fetch('/api/wa?action=disconnect', { method: 'POST' });
      setStatus('disconnected');
      setQrCode('');
    } catch (error) {
      alert('Gagal memutuskan koneksi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Hubungkan WhatsApp</h2>
      
      <div className="text-center">
        {status === 'disconnected' && (
          <button
            onClick={connectWA}
            disabled={loading}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Hubungkan WhatsApp'}
          </button>
        )}

        {status === 'connecting' && (
          <div className="space-y-4">
            <div className="animate-pulse bg-gray-200 h-64 w-64 mx-auto rounded-lg"></div>
            <p className="text-gray-600">Mempersiapkan koneksi...</p>
          </div>
        )}

        {status === 'connected' && qrCode && (
          <div className="space-y-4">
            <img 
              src={qrCode} 
              alt="QR Code untuk menghubungkan WhatsApp - Scan kode ini dengan WhatsApp Web" 
              className="mx-auto border-4 border-green-400 rounded-lg"
            />
            <p className="text-green-600 font-medium">Scan QR code di atas dengan WhatsApp Web</p>
            <button
              onClick={disconnectWA}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Putuskan Koneksi
            </button>
          </div>
        )}

        {status === 'connected' && !qrCode && (
          <div className="text-center">
            <img 
              src="/images/success.png" 
              alt="WhatsApp connected successfully - Device linked and ready for messaging" 
              className="h-32 mx-auto mb-4"
            />
            <p className="text-green-600 font-medium text-lg">WhatsApp Terhubung!</p>
            <p className="text-gray-600">Perangkat Anda siap untuk blast message</p>
            <button
              onClick={disconnectWA}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Putuskan Koneksi
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-2">Cara menghubungkan:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700">
          <li>Klik tombol "Hubungkan WhatsApp"</li>
          <li>Scan QR code yang muncul dengan WhatsApp Web</li>
          <li>Tunggu hingga status berubah menjadi "Terhubung"</li>
          <li>Mulai kirim blast message!</li>
        </ol>
      </div>
    </div>
  );
}
