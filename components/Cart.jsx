'use client';

export default function Cart({ items, onRemove, onCheckout, user }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const deliveryFee = items.length > 0 ? 3.99 : 0;
  const grandTotal = total + deliveryFee;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      
      {items.length === 0 ? (
        <div className="text-center py-8">
          <span className="text-6xl">🛒</span>
          <p className="text-gray-500 mt-4">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-green-600">${item.price}</p>
                </div>
                <button
                  onClick={() => onRemove(index)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Delivery Fee:</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 border-t pt-2">
              <span>Total:</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={onCheckout}
            disabled={!user}
            className={`w-full mt-6 py-3 rounded-lg font-semibold text-white ${
              user 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {user ? 'Place Order' : 'Sign in to Order'}
          </button>
        </>
      )}
    </div>
  );
}
