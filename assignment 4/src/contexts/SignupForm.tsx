import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function SignupForm({ onSignupSuccess }: { onSignupSuccess: () => void }) {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password, fullName);
      onSignupSuccess(); // e.g., redirect to dashboard
    } catch (error) {
      console.error(error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Sign Up</button>
    </form>
  );
}
