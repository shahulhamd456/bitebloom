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
        <section className="hero" ref={containerRef}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6" style={{ paddingRight: '40px' }}>
                        <div className="herotxt" ref={textRef}>
                            <h1 className="hero-title">
                                Baked with love, <br /> 100% organic
                            </h1>
                            <p className="hero-text">
                                Enjoy the finest bread & pastries with exclusive discounts.
                                Straight from the oven to your table, bringing warmth and
                                deliciousness in every bite!
                            </p>
                            <Link href="/products" style={{ textDecoration: 'none' }}>
                                <button className="hero-btn">
                                    View Menu
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="heropic hero-image-box" ref={imageRef}>
                            <img
                                src={heroImage.src}
                                alt="Baked with Love"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
