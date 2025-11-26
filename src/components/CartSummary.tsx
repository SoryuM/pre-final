import './CartSummary.css'

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartSummaryProps {
  cart: CartItem[];
  total: number;
  handleBuyNow: () => void;
  increaseCartQty: (id: number) => void;
  decreaseCartQty: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  showReceipt: boolean;
  setShowReceipt: (show: boolean) => void;
  receiptItems: CartItem[];
}

export default function CartSummary({
  cart,
  total,
  handleBuyNow,
  increaseCartQty,
  decreaseCartQty,
  removeFromCart,
  clearCart,
  showReceipt,
  setShowReceipt,
  receiptItems,
}: CartSummaryProps) {
  return (
    <>
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
              <button className="btn-clear" onClick={clearCart}>
                Clear
              </button>
              <button className="btn-buy" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </>
        )}
      </div>

      {showReceipt && (
        <div className="receipt-modal">
          <div className="receipt-card">
            <h3>🧾 Purchase Receipt</h3>
            <table className="receipt-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {receiptItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>₱{item.price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>₱{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="receipt-total">
              Total: ₱{receiptItems.reduce((s, r) => s + r.price * r.quantity, 0).toFixed(2)}
            </p>
            <p>Thank you for your purchase!</p>
            <button className="btn-close" onClick={() => setShowReceipt(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}