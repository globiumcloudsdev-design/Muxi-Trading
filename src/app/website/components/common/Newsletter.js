'use client';
import { useState } from 'react';
import Button from '../ui/Button';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div>
      <h4 className="font-semibold text-sm mb-2">Newsletter</h4>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-3 py-2 text-gray-800 rounded-l-lg focus:outline-none"
          required
        />
        <Button variant="primary" className="rounded-l-none">
          Subscribe
        </Button>
      </form>
      {subscribed && (
        <p className="text-green-500 text-xs mt-2">Subscribed successfully!</p>
      )}
    </div>
  );
}