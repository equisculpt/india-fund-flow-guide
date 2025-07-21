// Pure CSS Animation without React hooks
const App = () => (
  <div className="min-h-screen bg-gradient-to-br from-background via-primary/20 to-secondary/20 flex items-center justify-center">
    <div className="text-center">
      <div className="w-32 h-40 bg-gradient-to-b from-primary to-primary-glow rounded-2xl mx-auto animate-float shadow-glow mb-8">
        <div className="w-20 h-20 bg-gradient-to-b from-accent to-accent/80 rounded-full mx-auto -mt-10 relative">
          <div className="absolute top-6 left-4 w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
          <div className="absolute top-6 right-4 w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
        </div>
      </div>
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-glow-pulse">ASI Brew Bot</h1>
      <p className="text-xl text-white/80 mb-8 animate-shimmer">Your AI-Powered SIP Assistant</p>
      <div className="bg-gradient-to-r from-primary via-secondary to-accent text-white px-8 py-4 rounded-full text-lg font-bold shadow-glow animate-float cursor-pointer">
        Start Your Dynamic SIP →
      </div>
    </div>
  </div>
);

export default App;
