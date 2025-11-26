import { useState } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

interface AddProductProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export default function AddProduct({ products, setProducts }: AddProductProps) {
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

  return (
    <div className="form-section">
      <h3>Add New Product</h3>
      <div className="form-grid">
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <select
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
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
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <button className="add-product-btn" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>
    </div>
  );
}