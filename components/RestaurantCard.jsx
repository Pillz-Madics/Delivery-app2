'use client';

import { useState } from 'react';

export default function RestaurantCard({ restaurant, onAddToCart }) {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-32 flex items-center justify-center">
        <span className="text-5xl">{restaurant.icon || '🍔'}</span>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{restaurant.name}</h3>
        <p className="text-gray-600 text-sm mb-1">{restaurant.cuisine_type}</p>
        <p className="text-gray-500 text-sm mb-4">⏱️ {restaurant.delivery_time} mins • 📍 {restaurant.distance}</p>
        
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700">Menu Items:</h4>
          {restaurant.menu_items?.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-green-600">${item.price}</span>
                <button
                  onClick={() => onAddToCart(item, restaurant.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
