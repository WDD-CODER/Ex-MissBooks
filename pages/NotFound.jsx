
export function NotFound() {

  return (
    <section className="not-found">
      <div className="box container">
        <h1>404 Page Not Found </h1>
        <p>This page doesn't exist in Miss Books.</p>
        <a style={{color:'blue' ,textDecoration:'underline'}} href="/#/books">Go back to the bookstore</a>
      </div>
    </section>
  );
}