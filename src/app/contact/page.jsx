
import MapSection from '../../components/MapSection';

const Contact = () => {
    return (
        <main>
            <div className="container">
                <div className="herotxt" style={{ margin: "auto", textAlign: "center", marginBottom: "20px", maxWidth: "100%", paddingTop: "50px" }}>
                    <h1 data-aos="flip-down" data-aos-duration="500">Get in Touch</h1>
                    <p className="ppp">We'd love to hear from you. Visit us, call us, or send us a message.</p>
                </div>
            </div>
            <MapSection />

            <div className="container" style={{ maxWidth: '800px', paddingBottom: '60px' }}>
                <form className="emailsubscribe" style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '30px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', width: 'auto' }}>
                    <div className="mb-4">
                        <label className="ph5" style={{ display: 'block', marginBottom: '10px' }}>Name</label>
                        <input type="text" style={{ width: '100%', padding: '15px', borderRadius: '50px', border: '1px solid #eee' }} placeholder="Your Name" />
                    </div>
                    <div className="mb-4">
                        <label className="ph5" style={{ display: 'block', marginBottom: '10px' }}>Email</label>
                        <input type="email" style={{ width: '100%', padding: '15px', borderRadius: '50px', border: '1px solid #eee' }} placeholder="Your Email" />
                    </div>
                    <div className="mb-4">
                        <label className="ph5" style={{ display: 'block', marginBottom: '10px' }}>Message</label>
                        <textarea style={{ width: '100%', padding: '20px', borderRadius: '30px', border: '1px solid #eee', minHeight: '150px' }} placeholder="How can we help?"></textarea>
                    </div>
                    <button type="submit" className="button" style={{ width: '100%', borderRadius: '50px', padding: '15px' }}>Send Message</button>
                </form>
            </div>
        </main>
    );
};

export default Contact;
