import React, { useState, useEffect } from "react";
import "./CustomInput.css";

const CustomInput = () => {
  const initialSubcategories = [
    { id: 1, name: "Subcategory 1" },
    { id: 2, name: "Subcategory 2" },
    { id: 3, name: "Subcategory 3" },
  ];

  const initialProducts = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
  ];

  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // State variable for editing mode

  useEffect(() => {
    setSubcategories(initialSubcategories);
  }, []);

  const fetchProducts = async (subcategoryId) => {
    const filteredProducts = initialProducts.filter(
      (product) => product.id % subcategoryId === 0
    );
    setProducts(filteredProducts);
  };

  const handleSubcategoryChange = (e) => {
    const subcategoryId = e.target.value;
    setSelectedSubcategory(subcategoryId);
    fetchProducts(subcategoryId);
  };

  const handleProductChange = (e) => {
    const selectedProductIds = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    setSelectedProducts(selectedProductIds);
  };

  const saveSelection = () => {
    console.log("Saved subcategory:", selectedSubcategory);
    console.log("Saved products:", selectedProducts);

    // Filter products based on selected product IDs
    const selectedProductObjects = initialProducts.filter((product) =>
      selectedProducts.includes(product.id)
    );
    setProducts(selectedProductObjects);
  };

  const editSelection = () => {
    setIsEditing(!isEditing); // Toggle editing mode
  };

  return (
    <div>
      <label htmlFor="subcategorySelect">Select Subcategory:</label>
      <select
        id="subcategorySelect"
        onChange={handleSubcategoryChange}
        value={selectedSubcategory}
      >
        <option value="">Select</option>
        {subcategories.map((subcategory) => (
          <option key={subcategory.id} value={subcategory.id}>
            {subcategory.name}
          </option>
        ))}
      </select>

      <label htmlFor="productSelect">Product:</label>
      <select
        id="productSelect"
        onChange={handleProductChange}
        value={selectedProducts}
      >
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>

      <button onClick={saveSelection}>Save</button>
      <button onClick={editSelection}>
        {isEditing ? "Done Editing" : "Edit"}
      </button>
    </div>
  );
};

export default CustomInput;
