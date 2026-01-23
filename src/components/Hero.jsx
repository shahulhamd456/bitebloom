'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);
import '../css/hero.css';
import heroImage from '../assets/hero1.jpg';

const Hero = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text animations
            gsap.from(textRef.current.children, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
            });

            // Image animation
            gsap.from(imageRef.current, {
                scale: 0.8,
                // opacity: 0, 
                duration: 1,
                ease: 'power3.out',
                delay: 0.5,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero" ref={containerRef} style={{ padding: '80px 0', backgroundColor: '#FFFDD0' }}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6" style={{ paddingRight: '40px' }}>
                        <div className="herotxt" ref={textRef}>
                            <h1 style={{
                                fontFamily: '"Cookie", cursive',
                                fontSize: '80px',
                                color: '#DF7E5D',
                                lineHeight: '1.1',
                                marginBottom: '20px'
                            }}>
                                Baked with love, <br /> 100% organic
                            </h1>
                            <p style={{
                                fontSize: '18px',
                                color: '#5A5A5A',
                                lineHeight: '1.6',
                                marginBottom: '30px',
                                marginTop: '0'
                            }}>
                                Enjoy the finest bread & pastries with exclusive discounts.
                                Straight from the oven to your table, bringing warmth and
                                deliciousness in every bite!
                            </p>
                            <Link href="/products" style={{ textDecoration: 'none' }}>
                                <button style={{
                                    backgroundColor: '#DF7E5D',
                                    color: 'white',
                                    border: 'none',
                                    padding: '15px 40px',
                                    borderRadius: '50px',
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 15px rgba(223, 126, 93, 0.3)',
                                    transition: 'transform 0.2s',
                                    display: 'inline-block'
                                }}>
                                    View Menu
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="heropic" ref={imageRef} style={{
                            position: 'relative',
                            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                            border: '5px solid white',
                            minHeight: '400px',
                            transition: 'all 0.5s ease'
                        }}>
                            <img
                                src={heroImage.src}
                                alt="Baked with Love"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', top: 0, left: 0 }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
