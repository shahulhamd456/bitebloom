'use client';

import Link from 'next/link';
import { useOffers } from '../../context/OfferContext';

const Offers = () => {
    const { offers } = useOffers();

    return (
        <main className="page-container">
            <div className="container">
                {/* Header */}
                <div className="section-header">
                    <h1 className="section-title">Special Offers</h1>
                    <p className="ppp">Grab these exclusive deals before they are gone! Fresh from the oven to your table.</p>
                </div>

                {/* Main Deals - Text Focus */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '40px',
                    marginBottom: '60px'
                }}>
                    {offers.map((offer) => (
                        <div key={offer.id} style={{
                            flex: '0 0 auto',
                            width: 'calc(50% - 20px)', /* 2 cards per row with gap */
                            minWidth: '300px'
                        }}>
                            <div className="offer-card" style={{ height: '100%' }}>
                                <img src={offer.img} alt={offer.title} className="offer-card-img offer-card-img-rotate" />
                                <div style={{ position: 'relative', zIndex: 2 }}>
                                    <h2 className="offer-title">{offer.title}</h2>
                                    <h3 className="ph5 offer-subtitle">{offer.subtitle}</h3>
                                    <p style={{ color: 'rgba(0,0,0,0.6)' }}>{offer.description}</p>
                                </div>
                                <button className="button" style={{ marginTop: '20px', alignSelf: 'flex-start', position: 'relative', zIndex: 2 }}>Claim Now</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bundle Deals - Image Focus */}
                <div style={{ marginBottom: '80px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h1 style={{ fontSize: '40px' }}>Weekly Bundles</h1>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="bundle-card">
                                <Link href="/products/5">
                                    <img src="/asset/p2.jpg" alt="Breakfast Bundle" className="bundle-img" />
                                </Link>
                                <h4 className="ph5">
                                    <Link href="/products/5" style={{ color: 'inherit', textDecoration: 'none' }}>Breakfast Bundle</Link>
                                </h4>
                                <p>2 Sourdough Loaves + Coffee</p>
                                <h3 className="bundle-price">$15.00</h3>
                                <Link href="/products/5">
                                    <button className="button" style={{ marginTop: '10px' }}>Order Now</button>
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="bundle-card">
                                <Link href="/products/6">
                                    <img src="/asset/cookies.png" alt="Party Pack" className="bundle-img" />
                                </Link>
                                <h4 className="ph5">
                                    <Link href="/products/6" style={{ color: 'inherit', textDecoration: 'none' }}>Party Pack</Link>
                                </h4>
                                <p>12 Cookies + 6 Cupcakes</p>
                                <h3 className="bundle-price">$25.00</h3>
                                <Link href="/products/6">
                                    <button className="button" style={{ marginTop: '10px' }}>Order Now</button>
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="bundle-card">
                                <Link href="/products/7">
                                    <img src="/asset/p4.jpg" alt="Gluten Free" className="bundle-img" />
                                </Link>
                                <h4 className="ph5">
                                    <Link href="/products/7" style={{ color: 'inherit', textDecoration: 'none' }}>GF Starter</Link>
                                </h4>
                                <p>Assorted Gluten Free Pastries</p>
                                <h3 className="bundle-price">$18.00</h3>
                                <Link href="/products/7">
                                    <button className="button" style={{ marginTop: '10px' }}>Order Now</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Membership Section */}
                <div className="membership-section">
                    <div className="row align-items-center">
                        <div className="col-md-5">
                            <img src="/asset/about.png" alt="Membership" style={{ width: '100%', borderRadius: '20px' }} />
                        </div>
                        <div className="col-md-7">
                            <div className="membership-text">
                                <h2 className="we" style={{ color: '#FFFDD0', fontSize: '45px' }}>Join the Bloom Club</h2>
                                <p style={{ color: '#white', margin: '20px 0', fontSize: '18px', lineHeight: '1.6' }}>
                                    Become a member and get exclusive perks!
                                    <br />
                                    • <strong>10% OFF</strong> every order
                                    <br />
                                    • Free delivery on orders over $30
                                    <br />
                                    • Early access to new menu items
                                </p>
                                <button className="membership-btn">
                                    Sign Up Free
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
};

export default Offers;
