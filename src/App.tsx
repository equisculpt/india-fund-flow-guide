// App with working Tailwind animations
const App = () => (
  <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'system-ui' }}>
    <h1 className="animate-float text-4xl font-bold mb-4">SIP Brewery</h1>
    <p className="animate-glow-pulse text-lg mb-4">Welcome to India's #1 Mutual Fund Platform</p>
    <p className="animate-shimmer text-green-500 text-xl font-semibold mb-6">✓ React is working!</p>
    <div className="animate-float" style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      color: 'white', 
      padding: '12px 24px', 
      borderRadius: '8px', 
      display: 'inline-block', 
      cursor: 'pointer',
      transition: 'transform 0.3s ease'
    }}
    onMouseEnter={(e) => (e.target as HTMLDivElement).style.transform = 'scale(1.05)'}
    onMouseLeave={(e) => (e.target as HTMLDivElement).style.transform = 'scale(1)'}
    >
      Animated Button!
    </div>
  </div>
);

export default App;
