'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import RestaurantCard from '@/components/RestaurantCard';
import Cart from '@/components/Cart';
import OrderTracking from '@/components/OrderTracking';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Load restaurants
    loadRestaurants();

    return () => subscription.unsubscribe();
  }, []);

  const loadRestaurants = async () => {
    const { data, error } = await supabase
      .from('restaurants')
      .select('*, menu_items(*)');
    
    if (data) setRestaurants(data);
  };

  const addToCart = (item, restaurantId) => {
    setCart([...cart, { ...item, restaurantId }]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const placeOrder = async () => {
    if (!user) {
      alert('Please sign in to place an order');
      return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        restaurant_id: cart[0].restaurantId,
        items: cart,
        total_amount: total,
        status: 'pending',
      })
      .select()
      .single();

    if (order) {
      setActiveOrder(order);
      setCart([]);
      alert('Order placed successfully!');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">🚚 QuickDeliver</h1>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <span className="text-sm text-gray-600">{user.email}</span>
                  <button
                    onClick={() => supabase.auth.signOut()}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <a href="/auth" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  Sign In
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {activeOrder && (
          <OrderTracking orderId={activeOrder.id} onClose={() => setActiveOrder(null)} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Available Restaurants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Cart
              items={cart}
              onRemove={removeFromCart}
              onCheckout={placeOrder}
              user={user}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
