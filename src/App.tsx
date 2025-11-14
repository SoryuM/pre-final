import { useState } from "react";
import "./App.css";

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

export default function App() {
  const [activeTab, setActiveTab] = useState<"list" | "add" | "category">("list");

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "iPhone 15",
      category: "Phones",
      price: 55000,
      quantity: 10,
      image:
        "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2023/09/iphone-15-plus-15-3146328.jpg?tf=3840x",
      description:
        "The latest iPhone 15 offers an advanced camera system and A16 Bionic chip.",
    },
    {
      id: 2,
      name: "Samsung Galaxy S23",
      category: "Phones",
      price: 70000,
      quantity: 7,
      image:
        "https://media.cnn.com/api/v1/images/stellar/prod/230308120048-underscored-galaxy-s23-ultra-camera-lead.jpg?c=original",
      description:
        "Samsung’s Galaxy S23 features a sleek design, great camera, and fast performance.",
    },
    {
      id: 3,
      name: "AirPods Pro 2",
      category: "Earphones",
      price: 5000,
      quantity: 15,
      image:
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361",
      description: "Noise-cancelling earbuds with immersive sound quality.",
    },

    {
      id: 9,
      name: "Keychron K8 Pro Wireless Mechanical Keyboard",
      category: "Keyboard",
      price: 7999,
      quantity: 8,
      image:
        "https://cdn.shopify.com/s/files/1/0599/4977/7066/t/3/assets/keychronk8proqmkviawirelessmechanicalkeyboardformacwindowsosaprofilepbtkeycapspcbscrewinstabilizerwithhotswappablegaterongpromechanicalswitchcompatiblewithmxcherrypandakailhwithrgbbacklightaluminumframe-1645094681965-1657191021826_1200x.jpg?v=1657191023",
      description:
        "A compact, hot-swappable mechanical keyboard with RGB lighting and aluminum frame.",
    },

    {
      id: 10,
      name: "ASUS ZenBook 14 OLED",
      category: "Laptop",
      price: 65000,
      quantity: 6,
      image: "https://laptopmedia.com/wp-content/uploads/2024/01/2-17-e1704539345950.jpg",
      description:
        "A lightweight 14-inch laptop with OLED display and long battery life.",
    },

    {
      id: 11,
      name: "Anker PowerCore Essential 20,000mAh PD",
      category: "Powerbank",
      price: 5000,
      quantity: 15,
      image: "https://down-id.img.susercontent.com/file/sg-11134201-23020-niizv2r9banv4c",
      description:
        "A high-capacity powerbank with USB-C fast charging and durable design.",
    },

    {
      id: 12,
      name: "Logitech MX Master 3S",
      category: "Mouse",
      price: 4000,
      quantity: 10,
      image: "https://m.media-amazon.com/images/I/61ni3t1ryQL._AC_SL1500_.jpg",
      description:
        "Ergonomic wireless mouse with MagSpeed scrolling and customizable buttons.",
    },
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptItems, setReceiptItems] = useState<CartItem[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Phones",
    price: "",
    quantity: "",
    image: "",
    description: "",
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;

    const id = products.length + 1;

    setProducts([
      ...products,
      {
        id,
        name: newProduct.name,
        category: newProduct.category,
        price: parseFloat(newProduct.price),
        quantity: parseInt(newProduct.quantity) || 0,
        image: newProduct.image || "https://via.placeholder.com/100",
        description:
          newProduct.description ||
          `This ${newProduct.category.toLowerCase()} is designed for reliability.`,
      },
    ]);

    setNewProduct({
      name: "",
      category: "Phones",
      price: "",
      quantity: "",
      image: "",
      description: "",
    });
  };

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
    <div className="app">
      <h1>TECH STORE MANAGEMENT</h1>

      {/* TABS */}
      <div className="tabs">
        <button
          className={activeTab === "list" ? "active" : ""}
          onClick={() => setActiveTab("list")}
        >
          Product List
        </button>

        <button
          className={activeTab === "add" ? "active" : ""}
          onClick={() => setActiveTab("add")}
        >
          Add New Product
        </button>

        <button
          className={activeTab === "category" ? "active" : ""}
          onClick={() => setActiveTab("category")}
        >
          Category
        </button>
      </div>

      {/* CATEGORY TAB */}
      {activeTab === "category" && (
        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Phones">Phones</option>
            <option value="Earphones">Earphones</option>
            <option value="Powerbank">Powerbank</option>
            <option value="Keyboard">Keyboard</option>
            <option value="Mouse">Mouse</option>
            <option value="Smartwatch">Smartwatch</option>
            <option value="Laptop">Laptop</option>
          </select>
        </div>
      )}

      {/* PRODUCT LIST TAB */}
      {activeTab === "list" && (
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
                      <img src={p.image} className="product-img" />
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
        </>
      )}

      {/* ADD NEW PRODUCT TAB */}
      {activeTab === "add" && (
        <div className="form-section">
          <h3>Add New Product</h3>

          <div className="form-grid">
            <input
              type="text"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />

            <select
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
            >
              <option>Phones</option>
              <option>Earphones</option>
              <option>Powerbank</option>
              <option>Keyboard</option>
              <option>Mouse</option>
              <option>Smartwatch</option>
              <option>Laptop</option>
            </select>

            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Quantity"
              value={newProduct.quantity}
              onChange={(e) =>
                setNewProduct({ ...newProduct, quantity: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />

            <button className="add-product-btn" onClick={handleAddProduct}>
              Add Product
            </button>
          </div>
        </div>
      )}

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
              Total: ₱
              {receiptItems
                .reduce((s, r) => s + r.price * r.quantity, 0)
                .toFixed(2)}
            </p>

            <p>Thank you for your purchase!</p>

            <button className="btn-close" onClick={() => setShowReceipt(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
