
import './App.css';
import AddInspectionForm from './component/AddInspectionForm';
import Footer from './component/Footer';
import HomePage from './component/HomePage';
import Login from './component/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './component/About';
import Navbar from './component/Navbar';
import NotificationPage from './component/NotificationPage';
import ContactPage from './component/ContactPage';

function App() {
  return (<div>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddInspectionForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/About" element={<About />} />
        <Route path="/NotificationPage" element={<NotificationPage />} />
        <Route path="/ContactPage" element={<ContactPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    
    </div>
  );
}

export default App;
