import { BrowserRouter, Routes, Route } from "react-router-dom";

// Simple test component without hooks
const SimpleHome = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h1>SIP Brewery</h1>
    <p>Welcome to India's #1 Mutual Fund Platform</p>
  </div>
);

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SimpleHome />} />
    </Routes>
  </BrowserRouter>
);

export default App;
