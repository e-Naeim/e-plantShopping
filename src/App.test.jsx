import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, within, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './CartSlice';
import App from './App';
function renderApp() { return render(<Provider store={configureStore({ reducer: { cart: reducer } })}><App /></Provider>); }
function navigate(hash) { act(() => { window.location.hash = hash; window.dispatchEvent(new HashChangeEvent('hashchange')); }); }
afterEach(() => { window.location.hash = ''; });
describe('shopping flow', () => {
  it('provides landing page, company information and Get Started link', () => {
    renderApp();
    expect(screen.getByRole('heading', { name: /Paradise Nursery/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Bring nature a little closer' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Get Started/ })).toHaveAttribute('href', '#plants');
  });
  it('has six unique plants in each of three categories, 18 in total', () => {
    navigate('plants'); renderApp();
    for (const category of ['Air Purifying Plants', 'Aromatic Fragrant Plants', 'Easy-Care & Flowering Plants']) {
      expect(within(screen.getByRole('region', { name: category })).getAllByRole('article')).toHaveLength(6);
    }
    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(18);
    expect(new Set(cards.map(card => card.getAttribute('aria-label'))).size).toBe(18);
  });
  it('adds, disables, increments, decrements, deletes, re-adds and checks out', () => {
    navigate('plants'); renderApp();
    const plant = screen.getByRole('article', { name: 'Snake Plant' });
    fireEvent.click(within(plant).getByRole('button', { name: 'Add to Cart' }));
    expect(within(plant).getByRole('button', { name: 'Added to Cart' })).toBeDisabled();
    expect(screen.getByRole('link', { name: 'Cart, 1 items' })).toBeInTheDocument();
    navigate('cart');
    expect(screen.getByTestId('total-cost')).toHaveTextContent('$15.00');
    fireEvent.click(screen.getByRole('button', { name: 'Increase Snake Plant' }));
    fireEvent.click(screen.getByRole('button', { name: 'Increase Snake Plant' }));
    expect(screen.getByTestId('total-cost')).toHaveTextContent('$45.00');
    expect(screen.getByRole('link', { name: 'Cart, 3 items' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Decrease Snake Plant' }));
    expect(screen.getByTestId('total-quantity')).toHaveTextContent('2');
    fireEvent.click(screen.getByRole('button', { name: 'Checkout', exact: true }));
    expect(screen.getByRole('status')).toHaveTextContent('Coming Soon');
    fireEvent.click(screen.getByRole('button', { name: 'Delete Snake Plant' }));
    expect(screen.getByTestId('total-cost')).toHaveTextContent('$0.00');
    expect(screen.getByRole('button', { name: 'Checkout', exact: true })).toBeDisabled();
    navigate('plants');
    fireEvent.click(within(screen.getByRole('article', { name: 'Snake Plant' })).getByRole('button', { name: 'Add to Cart' }));
    navigate('cart');
    fireEvent.click(screen.getByRole('button', { name: 'Decrease Snake Plant' }));
    expect(screen.getByRole('heading', { name: 'Your cart is ready to grow' })).toBeInTheDocument();
  });
  it('retains cart through Home, Plants and browser-style navigation', () => {
    navigate('plants'); renderApp();
    fireEvent.click(within(screen.getByRole('article', { name: 'Mint' })).getByRole('button', { name: 'Add to Cart' }));
    navigate('home'); expect(screen.getByRole('link', { name: /Get Started/ })).toBeInTheDocument();
    navigate('plants'); expect(screen.getByRole('link', { name: 'Cart, 1 items' })).toBeInTheDocument();
    navigate('cart'); expect(screen.getByTestId('total-cost')).toHaveTextContent('$12.00');
    fireEvent.click(screen.getByRole('button', { name: /Continue Shopping/ }));
    expect(window.location.hash).toBe('#plants');
  });
});
