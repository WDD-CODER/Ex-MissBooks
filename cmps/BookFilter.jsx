export function BookFilter({setFilterBy}) {

    return (
        <section className="book-filter container">
            <input onChange={() => setFilterBy('txt')} type="text" placeholder="search for book by name" />
            <input onChange={() => setFilterBy('price')} type="number" placeholder="search for book by price" />
        </section>
    )

}