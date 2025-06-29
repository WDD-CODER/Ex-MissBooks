
export function Footer({ fullname }) {
    const str = 'This App Was Made With Love & Respect For People Who Still Read Books 🧐 By'
    return (
        <footer className='footer-container'>
            <img className="logo" src="./assets/utilImages/logo_small.png" alt="logoImg" />
            <p>{str} {fullname} </p>
            <ul className="social-icons">
                <a href="http://www.facebook.com" className="icon-facebook"></a>
                <a href="http://www.twitter.com" className="fab fa-twitter"></a>
                <a href="http://www.instagram.com" className="fab fa-instagram"></a>
                <a href="http://www.github.com" className="fab fa-github"></a>
            </ul>
        </footer>
    )
}