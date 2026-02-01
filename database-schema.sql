-- ================================================
-- QUICKDELIVER DATABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- ================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================
-- RESTAURANTS TABLE
-- ================================================
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  cuisine_type TEXT NOT NULL,
  delivery_time TEXT DEFAULT '30-40',
  distance TEXT DEFAULT '2.5 km',
  icon TEXT DEFAULT '🍔',
  rating DECIMAL(2,1) DEFAULT 4.5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- MENU ITEMS TABLE
-- ================================================
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT,
  available BOOLEAN DEFAULT true,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- ORDERS TABLE
-- ================================================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  restaurant_id UUID REFERENCES restaurants(id),
  items JSONB NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled')),
  delivery_address TEXT,
  driver_name TEXT,
  driver_phone TEXT,
  estimated_delivery TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- DRIVERS TABLE (Optional - for driver management)
-- ================================================
CREATE TABLE drivers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  vehicle_type TEXT,
  license_plate TEXT,
  is_active BOOLEAN DEFAULT true,
  current_location POINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- INDEXES FOR PERFORMANCE
-- ================================================
CREATE INDEX idx_menu_items_restaurant ON menu_items(restaurant_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

-- ================================================
-- ROW LEVEL SECURITY (RLS)
-- ================================================

-- Enable RLS
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;

-- Restaurants - public read access
CREATE POLICY "Restaurants are viewable by everyone" ON restaurants
  FOR SELECT USING (true);

-- Menu Items - public read access
CREATE POLICY "Menu items are viewable by everyone" ON menu_items
  FOR SELECT USING (true);

-- Orders - users can view their own orders
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Orders - users can create their own orders
CREATE POLICY "Users can create their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Orders - users can update their own orders
CREATE POLICY "Users can update their own orders" ON orders
  FOR UPDATE USING (auth.uid() = user_id);

-- ================================================
-- SAMPLE DATA
-- ================================================

-- Insert sample restaurants
INSERT INTO restaurants (name, cuisine_type, delivery_time, distance, icon, rating) VALUES
  ('Pizza Palace', 'Italian', '25-35', '1.8 km', '🍕', 4.7),
  ('Burger Heaven', 'American', '20-30', '2.2 km', '🍔', 4.5),
  ('Sushi Star', 'Japanese', '30-40', '3.1 km', '🍣', 4.8),
  ('Taco Fiesta', 'Mexican', '15-25', '1.5 km', '🌮', 4.6);

-- Get restaurant IDs for menu items
DO $$
DECLARE
  pizza_id UUID;
  burger_id UUID;
  sushi_id UUID;
  taco_id UUID;
BEGIN
  SELECT id INTO pizza_id FROM restaurants WHERE name = 'Pizza Palace';
  SELECT id INTO burger_id FROM restaurants WHERE name = 'Burger Heaven';
  SELECT id INTO sushi_id FROM restaurants WHERE name = 'Sushi Star';
  SELECT id INTO taco_id FROM restaurants WHERE name = 'Taco Fiesta';

  -- Pizza Palace Menu
  INSERT INTO menu_items (restaurant_id, name, description, price, category) VALUES
    (pizza_id, 'Margherita Pizza', 'Classic tomato, mozzarella, and basil', 12.99, 'Pizza'),
    (pizza_id, 'Pepperoni Pizza', 'Loaded with pepperoni slices', 14.99, 'Pizza'),
    (pizza_id, 'Garlic Bread', 'Freshly baked with garlic butter', 5.99, 'Sides');

  -- Burger Heaven Menu
  INSERT INTO menu_items (restaurant_id, name, description, price, category) VALUES
    (burger_id, 'Classic Cheeseburger', 'Beef patty with cheese, lettuce, tomato', 9.99, 'Burgers'),
    (burger_id, 'Double Bacon Burger', 'Two patties with crispy bacon', 13.99, 'Burgers'),
    (burger_id, 'French Fries', 'Crispy golden fries', 3.99, 'Sides');

  -- Sushi Star Menu
  INSERT INTO menu_items (restaurant_id, name, description, price, category) VALUES
    (sushi_id, 'California Roll', '8 pieces of fresh California roll', 11.99, 'Rolls'),
    (sushi_id, 'Salmon Nigiri', '6 pieces of fresh salmon nigiri', 14.99, 'Nigiri'),
    (sushi_id, 'Miso Soup', 'Traditional Japanese soup', 4.99, 'Sides');

  -- Taco Fiesta Menu
  INSERT INTO menu_items (restaurant_id, name, description, price, category) VALUES
    (taco_id, 'Chicken Tacos', '3 soft tacos with grilled chicken', 8.99, 'Tacos'),
    (taco_id, 'Beef Burrito', 'Large burrito with seasoned beef', 10.99, 'Burritos'),
    (taco_id, 'Guacamole & Chips', 'Fresh guacamole with tortilla chips', 6.99, 'Sides');
END $$;

-- ================================================
-- REALTIME SUBSCRIPTIONS
-- ================================================
-- Enable realtime for orders table
ALTER PUBLICATION supabase_realtime ADD TABLE orders;

-- ================================================
-- FUNCTIONS & TRIGGERS
-- ================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- COMPLETE! 
-- Your database is ready to use
-- ================================================
