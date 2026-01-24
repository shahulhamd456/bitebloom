'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { useOffers } from '../context/OfferContext';

gsap.registerPlugin(ScrollTrigger);

const OfferSection = () => {
    const sectionRef = useRef(null);
    const { offers } = useOffers();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".offer-card", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);


    const cardStyle = {
        backgroundColor: '#FFFDD0',
        border: '2px solid #DF7E5D',
        borderRadius: '30px',
        padding: '30px',
        marginBottom: '30px',
        textAlign: 'left',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
    };

    return (
        <section className="Offers" ref={sectionRef}>
            <div className="container">
                <div className="herotxt" style={{ margin: "auto", textAlign: "center", maxWidth: "100%" }}>
                    <h1 data-aos="flip-down" data-aos-duration="500">Special Offers</h1>
                    <p className="ppp">Don't miss out on our exclusive daily deals!</p>
                </div>

                {/* Dynamic Offers List */}
                <div className="row justify-content-center gap">
                    {offers.slice(0, 2).map((offer, index) => (
                        <div className="col-md-6" key={offer.id}>
                            <div style={cardStyle} className="offer-card">
                                <img src={offer.img} alt={offer.title} className="offer-card-img offer-card-img-rotate" />
                                <div style={{ position: 'relative', zIndex: 2, maxWidth: '60%' }}>
                                    <h2 className="offer-title">{offer.title}</h2>
                                    <h3 className="ph5">{offer.subtitle}</h3>
                                    <p>{offer.description}</p>
                                </div>
                                <Link href="/offers" style={{ position: 'relative', zIndex: 2 }}>
                                    <button className="button" style={{ marginTop: '20px' }}>Claim Now</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="offer-card" style={{ textAlign: 'center', marginTop: '30px', alignItems: 'center', justifyContent: 'center', minHeight: 'auto', padding: '40px' }}>
                    <Link href="/offers" className="button" style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>View All Offers</Link>
                </div>
            </div>
        </section>
    );
};

export default OfferSection;
