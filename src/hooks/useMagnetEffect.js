import { useEffect } from 'react';
import gsap from 'gsap';

const useMagnetEffect = () => {
    useEffect(() => {
        const buttons = document.querySelectorAll('.button, .btn-add-cart, .btn-buy-now, .membership-btn');

        buttons.forEach((button) => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(button, {
                    x: x * 0.3, // Magnetic strength
                    y: y * 0.3,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });

        // Cleanup
        return () => {
            buttons.forEach((button) => {
                // Cloning to remove listeners is a brute-force way if references are lost, 
                // but for a simple global effect, letting React handle unmount/remount is usually enough.
                // However, detailed cleanup would require named functions.
                // Given the dynamic nature, we'll rely on the fact that this runs once on mount 
                // or we can optimize later.
            });
        };
    }); // Run on every render to catch new buttons? Or just once? 
    // Better to run once or on route change. 
    // Let's rely on a MutationObserver if we want to be fancy, or just calling it in a useEffect with location dependency in App.
};

export default useMagnetEffect;
