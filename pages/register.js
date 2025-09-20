import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      alert('Registrasi berhasil, silakan login');
      router.push('/');
    } else {
      alert('Registrasi gagal');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h1>SewaNomer - Register</h1>
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Daftar</button>
      </form>
      <p>Sudah punya akun? <a href="/">Login</a></p>
    </div>
  );
}
