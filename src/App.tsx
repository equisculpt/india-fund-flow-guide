// Minimal app with animations
const App = () => (
  <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'system-ui' }}>
    <h1 className="animate-fade-in" style={{ animationDelay: '0.1s' }}>SIP Brewery</h1>
    <p className="animate-fade-in" style={{ animationDelay: '0.3s' }}>Welcome to India's #1 Mutual Fund Platform</p>
    <p className="animate-scale-in pulse" style={{ color: 'green', marginTop: '20px', animationDelay: '0.5s' }}>✓ React is working!</p>
    <div className="hover-scale" style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      color: 'white', 
      padding: '10px 20px', 
      borderRadius: '8px', 
      display: 'inline-block', 
      marginTop: '20px',
      cursor: 'pointer'
    }}>
      Hover me for animation!
    </div>
  </div>
);

export default App;
