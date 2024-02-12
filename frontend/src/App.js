import logo from './logo.svg';
import './App.css';
import { Home } from './pages/Home';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserHome } from './pages/UserHome';
import { CreateAccount, CreateAccountForm } from './pages/CreateAccount';
import { DetailedAccount } from './components/Account/DetailedAccount';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home"/>} />
        <Route path="/home" element={<Home />} />
        <Route path = "/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/detailedAccount" element={<DetailedAccount />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
