import React, { useState } from 'react';
import { Home } from './pages/Home';
import { PropertyDetails } from './pages/PropertyDetails';
import { Login } from './pages/Login';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';

function App() {
  const [page, setPage] = useState<'home' | 'details' | 'login'>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigateToHome = () => {
    setPage('home');
    setSelectedPropertyId(null);
  };

  const navigateToDetails = (id: number) => {
    setPage('details');
    setSelectedPropertyId(id);
  };

  const navigateToLogin = () => {
    setPage('login');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigateToHome();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        navigateToHome={navigateToHome} 
        navigateToLogin={navigateToLogin}
        isLoggedIn={isLoggedIn}
      />
      <main className="flex-grow">
        {page === 'home' && (
          <Home navigateToDetails={navigateToDetails} />
        )}
        {page === 'details' && selectedPropertyId && (
          <PropertyDetails 
            propertyId={selectedPropertyId} 
            navigateToHome={navigateToHome}
            isLoggedIn={isLoggedIn}
          />
        )}
        {page === 'login' && (
          <Login 
            handleLogin={handleLogin} 
            navigateToHome={navigateToHome} 
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;