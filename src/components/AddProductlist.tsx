import React from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

interface ProductListProps {
  filteredProducts: Product[];
  addToCart: (p: Product) => void;
  removeProduct: (id: number) => void;
  toggleDetails: (id: number) => void;
  expandedId: number | null;
}

export default function ProductList({
  filteredProducts,
  addToCart,
  removeProduct,
  toggleDetails,
  expandedId,
}: ProductListProps) {
  return (
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
  );
}
