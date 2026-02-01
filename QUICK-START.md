# ⚡ QUICK SETUP GUIDE - 5 Minutes to Launch!

Follow these steps to get your delivery app running:

## Step 1: Set Up Supabase (2 minutes)

1. Go to https://supabase.com and sign up
2. Click **"New Project"**
3. Fill in:
   - Project name: `delivery-app`
   - Database password: (create a strong password)
   - Region: (choose closest to you)
4. Click **"Create new project"** and wait ~2 minutes

## Step 2: Create Database (1 minute)

1. In your Supabase project, click **"SQL Editor"** in the left sidebar
2. Click **"New Query"**
3. Open the `database-schema.sql` file from this project
4. Copy ALL the contents and paste into the SQL editor
5. Click **"Run"** button
6. You should see "Success. No rows returned" ✅

## Step 3: Get Your API Keys (30 seconds)

1. Click **"Settings"** (gear icon) in the left sidebar
2. Click **"API"**
3. Copy these two values:
   - **Project URL** (starts with https://)
   - **anon public key** (long string of characters)

## Step 4: Configure Your App (1 minute)

1. In the project folder, create a file named `.env.local`
2. Add these lines (paste your actual values):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...your-long-key-here
```

3. Save the file

## Step 5: Install and Run (1 minute)

Open terminal in the project folder and run:

```bash
npm install
npm run dev
```

Wait for it to start, then open: http://localhost:3000

## 🎉 You're Done!

### Test It Out:

1. Click **"Sign In"** → **"Sign Up"**
2. Create an account with any email
3. Browse restaurants and add items to cart
4. Click **"Place Order"**
5. Watch your order track in real-time!

### To Test Real-time Tracking:

1. Place an order
2. Go to Supabase → **Table Editor** → **orders**
3. Click on your order row
4. Change `status` from `pending` to `confirmed`, then `preparing`, etc.
5. Watch the tracker update live! ✨

---

## 🌍 Deploy to Internet (Bonus - 3 minutes)

1. Create a GitHub account if you don't have one
2. Create a new repository
3. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```
4. Go to https://vercel.com
5. Sign in with GitHub
6. Click **"Import Project"**
7. Select your repository
8. Add the same environment variables from `.env.local`
9. Click **"Deploy"**

Your app will be live at: `https://your-app.vercel.app` 🚀

---

## 💡 Quick Tips

- **Forgot your Supabase password?** Reset it in Supabase Settings → Database
- **App not working?** Check `.env.local` has correct values with no extra spaces
- **Need help?** Check the full README.md file

Happy building! 🎈
