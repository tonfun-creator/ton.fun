import { useRef, useState, useEffect } from 'react';
import { playSound } from '../utils/sound';

interface MemeGeneratorProps {
  tokenName: string;
  tokenSymbol: string;
  emoji: string;
}

export default function MemeGenerator({ tokenName, tokenSymbol, emoji }: MemeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState(`$${tokenSymbol} TO THE MOON 🚀`);

  useEffect(() => {
    drawMeme();
  }, [topText, bottomText, emoji]);

  const drawMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = 400;
    const h = 400;
    canvas.width = w;
    canvas.height = h;

    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#4ade80');
    grad.addColorStop(1, '#1b5e20');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.font = '120px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, w / 2, h / 2);

    if (topText) {
      ctx.font = 'bold 28px Impact, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 4;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.strokeText(topText.toUpperCase(), w / 2, 20);
      ctx.fillText(topText.toUpperCase(), w / 2, 20);
    }

    if (bottomText) {
      ctx.font = 'bold 28px Impact, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 4;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.strokeText(bottomText.toUpperCase(), w / 2, h - 20);
      ctx.fillText(bottomText.toUpperCase(), w / 2, h - 20);
    }

    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText('ton.fun', w - 10, h - 6);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    playSound('success');
    const link = document.createElement('a');
    link.download = `${tokenSymbol}-meme.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    playSound('click');
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], `${tokenSymbol}-meme.png`, { type: 'image/png' });
        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `${tokenName} Meme`,
            text: `Check out $${tokenSymbol} on ton.fun!`,
          });
        } else {
          handleDownload();
        }
      });
    } catch {
      handleDownload();
    }
  };

  return (
    <div style={{ padding: '16px 0' }}>
      <h3 style={{ fontSize: '16px', fontWeight: 900, marginBottom: '12px' }}>
        🎨 Meme Generator
      </h3>

      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          maxWidth: '400px',
          borderRadius: '12px',
          border: '2px solid #2a2a2a',
          display: 'block',
          margin: '0 auto 12px',
        }}
      />

      <input
        type="text"
        placeholder="Top text"
        value={topText}
        onChange={(e) => setTopText(e.target.value)}
        maxLength={40}
        style={{
          width: '100%',
          padding: '10px 14px',
          background: '#141414',
          border: '1px solid #2a2a2a',
          borderRadius: '10px',
          color: '#fff',
          fontSize: '13px',
          marginBottom: '8px',
          outline: 'none',
        }}
      />

      <input
        type="text"
        placeholder="Bottom text"
        value={bottomText}
        onChange={(e) => setBottomText(e.target.value)}
        maxLength={40}
        style={{
          width: '100%',
          padding: '10px 14px',
          background: '#141414',
          border: '1px solid #2a2a2a',
          borderRadius: '10px',
          color: '#fff',
          fontSize: '13px',
          marginBottom: '12px',
          outline: 'none',
        }}
      />

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={handleDownload}
          style={{
            flex: 1,
            padding: '12px',
            background: '#141414',
            color: '#fff',
            border: '1px solid #2a2a2a',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          ⬇ Download
        </button>
        <button
          onClick={handleShare}
          style={{
            flex: 1,
            padding: '12px',
            background: '#4ade80',
            color: '#0a0a0a',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 800,
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          ↗ Share
        </button>
      </div>
    </div>
  );
}
