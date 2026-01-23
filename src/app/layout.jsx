
import '../css/global.css';
import '../css/about.css';
import '../css/cart.css';
import '../css/custom-orders.css';
import '../css/footer.css';
import '../css/gallery-detail.css';
import '../css/gallery.css';
import '../css/header.css';
import '../css/hero.css';
import '../css/map.css';
import '../css/offers.css';
import '../css/product-detail.css';
import '../css/products.css';
import '../css/shop.css';
import '../css/slick-theme.css';
import '../css/slick.css';
import '../css/testimonials.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';

import { ProductProvider } from '../context/ProductContext';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import { OfferProvider } from '../context/OfferContext';
import ClientLayout from '../components/ClientLayout';

export const metadata = {
    title: 'Bite Bloom',
    description: 'Delicious bakery and treats',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning={true}>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Cookie&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            </head>
            <body className="antialiased">
                <AuthProvider>
                    <ProductProvider>
                        <CartProvider>
                            <OfferProvider>
                                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                                    <ClientLayout>
                                        {children}
                                    </ClientLayout>
                                </div>
                            </OfferProvider>
                        </CartProvider>
                    </ProductProvider>
                </AuthProvider>
            </body>
        </html>
    )
}
