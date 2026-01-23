import React from 'react';
import '../css/map.css';

const MapSection = () => {
    return (
        <section className="map">
            <div className="container">
                <div className="purple map-card">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="purptxt">
                                <h2 className="we">We are happy to see</h2>
                                <div className="order">
                                    <h4>To recieve your order</h4>
                                    <div className="phone">
                                        <div className="phone1"><img src="/asset/call.png" alt="" /></div> <span
                                            className="wash1">(123) 111-0116</span>
                                    </div>
                                </div>
                                <div className="order">
                                    <h4>Working Hours</h4>
                                    <div className="phone">
                                        <div className="phone1"><img src="/asset/time.png" alt="" /></div> <span
                                            className="wash1">7 AM - 10 Pm</span>
                                    </div>
                                </div>
                                <div className="order">
                                    <h4>Our Location</h4>
                                    <div className="phone">
                                        <div className="phone2"><a href=""><img src="/asset/location.png" alt="" /></a></div>
                                        <span className="washi">4517 Washington
                                            Ave.Manchester,
                                            Kentucky 39495</span>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="col-md-6">
                            <div className="map1">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30468.578869832316!2d-122.58221900507088!3d47.5470180747448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490380d27e8374b%3A0xd94a6e34fd3dffac!2sManchester%2C%20WA%2C%20USA!5e0!3m2!1sen!2sin!4v1758603754361!5m2!1sen!2sin"
                                    width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MapSection;
