'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import '../css/about.css';

const AboutSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".about-img", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                rotateY: 90,
                opacity: 0,
                duration: 1.5,
                ease: "power2.out"
            });
            gsap.from(".about-text", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section className="About" ref={sectionRef}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="abotimg about-img">
                            <img src="/asset/about.png" alt="" data-aos="flip-left"
                                data-aos-easing="ease-out-cubic"
                                data-aos-duration="2000" />
                        </div>

                    </div>
                    <div className="col-md-6">
                        <div className="abouttxt about-text">
                            <h1 data-aos="flip-down" data-aos-duration="500"> About BiteBloom Backery</h1>
                            <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos.
                                Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat
                                amet
                                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et
                                eos.
                                Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat
                                amet
                            </p>
                            <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos.
                                Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat
                                amet
                                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et
                                eos.
                                Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat
                                amet</p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
