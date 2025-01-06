
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
import ProtectedRoute from './component/ProtectedRoute';
import CardPage from './component/CardPage';
import FormPage from './component/FormPage';
function App() {

  const cardsData = [
    { path: '/AddproductsBC-1A', title: 'BC-1A', description: 'Conveyer belt shows in this card', imageUrl: 'https://shorturl.at/vH0FJ' },
    { path: '/AddproductsBC-1B', title: 'BC-1B', description: 'Conveyer belt shows in this card', imageUrl: 'https://shorturl.at/VfsR9' },
    { path: '/AddproductsBC-2A', title: 'BC-2A', description: 'Conveyer belt shows in this card', imageUrl: 'https://shorturl.at/t7R3Q' },
    { path: '/AddproductsBC-2B', title: 'BC-2B', description: 'Conveyer belt shows in this card', imageUrl: 'https://shorturl.at/oCPyw' },
    { path: '/AddproductsBC-3A', title: 'BC-3A', description: 'Conveyer belt shows in this card', imageUrl: 'https://shorturl.at/iD9ml' },
    { path: '/AddproductsBC-3B', title: 'BC-3B', description: 'Conveyer belt shows in this card', imageUrl: 'https://shorturl.at/VfsR9' },
    { path: '/AddproductsBC-4A', title: 'BC-4A', description: 'Conveyer belt shows in this card', imageUrl: 'https://shorturl.at/oCPyw' },
    { path: '/AddproductsBC-4B', title: 'BC-4B', description: 'Conveyer belt shows in this card', imageUrl: 'https://shorturl.at/oCPyw' },
    { path: '/AddproductsBC-5A', title: 'BC-5A', description: 'Conveyer belt shows in this card', imageUrl: 'https://shorturl.at/t7R3Q' },
    { path: '/AddproductsBC-5B', title: 'BC-5B', description: 'Conveyer belt shows in this card', imageUrl: 'https://shorturl.at/vH0FJ' },
    { path: '/AddproductsBC-6A', title: 'BC-6A', description: 'Conveyer belt shows in this card', imageUrl: 'https://shorturl.at/iD9ml' },
    { path: '/AddproductsBC-6B', title: 'BC-6B', description: 'Conveyer belt shows in this card', imageUrl: 'https://shorturl.at/VfsR9' },
    { path: '/AddproductsBC-7A', title: 'BC-7A', description: 'Conveyer belt shows in this card', imageUrl: 'https://shorturl.at/oCPyw' },
    { path: '/AddproductsBC-7B', title: 'BC-7B', description: 'Conveyer belt shows in this card', imageUrl: 'https://shorturl.at/iD9ml' },
    { path: '/AddproductsBC-8A', title: 'BC-8A', description: 'Conveyer belt shows in this card', imageUrl: 'https://shorturl.at/VfsR9' },
    { path: '/AddproductsBC-8B', title: 'BC-8B', description: 'Conveyer belt shows in this card', imageUrl: 'https://shorturl.at/oCPyw' },
    { path: '/AddproductsBC-9A', title: 'BC-9A', description: 'Conveyer belt shows in this card', imageUrl: 'https://shorturl.at/t7R3Q' },
    { path: '/AddproductsBC-9B', title: 'BC-9B', description: 'Conveyer belt shows in this card', imageUrl: 'https://shorturl.at/vH0FJ' },
    { path: '/AddproductsBC-10A', title: 'BC-10A', description: 'Conveyer belt shows in this card', imageUrl: 'https://shorturl.at/iD9ml' },
    { path: '/AddproductsBC-10B', title: 'BC-10B', description: 'Conveyer belt shows in this card', imageUrl: 'https://shorturl.at/VfsR9' },
    { path: '/AddproductsBC-11A', title: 'BC-11A', description: 'Conveyer belt shows in this card', imageUrl: 'https://shorturl.at/oCPyw' },
    { path: '/AddproductsBC-11B', title: 'BC-11B', description: 'Conveyer belt shows in this card', imageUrl: 'https://shorturl.at/iD9ml' },
    { path: '/AddproductsBC-12A', title: 'BC-12A', description: 'Conveyer belt shows in this card', imageUrl: 'https://shorturl.at/VfsR9' },
    { path: '/AddproductsBC-12B', title: 'BC-12B', description: 'Conveyer belt shows in this card', imageUrl: 'https://shorturl.at/oCPyw' },

  ];


  return (<div>
    <BrowserRouter>
      <Navbar />
      <Routes>
      {cardsData.map((card, index) => (
          <Route
            key={index}
            path={card.path}
            element={<CardPage title={card.title} description={card.description} imageUrl={card.imageUrl} />}
          />
        ))}

        <Route path="/*" element={<HomePage />} />
        <Route path="/add" element={<ProtectedRoute>
              <AddInspectionForm />
            </ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/About" element={<About />} />
        <Route path="/NotificationPage" element={<NotificationPage />} />
        <Route path="/ContactPage" element={<ContactPage />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    
    </div>
  );
}

export default App;
