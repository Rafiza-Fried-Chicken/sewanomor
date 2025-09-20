import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import WAConnection from '../components/WAConnection';
import BlastControl from '../components/BlastControl';
import Analytics from '../components/Analytics';
import { User, AnalyticsData } from '../types';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth?action=me');
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          router.push('/');
        }
      } catch (error) {
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    if (user) {
      fetchAnalytics();
    }
  }, [user]);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch('/api/analytics');
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth?action=logout', { method: 'POST' });
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>SewaNomer - Dashboard</title>
      </Head>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img 
                src="/images/logo.png" 
                alt="SewaNomer Logo" 
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-gray-800">SewaNomer</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Saldo: {user.saldo.toLocaleString()}p</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
          {['dashboard', 'wa-connection', 'blast', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab === 'dashboard' && 'Dashboard'}
              {tab === 'wa-connection' && 'WA Connection'}
              {tab === 'blast' && 'Blast Message'}
              {tab === 'analytics' && 'Analytics'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <span className="text-blue-600 text-2xl">💰</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Saldo</p>
                  <p className="text-2xl font-bold text-gray-900">{user.saldo.toLocaleString()}p</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <span className="text-green-600 text-2xl">📱</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Status WA</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {user.waConnected ? 'Terhubung' : 'Putus'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <span className="text-purple-600 text-2xl">📨</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Pesan Terkirim</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analytics?.totalSent.toLocaleString() || '0'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <span className="text-orange-600 text-2xl">🎯</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Pendapatan Hari Ini</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analytics?.earningsToday.toLocaleString() || '0'}p
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'wa-connection' && <WAConnection />}
        {activeTab === 'blast' && <BlastControl onBlastComplete={fetchAnalytics} />}
        {activeTab === 'analytics' && <Analytics data={analytics} />}
      </main>
    </div>
  );
}
