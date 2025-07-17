import { useState } from "react";

const predefinedCategories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home Appliances",
  "Toys",
  "Beauty",
];

const AddProductModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantitySold: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...formData,
      price: Number(formData.price),
      quantitySold: Number(formData.quantitySold),
    };
    onAdd(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              autoFocus
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1">Category</label>
            <select
              name="category"
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {predefinedCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Price</label>
            <input
              type="number"
              name="price"
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1">Quantity Sold</label>
            <input
              type="number"
              name="quantitySold"
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={formData.quantitySold}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
