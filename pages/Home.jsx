import { animateCSS } from "../services/util.service.js"
const { useRef, useEffect } = React

export function Home() {
    const ref = useRef()
    const imgRef = useRef()

    useEffect(() => {
        animateCSS(ref.current, 'jackInTheBox', false)
    }, [])

    return (
        <section className="home grid place-items">
            <h1 ref={ref} >WELCOME</h1>
            <p>Welcome to Missed Books. This application will be your best friend to help you manage
                and find books easily. You're welcome to enjoy it—go to the books page to discover more.</p>
            <img ref={imgRef} src="./assets/utilImages/homePage.png" alt="welcome image" />
        </section>
    )
}