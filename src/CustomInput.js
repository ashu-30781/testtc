import React, { useState, useEffect } from "react";
import "./CustomInput.css";

const CustomInput = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const fetchSubcategories = async () => {
    try {
      const response = await fetch(
        "https://apis-test.conqt.com/api/v2/SubCategory-GetList-ForDropDown"
      );
      const data = await response.json();
      setSubcategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const fetchProducts = async (subcategoryId) => {
    try {
      const url = `https://apis-test.conqt.com/api/v2/Product-Customer-GetList-ForDropDown-BySubCategory?subcategories=[${subcategoryId}]`;
      const response = await fetch(url);
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
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
    // Add your logic to save the selection here
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
        {Array.isArray(subcategories) &&
          subcategories.map((subcategory) => (
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
        multiple
      >
        {Array.isArray(products) &&
          products.map((product) => (
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
