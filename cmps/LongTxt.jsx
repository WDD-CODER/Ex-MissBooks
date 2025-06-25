const { useState } = React

export function LongTxt({ txt, length = 50 }) {
if (!txt) return

    const [isExtended, setIsExtended] = useState(true)
    return (
        <p className="long-txt">{!isExtended ? txt : txt.substring(0, length)}

            <span className="read-more" onClick={() => setIsExtended(!isExtended)}>
                {!isExtended ? ' show less...' : ' show more...'}
            </span>
        </p>
    )

}