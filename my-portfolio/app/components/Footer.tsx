'use client';
import { useState, useEffect } from 'react';
import FeedbackForm from './FeedbackForm';

export default function Footer() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  const fetchAverage = async () => {
    try {
      const res = await fetch('/api/feedback');
      const data = await res.json();
      setAverageRating(data.averageRating || 0);
    } catch {
      setAverageRating(0);
    }
  };

  useEffect(() => { fetchAverage(); }, []);

  const handleSuccess = () => {
    setShowFeedback(false);
    fetchAverage();
  };

  return (
    <footer className="footer">
      <div style={{ fontFamily: 'AkkuratPro' }}>
        © {new Date().getFullYear()} Zoe Mahler
        {averageRating !== null && ` - Moyenne des avis : ${averageRating.toFixed(1)} ★`}
      </div>

      <div style={{ display: 'flex', gap: 12, position: 'relative' }}>
        <button className='btn white'onClick={() => setShowFeedback(!showFeedback)}>
          Laisser un feedback
        </button>

        {showFeedback && (
          <div className="dropdown-form">
            <FeedbackForm onSubmitSuccess={handleSuccess} />
          </div>
        )}
      </div>
    </footer>
  );
}
