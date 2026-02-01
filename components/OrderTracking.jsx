'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const statusSteps = [
  { key: 'pending', label: 'Order Received', icon: '📝' },
  { key: 'confirmed', label: 'Confirmed', icon: '✅' },
  { key: 'preparing', label: 'Preparing', icon: '👨‍🍳' },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: '🚚' },
  { key: 'delivered', label: 'Delivered', icon: '🎉' },
];

export default function OrderTracking({ orderId, onClose }) {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Load initial order
    loadOrder();

    // Subscribe to real-time updates
    const channel = supabase
      .channel(`order-${orderId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          setOrder(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [orderId]);

  const loadOrder = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();
    
    if (data) setOrder(data);
  };

  if (!order) return null;

  const currentStepIndex = statusSteps.findIndex(step => step.key === order.status);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Order Tracking</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">Order ID: <span className="font-mono">{order.id}</span></p>
          <p className="text-gray-600">Total: <span className="font-bold text-green-600">${order.total_amount}</span></p>
        </div>

        <div className="space-y-4">
          {statusSteps.map((step, index) => {
            const isActive = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div key={step.key} className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                    isActive
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                  } ${isCurrent ? 'ring-4 ring-green-200' : ''}`}
                >
                  {step.icon}
                </div>
                <div className="flex-1">
                  <p
                    className={`font-semibold ${
                      isActive ? 'text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </p>
                  {isCurrent && (
                    <p className="text-sm text-green-600">In Progress...</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {order.driver_name && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="font-semibold text-gray-900">Your Driver</p>
            <p className="text-gray-700">{order.driver_name}</p>
            <p className="text-sm text-gray-600">ETA: {order.estimated_delivery || '20-30 mins'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
