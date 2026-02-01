# 🚚 QuickDeliver - Food Delivery App

A full-stack food delivery application built with Next.js and Supabase. Order food from restaurants, track deliveries in real-time, and manage everything with a beautiful, responsive interface.

## ✨ Features

- 🔐 **User Authentication** - Sign up/sign in with email
- 🍕 **Restaurant Listings** - Browse available restaurants and menus
- 🛒 **Shopping Cart** - Add items and manage your order
- 💳 **Order Placement** - Place orders with automatic total calculation
- 📍 **Real-time Order Tracking** - Track your order status live
- 📱 **Responsive Design** - Works on desktop and mobile
- ⚡ **Real-time Updates** - Orders update automatically using Supabase Realtime

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works!)

### 2. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new organization and project
4. Wait for your project to be ready

### 3. Set Up the Database

1. In your Supabase project, go to the **SQL Editor**
2. Copy the entire contents of `database-schema.sql`
3. Paste it into the SQL editor and click **Run**
4. You should see "Success. No rows returned" - this means your database is ready!

### 4. Get Your Supabase Credentials

1. In your Supabase project, go to **Settings** → **API**
2. Copy your **Project URL**
3. Copy your **anon/public key** (under Project API keys)

### 5. Set Up the Project

```bash
# Clone or download this project
cd delivery-app

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Edit .env.local and add your Supabase credentials:
# NEXT_PUBLIC_SUPABASE_URL=your_project_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## 📁 Project Structure

```
delivery-app/
├── app/
│   ├── page.jsx              # Main homepage
│   ├── auth/
│   │   └── page.jsx          # Authentication page
│   ├── layout.jsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── RestaurantCard.jsx    # Restaurant display component
│   ├── Cart.jsx              # Shopping cart component
│   └── OrderTracking.jsx     # Real-time order tracking
├── lib/
│   └── supabase.js           # Supabase client configuration
├── database-schema.sql       # Complete database setup
└── package.json
```

## 🎯 How to Use

### For Customers

1. **Browse Restaurants**: View available restaurants on the homepage
2. **Add to Cart**: Click "Add" on menu items you want to order
3. **Sign In**: Click "Sign In" and create an account (or log in)
4. **Place Order**: Click "Place Order" in your cart
5. **Track Order**: Watch your order progress in real-time!

### Testing the App

1. Create an account using any email (use a temporary email if testing)
2. Add some items to your cart
3. Place an order
4. Open Supabase → Table Editor → Orders
5. Click on your order and change the `status` field to test tracking:
   - `pending` → `confirmed` → `preparing` → `out_for_delivery` → `delivered`
6. Watch the order tracker update in real-time!

## 🗄️ Database Tables

### **restaurants**
Stores restaurant information (name, cuisine type, delivery time, etc.)

### **menu_items**
Stores menu items for each restaurant

### **orders**
Stores customer orders with real-time status updates

### **drivers** (optional)
For future driver management features

## 🌐 Deploy to Production

### Deploy to Vercel (Free)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy!

Your app will be live at `https://your-app.vercel.app`

## 🔐 Security Notes

- Row Level Security (RLS) is enabled on all tables
- Users can only view and create their own orders
- Restaurants and menu items are publicly readable
- Never commit your `.env.local` file to Git

## 🎨 Customization Ideas

- Add restaurant images
- Implement user profiles
- Add payment integration (Stripe)
- Add restaurant ratings and reviews
- Implement search and filters
- Add delivery address management
- Create a driver/admin dashboard
- Add push notifications
- Implement promotions and discounts

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Supabase (PostgreSQL database)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime
- **Hosting**: Vercel (recommended)

## 📝 Sample Data

The database schema includes sample data for:
- 4 restaurants (Pizza Palace, Burger Heaven, Sushi Star, Taco Fiesta)
- 3 menu items per restaurant
- Ready to test immediately!

## 🐛 Troubleshooting

**"Failed to fetch"**: Check your Supabase credentials in `.env.local`

**Database errors**: Make sure you ran the complete SQL schema

**Authentication not working**: Verify Supabase Auth is enabled in your project settings

**Real-time not updating**: Check that realtime is enabled for the orders table

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

Feel free to fork this project and add your own features!

## 📄 License

MIT License - feel free to use this for personal or commercial projects.

---

**Built with ❤️ using Next.js and Supabase**
