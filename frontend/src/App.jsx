import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, } from 'react-router-dom';
import './index.css';
import Transactions from "./pages/Transactions";
import BudgetBuddy from "./pages/BudgetBuddy";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import Goals from "./pages/Goals";
import MyProfile from "./pages/MyProfile";


function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/assistant" element={<BudgetBuddy />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<MyProfile/>} />
        <Route path="/settings" element={<Settings />} />
        {/* More Routes Here */}
      </Routes>
    </Router>
    </>
  )
}

export default App;
