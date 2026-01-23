import React from 'react';
import Link from 'next/link';
import '../css/footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-lg-3">
                        <div className="ficon">
                            <div className="icupic" data-aos="zoom-out-down"><img src="/asset/logo.svg" alt="" />BiteBloom</div>
                        </div>
                        <p className="para">Bringing you the finest artisanal
                            breads and pastries since 1995.</p>
                        <div className="ficons">
                            <div className="face">
                                <a href="https://www.facebook.com/"><img src="/asset/face.png" alt="" /></a>
                            </div>
                            <div className="face">
                                <a href="https://www.instagram.com/"><img src="/asset/face2.png" alt="" /></a>
                            </div>
                            <div className="face">
                                <a href="https://x.com/"><img src="/asset/face3.png" alt="" /></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="bakery">
                            <h4> About Bakery</h4>
                            <ul>
                                <li><Link href="/">Home</Link></li>
                                <li><Link href="/offers">Offers</Link></li>
                                <li><Link href="/products">Product</Link></li>
                                <li><Link href="/about">About Us</Link></li>

                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="bakery">
                            <h4> Customer Service</h4>
                            <ul>
                                <li><Link href="/terms">Term & Condition</Link></li>
                                <li><Link href="/contact">Contact us</Link></li>
                            </ul>

                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="bakery">
                            <h4>Subscription</h4>
                            <p>Subscription for special offers
                                and updates</p>
                            <div className="sub">
                                <div className="emailsubscribe">
                                    <input type="Email" placeholder="Email" />
                                    <input type="submit" value="Subscribe" />
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <div className="copy">
                    © 2016 - 2025 www.BiteBloom.com-All rights resrved
                </div>
            </div>
        </footer>
    );
};

export default Footer;
