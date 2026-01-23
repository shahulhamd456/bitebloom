
import Link from 'next/link';

const NotFound = () => {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            paddingTop: '80px' // account for fixed header
        }}>
            <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '1rem' }}>404</h1>
            <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Oops! Page not found.</p>
            <Link href="/" className="button">
                Go back Home
            </Link>
        </div>
    );
};

export default NotFound;
