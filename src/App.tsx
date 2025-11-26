import { useState } from "react";
import "./App.css";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import CategoryFilter from "./components/CategoryFilter";

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
      image: "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2023/09/iphone-15-plus-15-3146328.jpg?tf=3840x",
      description: "The latest iPhone 15 offers an advanced camera system and A16 Bionic chip.",
    },
    {
      id: 2,
      name: "Samsung Galaxy S23",
      category: "Phones",
      price: 70000,
      quantity: 7,
      image: "https://media.cnn.com/api/v1/images/stellar/prod/230308120048-underscored-galaxy-s23-ultra-camera-lead.jpg?c=original",
      description: "Samsung's Galaxy S23 features a sleek design, great camera, and fast performance.",
    },
    {
      id: 3,
      name: "AirPods Pro 2",
      category: "Earphones",
      price: 5000,
      quantity: 15,
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361",
      description: "Noise-cancelling earbuds with immersive sound quality.",
    },
    {
      id: 9,
      name: "Keychron K8 Pro Wireless Mechanical Keyboard",
      category: "Keyboard",
      price: 7999,
      quantity: 8,
      image: "https://cdn.shopify.com/s/files/1/0599/4977/7066/t/3/assets/keychronk8proqmkviawirelessmechanicalkeyboardformacwindowsosaprofilepbtkeycapspcbscrewinstabilizerwithhotswappablegaterongpromechanicalswitchcompatiblewithmxcherrypandakailhwithrgbbacklightaluminumframe-1645094681965-1657191021826_1200x.jpg?v=1657191023",
      description: "A compact, hot-swappable mechanical keyboard with RGB lighting and aluminum frame.",
    },
    {
      id: 10,
      name: "ASUS ZenBook 14 OLED",
      category: "Laptop",
      price: 65000,
      quantity: 6,
      image: "https://laptopmedia.com/wp-content/uploads/2024/01/2-17-e1704539345950.jpg",
      description: "A lightweight 14-inch laptop with OLED display and long battery life.",
    },
    {
      id: 11,
      name: "Anker PowerCore Essential 20,000mAh PD",
      category: "Powerbank",
      price: 5000,
      quantity: 15,
      image: "https://down-id.img.susercontent.com/file/sg-11134201-23020-niizv2r9banv4c",
      description: "A high-capacity powerbank with USB-C fast charging and durable design.",
    },
    {
      id: 12,
      name: "Logitech MX Master 3S",
      category: "Mouse",
      price: 4000,
      quantity: 10,
      image: "https://m.media-amazon.com/images/I/61ni3t1ryQL._AC_SL1500_.jpg",
      description: "Ergonomic wireless mouse with MagSpeed scrolling and customizable buttons.",
    },
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptItems, setReceiptItems] = useState<CartItem[]>([]);

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
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}

      {/* PRODUCT LIST TAB */}
      {activeTab === "list" && (
        <ProductList
          products={products}
          setProducts={setProducts}
          cart={cart}
          setCart={setCart}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          showReceipt={showReceipt}
          setShowReceipt={setShowReceipt}
          receiptItems={receiptItems}
          setReceiptItems={setReceiptItems}
        />
      )}

      {/* ADD NEW PRODUCT TAB */}
      {activeTab === "add" && (
        <AddProduct
          products={products}
          setProducts={setProducts}
        />
      )}
    </div>
  );
}