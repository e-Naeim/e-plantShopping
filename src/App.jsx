import { useEffect, useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

const currentPage = () => ['plants', 'cart'].includes(window.location.hash.slice(1))
  ? window.location.hash.slice(1) : 'home';

export default function App() {
  const [page, setPage] = useState(currentPage);
  useEffect(() => {
    const handleNavigation = () => setPage(currentPage());
    window.addEventListener('hashchange', handleNavigation);
    return () => window.removeEventListener('hashchange', handleNavigation);
  }, []);
  useEffect(() => { document.title = `${page === 'home' ? 'Welcome' : page === 'plants' ? 'Plants' : 'Your Cart'} | Paradise Nursery`; }, [page]);
  if (page !== 'home') return <ProductList page={page} />;
  return (
    <main className="landing-page">
      <div className="background-image" aria-hidden="true" />
      <div className="landing-content">
        <div className="landing-intro">
          <p className="eyebrow">WHERE GREEN MEETS SERENITY</p>
          <h1>Paradise<br />Nursery</h1>
          <p className="landing-tagline">A little green.<br />A lot of joy.</p>
          <a className="button get-started-button" href="#plants">Get Started <span aria-hidden="true">↗</span></a>
        </div>
        <AboutUs />
      </div>
      <p className="landing-footer">Thoughtfully chosen plants for your everyday spaces</p>
    </main>
  );
}
