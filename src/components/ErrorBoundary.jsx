import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught runtime error]:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.hash = '#/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2.5rem 1.5rem',
          textAlign: 'center',
          color: '#ffffff',
          backgroundColor: '#0b0b0b',
          borderRadius: '24px',
          margin: '3rem auto',
          maxWidth: '720px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
        }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#ef2029' }}>
            Something went wrong
          </h2>
          <p style={{ color: '#a1a1aa', marginBottom: '1.75rem', maxWidth: '480px', lineHeight: '1.6', fontSize: '0.95rem' }}>
            We encountered an unexpected issue displaying this content. Please try returning home or refreshing the page.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              padding: '0.85rem 2rem',
              borderRadius: '9999px',
              backgroundColor: '#FF2B2B',
              color: '#ffffff',
              fontWeight: '600',
              fontSize: '0.95rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 24px rgba(255, 43, 43, 0.22)',
              transition: 'all 0.2s ease'
            }}
          >
            Return to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
