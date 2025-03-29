import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Your Shopping Cart</h2>

        {cart.length === 0 ? (
          <p className="text-center text-muted">Your cart is empty.</p>
        ) : (
          <ul className="list-group mb-4">
            {cart.map((item: CartItem) => (
              <li
                key={item.bookId}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{item.title}</strong> - ${item.price.toFixed(2)} |
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromCart(item.bookId)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <h3 className="text-center">Total: ${totalPrice.toFixed(2)}</h3>

        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-success me-2" disabled={cart.length === 0}>
            Checkout
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate('/books')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
