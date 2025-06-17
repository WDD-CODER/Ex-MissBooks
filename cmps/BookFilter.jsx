const { useState, useEffect } = React
import { appService } from '../services/books.service.js'

export function BookFilter({ defaultFilter, setFilterBy }) {


    const [filterByToEdit, setFilterByToEdit] = useState({ ...defaultFilter })
    console.log("🚀 ~ BookFilter ~ filterByToEdit:", filterByToEdit)

    useEffect(()=>{
        setFilterBy(filterByToEdit)
    },[filterByToEdit])



    function handelChange({ target }) {
        console.log("🚀 ~ handelChange ~ target:", target)
        var newFilter = ''
        switch (target.type) {
            case 'text':
                newFilter = { txt: target.value }
                break;
                
                case 'number':
                    newFilter = { maxPrice: target.value }
                    break;
                    
                    default: newFilter = null
                    break;
                }
        
                setFilterByToEdit(newFilter)
        return newFilter
    }


    return (
        <section className="book-filter container">
            <label htmlFor="text">Search By Text
                <input name="text" onChange={handelChange} type="text" placeholder="search for book by name" />
            </label>
            <label htmlFor="number">Search By Price
                <input name="number" onChange={handelChange} type="number" placeholder="search for book by price" />
            </label>
        </section>
    )

}