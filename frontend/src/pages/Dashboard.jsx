import React, { useState, useEffect } from 'react';
import { Edit, Save, X, Plus, Package, TrendingUp, DollarSign, ShoppingCart } from 'lucide-react';

const ProductDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    // API Functions
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URI}/api/fetch-all-product`);
            const data = await response.json();
            setProducts(data.products);
        } catch (err) {
            setError('Failed to fetch products');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateProductAPI = async (id, productData) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URI}/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Error updating product:', err);
            throw err;
        }
    };

    const deleteProductAPI = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URI}/api/products/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Error deleting product:', err);
            throw err;
        }
    };

    // Load products on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    // Calculate dashboard stats
    const totalProducts = products.length;
    const totalRevenue = products.reduce((sum, product) => sum + (product.price * product.quantitySold), 0);
    const totalSold = products.reduce((sum, product) => sum + product.quantitySold, 0);
    const avgPrice = products.length > 0 ? products.reduce((sum, product) => sum + product.price, 0) / products.length : 0;

    const startEdit = (product) => {
        setEditingId(product._id);
        setEditForm({
            name: product.name,
            category: product.category,
            price: product.price,
            quantitySold: product.quantitySold
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    const saveEdit = async () => {
        try {
            const data = await updateProductAPI(editingId, {
                ...editForm,
                price: Number(editForm.price),
                quantitySold: Number(editForm.quantitySold)
            });

            if (data.success) {
                setProducts(products.map(product =>
                    product._id === editingId ? data.data : product
                ));
                setEditingId(null);
                setEditForm({});
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to update product');
        }
    };

    const deleteProduct = async (id) => {
        try {
            const data = await deleteProductAPI(id);

            if (data.success) {
                setProducts(products.filter(product => product._id !== id));
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to delete product');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Dashboard</h1>
                    <p className="text-gray-600">Manage your product inventory and sales data</p>
                    {error && (
                        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Products</p>
                                        <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
                                    </div>
                                    <Package className="h-12 w-12 text-blue-600" />
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                                        <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
                                    </div>
                                    <DollarSign className="h-12 w-12 text-green-600" />
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Items Sold</p>
                                        <p className="text-2xl font-bold text-gray-900">{totalSold.toLocaleString()}</p>
                                    </div>
                                    <ShoppingCart className="h-12 w-12 text-purple-600" />
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Avg Price</p>
                                        <p className="text-2xl font-bold text-gray-900">${avgPrice.toFixed(2)}</p>
                                    </div>
                                    <TrendingUp className="h-12 w-12 text-orange-600" />
                                </div>
                            </div>
                        </div>

                        {/* Products Table */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900">Products</h2>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sold</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {products.map((product) => (
                                            <tr key={product._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {editingId === product._id ? (
                                                        <input
                                                            type="text"
                                                            value={editForm.name}
                                                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                            className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                                                        />
                                                    ) : (
                                                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {editingId === product._id ? (
                                                        <input
                                                            type="text"
                                                            value={editForm.category}
                                                            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                                            className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                                                        />
                                                    ) : (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                            {product.category}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {editingId === product._id ? (
                                                        <input
                                                            type="number"
                                                            value={editForm.price}
                                                            onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                                                            className="border border-gray-300 rounded px-2 py-1 text-sm w-20"
                                                        />
                                                    ) : (
                                                        <div className="text-sm text-gray-900">${product.price}</div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {editingId === product._id ? (
                                                        <input
                                                            type="number"
                                                            value={editForm.quantitySold}
                                                            onChange={(e) => setEditForm({ ...editForm, quantitySold: e.target.value })}
                                                            className="border border-gray-300 rounded px-2 py-1 text-sm w-20"
                                                        />
                                                    ) : (
                                                        <div className="text-sm text-gray-900">{product.quantitySold}</div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">${(product.price * product.quantitySold).toLocaleString()}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(product.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    {editingId === product._id ? (
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={saveEdit}
                                                                className="text-green-600 hover:text-green-900"
                                                            >
                                                                <Save className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={cancelEdit}
                                                                className="text-gray-600 hover:text-gray-900"
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => startEdit(product)}
                                                                className="text-blue-600 hover:text-blue-900"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => deleteProduct(product._id)}
                                                                className="text-red-600 hover:text-red-900"
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductDashboard;