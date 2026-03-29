import './LiquidGlass.css';

const LiquidGlass = () => {
  return (
    <div 
      className="liquid-glass-overlay" 
      aria-hidden="true"
    >
      <div className="liquid-glass-layer liquid-glass-layer-1"></div>
      <div className="liquid-glass-layer liquid-glass-layer-2"></div>
      <div className="liquid-glass-layer liquid-glass-layer-3"></div>
    </div>
  );
};

export default LiquidGlass;
