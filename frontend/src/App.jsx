import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, } from 'react-router-dom';
import './index.css';


function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* More Routes Here */}
      </Routes>
    </Router>
    </>
  )
}

export default App;
