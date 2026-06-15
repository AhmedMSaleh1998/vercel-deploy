"use client"
import React, { useEffect, useState } from 'react'
import { getUserOrders } from "./order" // Ensure path is correct

export default function AllOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchAllOrders() {
        try {
            setLoading(true);
            const res = await getUserOrders();
            // The API usually returns the array directly or in a 'data' property
            setOrders(res || []);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllOrders();
    }, []);

    if (loading) return <div className="text-center py-10">Loading your orders...</div>;
    if (orders.length === 0) return <div className="text-center py-10">No orders found.</div>;

    return (
        <div className="container mx-auto py-10 px-4 max-w-5xl">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">My Orders</h1>

            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order._id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

                        {/* Top Header */}
                        <div className="p-5 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-6 justify-between items-center">
                            <div>
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Order ID</p>
                                <div className="font-bold text-slate-900">#{order.id}</div>
                            </div>

                            <div>
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Placed On</p>
                                <div className="font-medium text-slate-900">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1 sm:text-right">Status</p>
                                <div className="flex gap-2">
                                    <span className="px-3 py-1 text-xs font-bold rounded bg-yellow-100 text-yellow-800">
                                        {order.isPaid ? 'Paid' : 'Unpaid'}
                                    </span>
                                    <span className="px-3 py-1 text-xs font-bold rounded bg-blue-100 text-blue-800">
                                        {order.isDelivered ? 'Delivered' : 'Processing'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Product Items List */}
                        <div className="p-6 border-b border-slate-100">
                            <h3 className="font-bold text-slate-900 mb-4">Items</h3>
                            <div className="space-y-4">
                                {order.cartItems.map((item: any) => (
                                    <div key={item._id} className="flex gap-4 items-center">
                                        <div className="h-20 w-20 flex-shrink-0 bg-white rounded-md border border-slate-200 p-2">
                                            <img src={item.product.imageCover} alt={item.product.title} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-slate-900">{item.product.title}</h4>
                                            <p className="text-sm text-slate-500">Qty: {item.count}</p>
                                        </div>
                                        <div className="font-bold text-slate-900">{item.price} EGP</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="p-6 bg-slate-50 text-right font-bold text-lg">
                            Total: {order.totalOrderPrice} EGP
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}