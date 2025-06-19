

export function BookEdit() {

    console.log('yoyo')

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


    function onSetBookTitle(ev) {
        ev.preventDefault()

    }

    function onSetBookPrice(ev) {
        ev.preventDefault()

    }

    function onSaveBook() {

    }

    return (
        <form className="container" onSubmit={onSaveBook}>
            <label htmlFor="text"> What's the books title ?</label>
            <input  onChange={onSetBookTitle} name="title" type="text" />

            <label htmlFor="number"> What's the books price ?</label>
            <input onChange={onSetBookPrice} name="price" type="number" />

            <button>Save Book</button>
        </form>

    )

}