import React from "react";
import './ProductList.css'
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface ProductListProps {
  filteredProducts: Product[];
  cart: CartItem[];
  addToCart: (p: Product) => void;
  increaseCartQty: (id: number) => void;
  decreaseCartQty: (id: number) => void;
  removeFromCart: (id: number) => void;
  removeProduct: (id: number) => void;
  toggleDetails: (id: number) => void;
  expandedId: number | null;
  total: number;
}

export default function ProductList({
  filteredProducts,
  cart,
  addToCart,
  increaseCartQty,
  decreaseCartQty,
  removeFromCart,
  removeProduct,
  toggleDetails,
  expandedId,
  total,
}: ProductListProps) {
  return (
    <>
      <div className="search-bar">
        {/* You can move the search input here if desired */}
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p) => (
            <React.Fragment key={p.id}>
              <tr>
                <td>
                  <img src={p.image} className="product-img" alt={p.name} />
                </td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>₱{p.price.toFixed(2)}</td>
                <td>{p.quantity}</td>
                <td>₱{(p.price * p.quantity).toFixed(2)}</td>
                <td>
                  <div className="action-buttons">
                    {p.quantity > 0 ? (
                      <button className="add-btn" onClick={() => addToCart(p)}>
                        Add
                      </button>
                    ) : (
                      <button className="out-btn">Out of stock</button>
                    )}
                    <button
                      className="view-btn"
                      onClick={() => toggleDetails(p.id)}
                    >
                      {expandedId === p.id ? "Hide" : "View Details"}
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => removeProduct(p.id)}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>

              {expandedId === p.id && (
                <tr className="detail-row">
                  <td colSpan={7}>
                    <strong>Description:</strong> {p.description}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className="cart-summary">
        <h3>🛒 Cart Summary</h3>
        {cart.length === 0 ? (
          <p className="cart-empty">No items in cart.</p>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((c) => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>₱{c.price.toFixed(2)}</td>
                    <td>
                      <div className="qty-controls">
                        <button onClick={() => decreaseCartQty(c.id)}>-</button>
                        <span>{c.quantity}</span>
                        <button onClick={() => increaseCartQty(c.id)}>+</button>
                      </div>
                    </td>
                    <td>₱{(c.price * c.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        className="cart-action-btn"
                        onClick={() => removeFromCart(c.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-footer">
              <p className="cart-total">Total: ₱{total.toFixed(2)}</p>
              {/* Clear and Buy buttons can be managed in parent */}
            </div>
          </>
        )}
      </div>
    </>
  );
}
