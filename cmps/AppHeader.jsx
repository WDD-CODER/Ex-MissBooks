
import { animateCSS } from "../services/util.service.js"
const { NavLink, } = ReactRouterDOM

const { useState, useEffect, useRef } = React
export function AppHeader() {

    const homeRef = useRef()
    const aboutRef = useRef()
    const booksRef = useRef()


    const [playAnimate, setPlayAnimate] = useState(null)

    useEffect(() => {
        if (playAnimate) onPlayAnimation(playAnimate)
    }, [playAnimate])


    function onsetAnimation(res) {
        setPlayAnimate(res)
    }


    function onPlayAnimation(animation) {
        switch (animation.target.innerText) {
            case 'HOME':
                animateCSS(homeRef.current, 'wobble', false)
                break;
            case 'ABOUT':
                animateCSS(aboutRef.current, 'rubberBand', false)
                break;
            case 'BOOKS':
                animateCSS(booksRef.current, 'flash', false)
                break;

            default: console.log('animation', animation)
                break;
        }
    }


    return (
        <header className='app-header'>
            <section>
                <h1>MissBooks App </h1>
                <img className="logo" src="./assets/utilImages/logo_small.png" alt="logoImg" />
                <nav className='app-nav'>
                    <NavLink ref={homeRef} onClick={onsetAnimation} to="/home"> HOME </NavLink>
                    <NavLink ref={aboutRef} onClick={onsetAnimation} to="/about"> ABOUT </NavLink>
                    <NavLink ref={booksRef} onClick={onsetAnimation} to="/books"> BOOKS </NavLink>
                </nav>

            </section>
        </header>
    )
}