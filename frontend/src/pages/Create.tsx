import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Create() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !symbol) return alert('Name aur Symbol zaroori hain');

    setLoading(true);
    try {
      // TODO: Contract se connect karke token create karo
      console.log('Creating token:', { name, symbol, description, imageUrl });
      alert('Token create request bheja gaya (demo)');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Error: ' + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="page-title">Create Token</h1>
      <p className="page-subtitle">Launch your meme coin in 1 click — 1 TON fee</p>

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Token Name</label>
          <input
            className="form-input"
            placeholder="e.g. Doge Killer"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={32}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Symbol</label>
          <input
            className="form-input"
            placeholder="e.g. DOGEK"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            maxLength={10}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-textarea"
            placeholder="Tell us about your token..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Image URL (optional)</label>
          <input
            className="form-input"
            placeholder="https://..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <p className="form-hint">Ya emoji use karein — jaise 🐕 🐸 🚀</p>
        </div>

        <button type="submit" className="form-submit" disabled={loading}>
          {loading ? 'Creating...' : '🚀 Create Token (1 TON)'}
        </button>
      </form>
    </div>
  );
}
