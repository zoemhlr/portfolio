'use client';
import { useState } from 'react';

interface FeedbackFormProps {
  onSubmitSuccess?: () => void;
}

export default function FeedbackForm({ onSubmitSuccess }: FeedbackFormProps) {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, rating }),
      });
      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
        setRating(0);
        if (onSubmitSuccess) onSubmitSuccess();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label>
        Note
        <div className="star-rating">
          {[1,2,3,4,5].map(star => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={star <= rating ? 'star selected' : 'star'}
            >
              ★
            </span>
          ))}
        </div>
      </label>

    {/*
      <label>
        Nom
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>

      <label>
        Email
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>

      <label>
        Message
        <textarea value={message} onChange={e => setMessage(e.target.value)} />
      </label> */}

      <button type="submit" className="form-submit-btn">
        Envoyer
      </button>

      {status === 'success' && <p className="status-message success">Merci pour votre retour !</p>}
      {status === 'error' && <p className="status-message error">Une erreur est survenue, réessayez.</p>}
    </form>
  );
}
