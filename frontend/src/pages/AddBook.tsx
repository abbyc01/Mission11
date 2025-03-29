import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function AddBook() {
  const navigate = useNavigate();
  const { title, bookID, price } = useParams();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookID),
      title: title || 'No Book Found',
      price: Number(price),
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg p-4 text-center"
        style={{ maxWidth: '400px' }}
      >
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <h3 className="text-primary">Price: ${price}</h3>
          <div className="mt-4">
            <button
              className="btn btn-success w-100 mb-2"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => navigate('/books')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBook;
