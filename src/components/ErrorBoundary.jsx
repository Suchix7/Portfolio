import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("CRITICAL_SYSTEM_ERROR:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-8 text-center overflow-hidden relative">

          {/* Background HUD Accents */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* HUD Status Header */}
            <div className="flex items-center gap-3 mb-10 opacity-50">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              <span className="text-red-600 font-mono text-[10px] tracking-[0.4em] uppercase">Error_Detected // Node_Crash</span>
            </div>

            <h2 className="text-white text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6 leading-none">
              Perspective <br /> <span className="text-[#cbf902]">Shifted</span>
            </h2>

            <p className="text-white/40 font-mono text-[10px] md:text-xs max-w-sm mb-12 uppercase tracking-widest leading-relaxed">
              An unexpected glitch occurred in the matrix. <br />
              Recalibrating system parameters for optimal performance.
            </p>

            {/* Tactical Button */}
            <button
              onClick={() => window.location.reload()}
              className="group relative px-12 py-5 border border-white/20 overflow-hidden"
            >
              <span className="relative z-10 text-white font-mono text-[10px] tracking-[0.5em] uppercase group-hover:text-black transition-colors duration-300">
                Re-Initialize
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]" />
            </button>
          </div>

          {/* Footer HUD */}
          <div className="absolute bottom-10 w-full px-10 flex justify-between opacity-10 font-mono text-[8px] uppercase tracking-widest">
            <span>Kernel_Panic: 0x00452</span>
            <span>Ref_ID: {Math.random().toString(16).substr(2, 8).toUpperCase()}</span>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;