
export function BookDetails({ book, onRemoveBook , onSelectBook }) {
    
    return (
        // <article className="book-details grid place-center container">
        //     <header>
        //         <h1>BookTitle <br /> {book.title}</h1>
        //         <h2>{book.subtitle}</h2>
        //     </header>

        //     <section className="book-info">
        //         <ul>
        //             <li>Language: {book.language}</li>
        //             <li>Pages: {book.pageCount}</li>
        //             <li>Published: {book.publishedDate}</li>
        //         </ul>
        //     </section>
        //     <p className="price">
        //         <strong>{book.listPrice.amount} {book.listPrice.currencyCode}</strong>
        //         {book.listPrice.isOnSale && <span> On Sale!</span>}
        //     </p>
        //     <figure className="img">
        //         <img src={book.thumbnail} alt={`Cover of ${book.title}`} />
        //     </figure>
        //     <ul className="book-meta">
        //         <li className="authors">Authors: {book.authors}</li>
        //         <li className="categories">categories: {book.categories}</li>
        //     </ul>
        //     <p className="description">{book.description}</p>

        //     <div className="btns">
        //         <button className="remove" onClick={() => onRemoveBook(book.id)}>X</button>
        //         <button className="select" onClick={() => onSelectBook(book.id)}>Select</button>
        //     </div>

        // </article>
        <article className="book-details grid container">
  <figure className="cover-img">
    <img src={book.thumbnail} alt={`Cover of ${book.title}`} />
  </figure>

  <section className="main-info">
    <header>
      <h1 className="title">{book.title}</h1>
      <h2 className="subtitle">{book.subtitle}</h2>
      <p className="authors">By: {book.authors}</p>
    </header>

    <ul className="meta">
      <li><strong>Language:</strong> {book.language}</li>
      <li><strong>Pages:</strong> {book.pageCount}</li>
      <li><strong>Published:</strong> {book.publishedDate}</li>
      <li><strong>Categories:</strong> {book.categories}</li>
    </ul>

    {/* <p className="price">
      <strong>{book.listPrice.amount} {book.listPrice.currencyCode}</strong>
      {book.listPrice.isOnSale && <span className="sale">On Sale!</span>}
    </p> */}

    <p className="description">{book.description}</p>

    <div className="actions">
      <button className="remove" onClick={() => onRemoveBook(book.id)}>Remove</button>
      <button className="select" onClick={() => onSelectBook(book.id)}>Select</button>
    </div>
  </section>
</article>

    )

}
{/* <article className="book-details grid container">
  <figure className="cover-img">
    <img src={book.thumbnail} alt={`Cover of ${book.title}`} />
  </figure>

  <section className="main-info">
    <header>
      <h1 className="title">{book.title}</h1>
      <h2 className="subtitle">{book.subtitle}</h2>
      <p className="authors">By: {book.authors?.join(', ')}</p>
    </header>

    <ul className="meta">
      <li><strong>Language:</strong> {book.language}</li>
      <li><strong>Pages:</strong> {book.pageCount}</li>
      <li><strong>Published:</strong> {book.publishedDate}</li>
      <li><strong>Categories:</strong> {book.categories?.join(', ')}</li>
    </ul>

    <p className="price">
      <strong>{book.listPrice.amount} {book.listPrice.currencyCode}</strong>
      {book.listPrice.isOnSale && <span className="sale">On Sale!</span>}
    </p>

    <p className="description">{book.description}</p>

    <div className="actions">
      <button className="remove" onClick={() => onRemoveBook(book.id)}>Remove</button>
      <button className="select" onClick={() => onSelectBook(book.id)}>Select</button>
    </div>
  </section>
</article> */}
