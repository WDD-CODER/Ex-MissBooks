

export function BookCard({book}) {
console.log("🚀 ~ BookCard ~ books:", book)

    return (
        <article className="book-card container">
            <h1>{book.title}</h1>
        </article>
    )

}