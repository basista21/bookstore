import React from 'react';

function Books(props) {
  return (
    <div>
      <h1>My books</h1>
      <table>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
        </tr>
        {props.books.map((book) => {
          return (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.description}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Books;