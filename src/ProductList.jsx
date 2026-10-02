import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
// Eighteen unique products, six in each category.
const plantCatalog = [
  {
    "category": "Air Purifying Plants",
    "plants": [
      {
        "name": "Snake Plant",
        "image": "plants/snake-plant.svg",
        "description": "Upright patterned leaves with a sculptural shape.",
        "cost": "$15",
        "id": "snake-plant",
        "price": 15.0
      },
      {
        "name": "Spider Plant",
        "image": "plants/spider-plant.svg",
        "description": "Graceful arching leaves with bright green stripes.",
        "cost": "$12",
        "id": "spider-plant",
        "price": 12.0
      },
      {
        "name": "Peace Lily",
        "image": "plants/peace-lily.svg",
        "description": "Glossy green foliage and elegant white flowers.",
        "cost": "$18",
        "id": "peace-lily",
        "price": 18.0
      },
      {
        "name": "Boston Fern",
        "image": "plants/boston-fern.svg",
        "description": "Soft, feathery fronds for a lush green corner.",
        "cost": "$20",
        "id": "boston-fern",
        "price": 20.0
      },
      {
        "name": "Rubber Plant",
        "image": "plants/rubber-plant.svg",
        "description": "Broad glossy leaves with a deep green finish.",
        "cost": "$17",
        "id": "rubber-plant",
        "price": 17.0
      },
      {
        "name": "Aloe Vera",
        "image": "plants/aloe-vera.svg",
        "description": "A compact succulent with fleshy pointed leaves.",
        "cost": "$14",
        "id": "aloe-vera",
        "price": 14.0
      }
    ]
  },
  {
    "category": "Aromatic Fragrant Plants",
    "plants": [
      {
        "name": "Lavender",
        "image": "plants/lavender.svg",
        "description": "Purple flower spikes with a familiar floral fragrance.",
        "cost": "$20",
        "id": "lavender",
        "price": 20.0
      },
      {
        "name": "Jasmine",
        "image": "plants/jasmine.svg",
        "description": "Delicate blossoms and a sweet floral fragrance.",
        "cost": "$18",
        "id": "jasmine",
        "price": 18.0
      },
      {
        "name": "Rosemary",
        "image": "plants/rosemary.svg",
        "description": "Needle-like leaves and a distinctive herbal aroma.",
        "cost": "$15",
        "id": "rosemary",
        "price": 15.0
      },
      {
        "name": "Mint",
        "image": "plants/mint.svg",
        "description": "Fresh green leaves with a crisp, refreshing scent.",
        "cost": "$12",
        "id": "mint",
        "price": 12.0
      },
      {
        "name": "Lemon Balm",
        "image": "plants/lemon-balm.svg",
        "description": "Soft leaves with a gentle lemony fragrance.",
        "cost": "$14",
        "id": "lemon-balm",
        "price": 14.0
      },
      {
        "name": "Hyacinth",
        "image": "plants/hyacinth.svg",
        "description": "Clusters of colorful, fragrant spring flowers.",
        "cost": "$22",
        "id": "hyacinth",
        "price": 22.0
      }
    ]
  },
  {
    "category": "Easy-Care & Flowering Plants",
    "plants": [
      {
        "name": "ZZ Plant",
        "image": "plants/zz-plant.svg",
        "description": "Glossy foliage and an upright, easy-care habit.",
        "cost": "$25",
        "id": "zz-plant",
        "price": 25.0
      },
      {
        "name": "Pothos",
        "image": "plants/pothos.svg",
        "description": "Trailing heart-shaped leaves for a shelf or planter.",
        "cost": "$10",
        "id": "pothos",
        "price": 10.0
      },
      {
        "name": "Echinacea",
        "image": "plants/echinacea.svg",
        "description": "Bright daisy-like blooms with prominent centers.",
        "cost": "$16",
        "id": "echinacea",
        "price": 16.0
      },
      {
        "name": "Cast Iron Plant",
        "image": "plants/cast-iron-plant.svg",
        "description": "An attractive leafy plant suited to a sheltered spot.",
        "cost": "$20",
        "id": "cast-iron-plant",
        "price": 20.0
      },
      {
        "name": "Succulents",
        "image": "plants/succulents.svg",
        "description": "A varied collection of compact, drought-tolerant forms.",
        "cost": "$18",
        "id": "succulents",
        "price": 18.0
      },
      {
        "name": "Aglaonema",
        "image": "plants/aglaonema.svg",
        "description": "Decorative foliage with beautiful contrasting patterns.",
        "cost": "$22",
        "id": "aglaonema",
        "price": 22.0
      }
    ]
  }
];
const plantsArray = plantCatalog.map(group => ({ ...group, plants: group.plants.map(plant => ({ ...plant, image: `${import.meta.env.BASE_URL}${plant.image}` })) }));
import CartItem from './CartItem';
import './ProductList.css';

export default function ProductList({ page }) {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState({});
  // Synchronize after deletion/decrement-to-zero so a plant can be added again.
  useEffect(() => setAddedToCart(Object.fromEntries(cart.map(item => [item.name, true]))), [cart]);
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const handleAddToCart = plant => {
    dispatch(addItem(plant));
    setAddedToCart(previous => ({ ...previous, [plant.name]: true }));
  };
  return <>
    <header className="navbar">
      <a className="brand" href="#home" aria-label="Paradise Nursery Home"><span aria-hidden="true">❧</span><span>Paradise Nursery<small>Where Green Meets Serenity</small></span></a>
      <nav aria-label="Main navigation">
        <a href="#home">Home</a>
        <a href="#plants" aria-current={page === 'plants' ? 'page' : undefined}>Plants</a>
        <a className="cart-link" href="#cart" aria-label={`Cart, ${quantity} items`} aria-current={page === 'cart' ? 'page' : undefined}>
          <svg aria-hidden="true" viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 4h4l4 17h15l4-12H7"/><circle cx="12" cy="27" r="1.5"/><circle cx="24" cy="27" r="1.5"/></svg>
          <span>Cart</span><span className="cart-count" aria-live="polite">{quantity}</span>
        </a>
      </nav>
    </header>
    {page === 'cart' ? <CartItem onContinueShopping={() => { window.location.hash = 'plants'; }} /> :
      <main className="catalog">
        <div className="catalog-intro"><p className="eyebrow">GROW YOUR COLLECTION</p><h1>Find your kind of green</h1><p>Eighteen favorites, picked for beautiful everyday spaces.</p></div>
        {plantsArray.map(group => <section className="plant-section" key={group.category} aria-label={group.category}>
          <div className="section-heading"><h2>{group.category}</h2><span>{group.plants.length} plants</span></div>
          <div className="product-grid">{group.plants.map(plant => <article className="product-card" key={plant.name} aria-label={plant.name}>
            <img className="product-image" src={plant.image} alt={plant.name} loading="lazy" />
            <div className="product-content"><div className="product-title-row"><h3>{plant.name}</h3><span className="product-price">${plant.price.toFixed(2)}</span></div>
              <p>{plant.description}</p>
              <button className="product-button" disabled={Boolean(addedToCart[plant.name])} onClick={() => handleAddToCart(plant)}>{addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}</button>
            </div>
          </article>)}</div>
        </section>)}
      </main>}
    <footer className="site-footer">Paradise Nursery · A greener day starts here</footer>
  </>;
}
ProductList.propTypes = { page: PropTypes.oneOf(['plants', 'cart']).isRequired };
