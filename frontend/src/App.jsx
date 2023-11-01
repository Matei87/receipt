import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import NoMatch from './components/NoMatch';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className='d-flex h-100'>
      <Sidebar />
      <main className='w-100 d-flex flex-column'>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='*' element={<NoMatch />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
};

export default App;
