'use client';
import { useEffect, useState } from 'react';
import Loader from '@/components/common/Loader';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('/api/admin/orders');
                const result = await res.json();
                if (result.success) setOrders(result.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <div className="p-10 text-center"><Loader /></div>;

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Customer Orders</h1>
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="p-4 border-b">Product</th>
                            <th className="p-4 border-b">Customer</th>
                            <th className="p-4 border-b">Phone</th>
                            <th className="p-4 border-b">Price</th>
                            <th className="p-4 border-b">Date</th>
                            <th className="p-4 border-b">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-slate-50">
                                <td className="p-4 border-b font-medium">
                                    {order.productName} <br />
                                    <span className="text-xs text-slate-400">{order.productCode}</span>
                                </td>
                                <td className="p-4 border-b">{order.customerName}</td>
                                <td className="p-4 border-b">{order.customerPhone}</td>
                                <td className="p-4 border-b font-bold text-blue-600">PKR {order.price?.toLocaleString()}</td>
                                <td className="p-4 border-b text-sm text-slate-500">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-4 border-b">
                                    <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700 capitalize">
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}