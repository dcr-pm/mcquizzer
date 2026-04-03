import React, { useState, useEffect } from 'react';

interface StockData {
  price: number;
  change: number;
  changePercent: number;
}

const StockTicker: React.FC = () => {
  const [stock, setStock] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await fetch('/.netlify/functions/stock-price');
        if (response.ok) {
          const data = await response.json();
          setStock(data);
        }
      } catch (err) {
        // Silently fail — ticker is non-critical
      }
      setLoading(false);
    };

    fetchStock();
    // Refresh every 5 minutes
    const interval = setInterval(fetchStock, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !stock) return null;

  const isUp = stock.change >= 0;

  return (
    <div className={`flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5 rounded-full ${isUp ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'}`}>
      <span className="font-bold">CRM</span>
      <span>${stock.price.toFixed(2)}</span>
      <span>
        <i className={`fa-solid ${isUp ? 'fa-caret-up' : 'fa-caret-down'} mr-0.5`}></i>
        {isUp ? '+' : ''}{stock.changePercent.toFixed(2)}%
      </span>
    </div>
  );
};

export default StockTicker;
