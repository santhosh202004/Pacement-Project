// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import 'bootstrap/dist/css/bootstrap.min.css'

// //import './App.css'
// import {BrowserRouter,Routes,Route} from 'react-router-dom'
// import Register from './Register'
// import Login from './Login'
// import Home from './Home'
// import NavBar from './Sidebar'
// import Analytics from './Analytics'


// function App() {

//   return (
//     <>
//     <BrowserRouter>
//    <Routes>
//    <Route path="/" element={<Register/>}></Route>
//     <Route path='/login' element={<Login/>}></Route>
//     <Route path='/home' element={<Home/>}></Route>
//     <Route path='/NavBar' element={<NavBar/>}></Route>
//     <Route path="/analytics" element={<Analytics />}
//      />


//    </Routes>
//    </BrowserRouter>
//     </>
//   )
// }

// export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Sidebar from './Sidebar'; // Assuming Sidebar is your navigation component
import Analytics from './Analytics';
import Container from './Container'; // Import the Container component
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Sidebar /> {/* Sidebar can be displayed on every page */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/container" element={<Container />} /> {/* Route for Container */}
            {/* Optional: Add a 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

// Optional NotFound component for 404 handling
const NotFound = () => {
  return <h2>404 Page Not Found</h2>;
};

export default App;

