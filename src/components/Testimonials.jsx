'use client';

import React, { useRef } from 'react';
import Slider from 'react-slick';
import '../css/testimonials.css';

const Testimonials = () => {
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0px',
        arrows: false, // We will use custom external arrows
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    const reviews = [
        { name: 'Tom Hardly', job: 'Doctor', img: '/asset/r1.png', text: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.' },
        { name: 'Andrew', job: 'Engineer', img: '/asset/r2.png', text: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.' },
        { name: 'Cristy', job: 'Swimmer', img: '/asset/r3.png', text: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.' },
        { name: 'Tom Hardly', job: 'Doctor', img: '/asset/r1.png', text: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.' },
        { name: 'Andrew', job: 'Engineer', img: '/asset/r2.png', text: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.' },
    ];

    const next = () => {
        sliderRef.current.slickNext();
    };

    const previous = () => {
        sliderRef.current.slickPrev();
    };

    return (
        <section className="Products">
            <div className="container">
                <h1 data-aos="flip-down" data-aos-duration="500" style={{ textAlign: 'center' }}>Client's Review</h1>
                <p className="ppp">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>

                <div className="slider" data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
                    <Slider ref={sliderRef} {...settings}>
                        {reviews.map((review, index) => (
                            <div key={index}>
                                <div className="item">
                                    <div className="itemtxt">
                                        <div className="clcon">
                                            <div className="clpic"><img src={review.img} alt="" /></div>
                                            <div className="cltxt">
                                                <h4 className="ph6">{review.name}</h4>
                                                <p>{review.job}</p>
                                            </div>
                                        </div>
                                        <p>{review.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                <div className="arrow">
                    <span className="previos-arrow" onClick={previous} style={{ cursor: 'pointer' }}>
                        <svg width="19" height="36" viewBox="0 0 19 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.566 1.00188L1.01997 16.9499C0.746928 17.23 0.594116 17.6057 0.594116 17.9969C0.594116 18.3881 0.746928 18.7638 1.01997 19.0439L16.566 34.9979C16.6932 35.1285 16.8452 35.2323 17.0132 35.3032C17.1812 35.3741 17.3616 35.4107 17.544 35.4107C17.7263 35.4107 17.9068 35.3741 18.0747 35.3032C18.2427 35.2323 18.3948 35.1285 18.522 34.9979C18.7837 34.73 18.9302 34.3704 18.9302 33.9959C18.9302 33.6214 18.7837 33.2618 18.522 32.9939L3.90297 17.9969L18.522 3.00288C18.7828 2.73514 18.9287 2.37615 18.9287 2.00238C18.9287 1.62862 18.7828 1.26963 18.522 1.00188C18.3948 0.871252 18.2427 0.767425 18.0747 0.696531C17.9068 0.625636 17.7263 0.589111 17.544 0.589111C17.3616 0.589111 17.1812 0.625636 17.0132 0.696531C16.8452 0.767425 16.6932 0.871252 16.566 1.00188Z" fill="#FFFDD0" />
                        </svg>
                    </span>
                    <span className="next-arrow" onClick={next} style={{ cursor: 'pointer' }}>
                        <svg width="19" height="36" viewBox="0 0 19 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.43391 1.00188L17.9799 16.9499C18.253 17.23 18.4058 17.6057 18.4058 17.9969C18.4058 18.3881 18.253 18.7638 17.9799 19.0439L2.43391 34.9979C2.30672 35.1285 2.15465 35.2323 1.98668 35.3032C1.8187 35.3741 1.63823 35.4107 1.45591 35.4107C1.27359 35.4107 1.09311 35.3741 0.925138 35.3032C0.757166 35.2323 0.605099 35.1285 0.477909 34.9979C0.216221 34.73 0.0697136 34.3704 0.0697136 33.9959C0.0697136 33.6214 0.216221 33.2618 0.477909 32.9939L15.0969 17.9969L0.477909 3.00288C0.217117 2.73514 0.0711784 2.37615 0.0711784 2.00238C0.0711784 1.62862 0.217117 1.26963 0.477909 1.00188C0.605099 0.871252 0.757166 0.767425 0.925138 0.696531C1.09311 0.625636 1.27359 0.589111 1.45591 0.589111C1.63823 0.589111 1.8187 0.625636 1.98668 0.696531C2.15465 0.767425 2.30672 0.871252 2.43391 1.00188Z" fill="#FFFDD0" />
                        </svg>
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
