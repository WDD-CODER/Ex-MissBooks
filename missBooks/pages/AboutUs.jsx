
const { useState, useEffect, useRef } = React;

export function AboutUs() {

    const [watchers, setWatchersArray] = useState([]);

    useEffect(() => {
    }, [])


    return (
        <div className="about container">
            hi there world!
        </div>
    )
}