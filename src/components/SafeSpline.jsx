import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';

class SplineErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // Silently handle errors from Spline to prevent full-app crashes
    // Optionally, could log to a service here.
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-cyan-400/20 animate-pulse" />
            <p className="mt-3 text-sm text-slate-300">Interactive 3D is unavailable right now.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function SafeSpline({ scene }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="absolute inset-0">
      <SplineErrorBoundary>
        {mounted ? (
          <Spline scene={scene} style={{ width: '100%', height: '100%' }} />
        ) : null}
      </SplineErrorBoundary>
    </div>
  );
}
