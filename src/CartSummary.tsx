import { useContext } from "react";
import { AppContext } from "./context";
import "./App.css";

interface Props {
  onBuyNow: () => void;
}

const CartSummary = ({ onBuyNow }: Props) => {
  const { items, setItems } = useContext(AppContext);

  const purchased = items.filter((i) => i.item_quantity > 0);
  const total = purchased.reduce((sum, i) => sum + i.item_cost * i.item_quantity, 0);

  const clearCart = () => {
    setItems(items.map((i) => ({ ...i, item_quantity: 0 })));
  };

  return (
    <div className="cart-summary">
      <h2>🛒 Cart Summary</h2>
      {purchased.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {purchased.map((item) => (
                <tr key={item.item_name}>
                  <td>{item.item_name}</td>
                  <td>{item.item_quantity}</td>
                  <td>
                    ₱{(item.item_cost * item.item_quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-footer">
            <p className="cart-total">Total: ₱{total.toLocaleString()}</p>
            <div className="cart-buttons">
              <button className="btn-clear" onClick={clearCart}>Clear</button>
              <button className="btn-buy" onClick={onBuyNow}>Buy Now</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSummary;
