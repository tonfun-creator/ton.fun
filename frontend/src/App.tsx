import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Create from './pages/Create';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Routes>
          <Route path="*" element={<Create />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
