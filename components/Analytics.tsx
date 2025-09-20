import { AnalyticsData } from '../types';

interface AnalyticsProps {
  data: AnalyticsData | null;
}

export default function Analytics({ data }: AnalyticsProps) {
  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics</h2>
        <p className="text-gray-600">Memuat data analytics...</p>
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Pesan Terkirim',
      value: data.totalSent.toLocaleString(),
      icon: '📨',
      color: 'blue'
    },
    {
      title: 'Bot Terhubung',
      value: data.botConnected.toString(),
      icon: '✅',
      color: 'green'
    },
    {
      title: 'Bot Terputus',
      value: data.botDisconnected.toString(),
      icon: '❌',
      color: 'red'
    },
    {
      title: 'Sesi Aktif',
      value: data.activeSessions.toString(),
      icon: '👥',
      color: 'purple'
    },
    {
      title: 'Pendapatan Hari Ini',
      value: `${data.earningsToday.toLocaleString()}p`,
      icon: '💰',
      color: 'yellow'
    },
    {
      title: 'Rata-rata Pesan/Hari',
      value: Math.round(data.totalSent / 30).toLocaleString(),
      icon: '📊',
      color: 'indigo'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics & Statistik</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <span className="text-3xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6 border">
          <h3 className="font-medium text-gray-800 mb-4">Peringkat Performa</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Rate Pengiriman</span>
              <span className="font-medium text-green-600">98%</span>
            </div>
            <div className="flex justify-between">
              <span>Response Rate</span>
              <span className="font-medium text-blue-600">12%</span>
            </div>
            <div className="flex justify-between">
              <span>Error Rate</span>
              <span className="font-medium text-red-600">2%</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 border">
          <h3 className="font-medium text-gray-800 mb-4">Riwayat Blast</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Hari Ini</span>
              <span>150 pesan • 67.500p</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Minggu Ini</span>
              <span>850 pesan • 382.500p</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Bulan Ini</span>
              <span>3,200 pesan • 1.440.000p</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
