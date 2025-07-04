const { useState, useEffect, } = React
export function BookFilter({ defaultFilter, setFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...defaultFilter })

    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const text = (!filterByToEdit.text) ? '' : filterByToEdit.text
    const maxPrice = (filterByToEdit.maxPrice <= 0) ? '' : filterByToEdit.maxPrice

    return (
        <section className="book-filter box container">
            <label htmlFor="text">Search By Text
                <input name="text" value={text} onChange={handleChange} type="text" placeholder="search for Whatever !" />
            </label>
            <label htmlFor="maxPrice">Max Price
                <input name="maxPrice"
                    value={maxPrice} onChange={handleChange} type="number" placeholder="You have a budget?" />
            </label>
        </section>
    )

}