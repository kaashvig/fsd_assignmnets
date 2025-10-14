import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import ProductGallery from './components/ProductGallery';
import Dashboard from './components/Dashboard';
import { products } from './data/products';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <AuthProvider>
      {showDashboard ? (
        <Dashboard onClose={() => setShowDashboard(false)} />
      ) : (
        <ProductGallery products={products} onShowDashboard={() => setShowDashboard(true)} />
      )}
    </AuthProvider>
  );
}

export default App;
