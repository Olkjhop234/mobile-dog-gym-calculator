import React, { useEffect } from 'react';
import Calculator from './components/Calculator';

function App() {
  useEffect(() => {
    console.log("App component rendered");
  }, []);

  return (
    <div className="App">
      <Calculator />
    </div>
  );
}

export default App;
