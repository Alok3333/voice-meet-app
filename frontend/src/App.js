import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/common/Navigation/Navigation';
// import Register from './pages/Register/Register';
// import Login from './pages/Login/Login';
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';

// const isAuth = true;

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authenticate" element={<Authenticate/>} />
        <Route path='/activate' element={<Activate />} />

        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path='/login' element={<Login/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
