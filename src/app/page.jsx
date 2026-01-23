
import Hero from '../components/Hero';
import Products from '../components/Products';
import OfferSection from '../components/OfferSection';
import AboutSection from '../components/AboutSection';
import Testimonials from '../components/Testimonials';
import MapSection from '../components/MapSection';

export default function Home() {
    return (
        <main>
            <Hero />
            <Products />
            <OfferSection />
            <AboutSection />
            <Testimonials />
            <MapSection />
        </main>
    );
}
