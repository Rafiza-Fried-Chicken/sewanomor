import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email dan password wajib diisi');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase(), password, action: 'login' }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push('/dashboard');
      } else {
        setError(data.message || 'Login gagal');
      }
    } catch {
      setError('Terjadi kesalahan jaringan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center font-sans px-4">
      <div className="bg-white rounded-lg shadow-lg p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">SewaNomer - Login</h1>
        <form onSubmit={handleLogin} noValidate>
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          <label htmlFor="email" className="block font-semibold text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            className="w-full border border-gray-300 rounded-md px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password" className="block font-semibold text-gray-700 mt-4">Password</label>
          <input
            id="password"
            type="password"
            className="w-full border border-gray-300 rounded-md px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password Anda"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-md mt-6 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Login'}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Belum punya akun?{' '}
          <a href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
            Daftar Sekarang
          </a>
        </p>
      </div>
    </div>
  );
}
