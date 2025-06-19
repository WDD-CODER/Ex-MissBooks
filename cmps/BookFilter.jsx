const { useState, useEffect } = React

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


    return (
        <section className="book-filter container">
            <label htmlFor="text">Search By Text
                <input name="text" onChange={handleChange} type="text" placeholder="search for Whatever !" />
            </label>
            <label htmlFor="maxPrice">Max Price
                <input name="maxPrice" onChange={handleChange} type="number" placeholder=" You have a budget?" />
            </label>
        </section>
    )

}