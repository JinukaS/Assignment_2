export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer style={{ textAlign: 'center', padding: '1rem', marginTop: 'auto' }}>
            <p>
                &copy; {currentYear} - Your Name - Your Student Number
            </p>
        </footer>
    );
}