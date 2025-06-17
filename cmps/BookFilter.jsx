const {useState, useEffect} = React

export function BookFilter({setFilterBy}) {






    return (
        <section className="book-filter container">
            <label htmlFor="text">Search By Text
            <input name="text" onChange={() => setFilterBy('txt')} type="text" placeholder="search for book by name" />
            </label>
            <label htmlFor="number">Search By Price
            <input name="number" onChange={() => setFilterBy('price')} type="number" placeholder="search for book by price" />
            </label>
        </section>
    )

}