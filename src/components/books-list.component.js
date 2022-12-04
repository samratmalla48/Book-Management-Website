import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Book = props => ( 
  <tr>
    <td>{props.book.image}</td>
    <td>{props.book.bookname}</td>
    <td>{props.book.authorname}</td>
    <td>{props.book.categoryname}</td>
    <td>{props.book.description}</td>
    <td>{props.book.duration}</td>
    <td>{props.book.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.book._id}>edit</Link> | <a href="#" onClick={() => { props.deleteBook(props.book._id) }}>delete</a>
    </td>
  </tr>
)

export default class BooksList extends Component {
  constructor(props) {
    super(props);

    this.deleteBook = this.deleteBook.bind(this)

    this.state = {books: []};
  }

  componentDidMount() {
    axios.get('https://backend-hepw.onrender.com/books/',{headers: {'Access-Control-Allow-Origin': '*'}})
      .then(response => {
        this.setState({ books: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteBook(id) {
    axios.delete('https://backend-hepw.onrender.com/books/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      books: this.state.books.filter(el => el._id !== id)
    })
  }

  bookList() {
    return this.state.books.map(currentbook => {
      return <Book book={currentbook} deleteBook={this.deleteBook} key={currentbook._id}/>;
    })
  }

  render() {
    return (
      <div>
        {/* <h3>Logged Books</h3> */}
        <table className="table">
          <thead className="thead-light">
            <tr>
            <th>Image</th>
            <th>BookName</th>
              <th>Authorname</th>
              <th>Category</th>
              <th>Description</th>
              <th>price</th>
              <th>Publication date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.bookList() }
          </tbody>
        </table>
      </div>
    )
  }
}
