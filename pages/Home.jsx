import { animateCSS } from "../services/util.service.js"

const { useState, useRef , useEffect } = React

export function Home() {
    const ref = useRef()
    const imgRef = useRef()

useEffect(() => {
    animateCSS(ref.current, 'flash')
}, [])

function playAnimation(){
    animateCSS(ref.current, 'flash')
    animateCSS(imgRef.current, 'fadeOut', false)
}


    return (
        <section className="home grid place-items">
            <h1 ref={ref} >WELCOME</h1>
            <p> Welcome to missed books.
                The application is going to be your best friend to help you manage your
                books and find them easy You're welcome to enjoy Go to the books page to
                find some books`</p>
            <img ref={imgRef} src="./assets/utilImages/homePage.png" alt="Random Unsplash image" />
            <button onClick={playAnimation}>Test Animation</button>
        </section>
    )
}