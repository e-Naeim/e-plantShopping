import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

export default function CartItem({ onContinueShopping }) {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const calculateTotalCost = item => item.price * item.quantity;
  const calculateTotalAmount = () => cart.reduce((total, item) => total + calculateTotalCost(item), 0);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const handleIncrement = item => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  const handleDecrement = item => item.quantity > 1
    ? dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }))
    : dispatch(removeItem(item.name));
  const handleRemove = item => dispatch(removeItem(item.name));
  return <main className="cart-container">
    <div className="catalog-intro"><p className="eyebrow">YOUR GREEN COLLECTION</p><h1>Your shopping cart</h1><p>Adjust the quantities and make room for your new favorites.</p></div>
    <div className="cart-layout"><section className="cart-items" aria-label="Cart items">
      {cart.length === 0 ? <div className="empty-cart"><span aria-hidden="true">❧</span><h2>Your cart is ready to grow</h2><p>Add a plant to get started.</p></div> : cart.map(item => <article className="cart-item" key={item.name} aria-label={`${item.name} in cart`}>
        <img className="cart-item-image" src={item.image} alt={item.name} />
        <div className="cart-item-details"><h2>{item.name}</h2><p>Unit price: ${item.price.toFixed(2)}</p>
          <div className="cart-item-quantity"><button aria-label={`Decrease ${item.name}`} onClick={() => handleDecrement(item)}>−</button><span aria-label={`${item.name} quantity`}>{item.quantity}</span><button aria-label={`Increase ${item.name}`} onClick={() => handleIncrement(item)}>+</button></div>
          <button className="cart-item-delete" aria-label={`Delete ${item.name}`} onClick={() => handleRemove(item)}>Delete</button>
        </div><p className="cart-item-total">Subtotal<strong>${calculateTotalCost(item).toFixed(2)}</strong></p>
      </article>)}
    </section><aside className="order-summary" aria-label="Order summary"><h2>Order summary</h2><p>Total plants <strong data-testid="total-quantity">{totalQuantity}</strong></p><p className="total-line">Total cart amount <strong data-testid="total-cost">${calculateTotalAmount().toFixed(2)}</strong></p><p className="summary-note">A little nature for your everyday.</p>
      <button className="button" disabled={!cart.length} onClick={() => setCheckoutMessage('Coming Soon! Checkout is not available yet.')}>Checkout</button>
      <p className="checkout-message" role="status">{checkoutMessage}</p>
      <button className="continue-shopping" onClick={onContinueShopping}>Continue Shopping →</button>
    </aside></div>
  </main>;
}
CartItem.propTypes = { onContinueShopping: PropTypes.func.isRequired };
