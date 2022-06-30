# sample-rails-react-app

Sample Ruby on Rails with React App to demonstrate how the API can be set up.

Based on the Youtube video [Setup A Ruby on Rails 7 API With React JS](https://www.youtube.com/watch?v=sh4WrNGDvQM). The original source code used in the video can be accessed [here](https://github.com/Deanout/bookstore-react-video).

## Setting up a Ruby on Rails API
Navigate to the directory where you want to create the app and execute:
```
rails new bookstore --api
```
This will create an API-only app named 'bookstore'.

Add the `rack-cors` gem in the Gemfile:
```
gem "rack-cors"
```

Navigate to the bookstore directory and install the gems:
```
cd bookstore
bundle install
```

In `config/initializers/cors.rb`, replace `origins "example.com"` with `origin "*"`. This will allow any IP address to make an API request. Alternatively, if, for example, the front-end client you are running is on *http://localhost:3001*, you can replace it with:
```
origins "http://localhost:3001"
```

Next, generate the Book resource:
```
rails g scaffold book title:string author:string description:text
```
This will generate a Book resource with a *title*, *author*, and *description* columns (along with some default columns such as *id*).

In `config/routes.rb`, replace `resources :books` with:
```
namespace :api do
  namespace :v1 do
    resources :books
  end
end
```
This puts `books` under the api/v1/ namespace so it can be accessed, for example, through *http://localhost:3000/api/v1/books* instead of *http://localhost:3000/books*.

Then, under `app/controllers`, create a folder named `api`. Under the `api` folder, create a `v1` folder. Then, move the file *books.rb* from `app/controllers` to `app/controllers/api/v1`.

To put the books controller under the api/v1/ namespace, replace `class BooksController < ApplicationController` with:
```
class Api::V1::BooksController < Application Controller
```

To test the API, open the console and populate the books table:
```
rails c
Book.create!(title:"Dune", author:"Frank Herbert", description:"Wandering in the spicy desert.")
```
To exit the Rails console, enter `quit`.

Now, open the Rails server via `rails s` and go to *http://localhost:3000/api/v1/books*. If you see JSON data representing the books table, you have successfully set up a Rails API.

## Communicating with the API using a ReactJS app (work in progress)

Create a React app named *booksapp* by running the following on the terminal:
```
npx create-react-app booksapp
```

Install axios, which will be used in making API requests:
```
npm install axios
```

Serve the React app:
```
npm run start
```

Next, create a new React component called Books. Under `booksapp/src/`, add a `components` folder. In the newly created folder, create a file named `books.js`. Copy and paste the following into `books.js`:
```
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
```

Copy and paste the following to the App.js file under the booksapp/src/ directory:
```
import './App.css';
import axios from "axios";
import Books from "./components/books";
import { useEffect, useState } from 'react';

const API_URL = "http://localhost:3000/api/v1/books";
function getAPIData() {
  return axios.get(API_URL).then((response) => response.data);
}

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    let mounted = true;
    getAPIData().then((items) => {
      if (mounted) {
        setBooks(items);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <div className="App">
      <Books books={books}/>
    </div>
  );
}

export default App;

```

Navigate to http://localhost:3001 (or to where the React app is served) and confirm that the books table is displayed.




