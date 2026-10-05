import { useState } from 'react';

interface CandleData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface PriceChartProps {
  data: CandleData[];
  height?: number;
}

export default function PriceChart({ data, height = 300 }: PriceChartProps) {
  const [hoveredCandle, setHoveredCandle] = useState<CandleData | null>(null);

  if (!data || data.length === 0) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>No data</div>;
  }

  const width = 400;
  const padding = { top: 20, right: 50, bottom: 30, left: 10 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const volumeHeight = 40;

  // Price range
  const allHighs = data.map(d => d.high);
  const allLows = data.map(d => d.low);
  const maxPrice = Math.max(...allHighs);
  const minPrice = Math.min(...allLows);
  const priceRange = maxPrice - minPrice || 1;

  // Volume range
  const maxVolume = Math.max(...data.map(d => d.volume)) || 1;

  // Candle width
  const candleWidth = chartWidth / data.length;
  const bodyWidth = candleWidth * 0.6;

  const priceToY = (price: number) => {
    return padding.top + chartHeight - ((price - minPrice) / priceRange) * (chartHeight - volumeHeight - 10);
  };

  const volumeToY = (volume: number) => {
    return height - padding.bottom - (volume / maxVolume) * volumeHeight;
  };

  // Grid lines (5 horizontal)
  const gridLines = 5;
  const gridPrices = Array.from({ length: gridLines + 1 }, (_, i) => 
    minPrice + (priceRange * i) / gridLines
  );

  // Last price
  const lastCandle = data[data.length - 1];
  const lastPrice = lastCandle.close;
  const lastPriceY = priceToY(lastPrice);

  // Is uptrend?
  const isUp = lastCandle.close >= data[0].open;
  const lineColor = isUp ? '#4ade80' : '#ef4444';

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Price tooltip */}
      {hoveredCandle && (
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          background: 'rgba(0,0,0,0.85)',
          color: 'white',
          padding: '6px 10px',
          borderRadius: '6px',
          fontSize: '11px',
          zIndex: 10,
          fontFamily: 'monospace',
        }}>
          O: {hoveredCandle.open.toFixed(4)} H: {hoveredCandle.high.toFixed(4)}<br/>
          L: {hoveredCandle.low.toFixed(4)} C: {hoveredCandle.close.toFixed(4)}
        </div>
      )}

      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        style={{ display: 'block' }}
      >
        {/* Grid lines */}
        {gridPrices.map((price, i) => {
          const y = priceToY(price);
          return (
            <g key={i}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#1a1a1a"
                strokeWidth="1"
                strokeDasharray="2,4"
              />
              <text
                x={width - padding.right + 4}
                y={y + 3}
                fontSize="9"
                fill="#666"
                fontFamily="monospace"
              >
                {price.toFixed(2)}
              </text>
            </g>
          );
        })}

        {/* Candles */}
        {data.map((candle, i) => {
          const x = padding.left + i * candleWidth + candleWidth / 2;
          const isGreen = candle.close >= candle.open;
          const color = isGreen ? '#4ade80' : '#ef4444';
          
          const openY = priceToY(candle.open);
          const closeY = priceToY(candle.close);
          const highY = priceToY(candle.high);
          const lowY = priceToY(candle.low);
          
          const bodyTop = Math.min(openY, closeY);
          const bodyHeight = Math.max(Math.abs(closeY - openY), 1);

          return (
            <g
              key={i}
              onMouseEnter={() => setHoveredCandle(candle)}
              onMouseLeave={() => setHoveredCandle(null)}
              style={{ cursor: 'crosshair' }}
            >
              {/* Invisible hover area */}
              <rect
                x={padding.left + i * candleWidth}
                y={padding.top}
                width={candleWidth}
                height={chartHeight}
                fill="transparent"
              />
              {/* Wick */}
              <line
                x1={x}
                y1={highY}
                x2={x}
                y2={lowY}
                stroke={color}
                strokeWidth="1"
              />
              {/* Body */}
              <rect
                x={x - bodyWidth / 2}
                y={bodyTop}
                width={bodyWidth}
                height={bodyHeight}
                fill={isGreen ? color : color}
                stroke={color}
                strokeWidth="1"
              />
            </g>
          );
        })}

        {/* Last price line */}
        <line
          x1={padding.left}
          y1={lastPriceY}
          x2={width - padding.right}
          y2={lastPriceY}
          stroke={lineColor}
          strokeWidth="1"
          strokeDasharray="4,4"
          opacity="0.6"
        />

        {/* Last price label */}
        <rect
          x={width - padding.right + 2}
          y={lastPriceY - 8}
          width={padding.right - 4}
          height={16}
          fill={lineColor}
          rx="3"
        />
        <text
          x={width - padding.right + 6}
          y={lastPriceY + 3}
          fontSize="9"
          fill="#0a0a0a"
          fontWeight="bold"
          fontFamily="monospace"
        >
          {lastPrice.toFixed(2)}
        </text>

        {/* Volume bars */}
        {data.map((candle, i) => {
          const x = padding.left + i * candleWidth + candleWidth / 2;
          const isGreen = candle.close >= candle.open;
          const color = isGreen ? '#4ade8080' : '#ef444480';
          const volY = volumeToY(candle.volume);
          const volHeight = height - padding.bottom - volY;

          return (
            <rect
              key={`vol-${i}`}
              x={x - bodyWidth / 2}
              y={volY}
              width={bodyWidth}
              height={Math.max(volHeight, 1)}
              fill={color}
            />
          );
        })}

        {/* Bottom line */}
        <line
          x1={padding.left}
          y1={height - padding.bottom}
          x2={width - padding.right}
          y2={height - padding.bottom}
          stroke="#2a2a2a"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
