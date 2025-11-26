import { useState } from "react";
import CartSummary from "./CartSummary";

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
  products: Product[];
  setProducts: (products: Product[]) => void;
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  showReceipt: boolean;
  setShowReceipt: (show: boolean) => void;
  receiptItems: CartItem[];
  setReceiptItems: (items: CartItem[]) => void;
}

export default function ProductList({
  products,
  setProducts,
  cart,
  setCart,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  showReceipt,
  setShowReceipt,
  receiptItems,
  setReceiptItems,
}: ProductListProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const addToCart = (p: Product) => {
    const inCart = cart.find((c) => c.id === p.id)?.quantity || 0;
    const available = p.quantity - inCart;

    if (available <= 0) {
      alert("No more stock available.");
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === p.id);
      if (existing) {
        return prev.map((item) =>
          item.id === p.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: p.id, name: p.name, price: p.price, quantity: 1 }];
    });
  };

  const increaseCartQty = (id: number) => {
    const prod = products.find((p) => p.id === id);
    if (!prod) return;

    const inCart = cart.find((c) => c.id === id)?.quantity || 0;

    if (inCart + 1 > prod.quantity) {
      alert("Not enough stock.");
      return;
    }

    setCart((prev) =>
      prev.map((c) => (c.id === id ? { ...c, quantity: c.quantity + 1 } : c))
    );
  };

  const decreaseCartQty = (id: number) => {
    const item = cart.find((c) => c.id === id);
    if (!item) return;

    if (item.quantity <= 1) {
      setCart((prev) => prev.filter((c) => c.id !== id));
    } else {
      setCart((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, quantity: c.quantity - 1 } : c
        )
      );
    }
  };

  const removeFromCart = (id: number) =>
    setCart((prev) => prev.filter((c) => c.id !== id));

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleBuyNow = () => {
    if (cart.length === 0) {
      alert("Cart is empty.");
      return;
    }

    for (const ci of cart) {
      const prod = products.find((p) => p.id === ci.id);
      if (!prod || ci.quantity > prod.quantity) {
        alert(`Not enough stock for ${ci?.name}.`);
        return;
      }
    }

    const updatedProducts = products.map((p) => {
      const ci = cart.find((c) => c.id === p.id);
      return ci ? { ...p, quantity: p.quantity - ci.quantity } : p;
    });

    setProducts(updatedProducts);
    setReceiptItems(cart.map((c) => ({ ...c })));
    setCart([]);
    setShowReceipt(true);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const removeProduct = (id: number) => {
    if (confirm("Are you sure?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const toggleDetails = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search product by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
            <>
              <tr key={p.id}>
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
            </>
          ))}
        </tbody>
      </table>

      <CartSummary
        cart={cart}
        setCart={setCart}
        total={total}
        handleBuyNow={handleBuyNow}
        increaseCartQty={increaseCartQty}
        decreaseCartQty={decreaseCartQty}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        showReceipt={showReceipt}
        setShowReceipt={setShowReceipt}
        receiptItems={receiptItems}
      />
    </>
  );
}