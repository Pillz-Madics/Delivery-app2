import './globals.css'

export const metadata = {
  title: 'QuickDeliver - Food Delivery App',
  description: 'Order food from your favorite restaurants',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
