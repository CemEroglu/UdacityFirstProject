import React, { useState, useEffect } from "react";
import * as BooksAPI from '../BooksAPI'
import '../App.css'
import { updateObjectBindingPattern } from "typescript";

import { Link, useHistory } from 'react-router-dom'

const HomePage = () => {
    const history = useHistory();
    const [bookdata, setbookdata] = useState([]);
    useEffect(() => {
        BooksAPI.getAll().then((data) => {
            setbookdata(data)
        })
    }, [])
    const updatebookdata = () => {
        BooksAPI.getAll().then((data) => {
            setbookdata(data)
        })
    }
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {bookdata.filter((item: any) => item.shelf === 'currentlyReading').map((item: any) => {
                                    return <li key={item.id}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + item.imageLinks.thumbnail + ')' }}></div>
                                                <div className="book-shelf-changer">
                                                    <select onChange={(event: any) => {
                                                        BooksAPI.update(item, event.target.value).then(() => {
                                                            updatebookdata()
                                                        })
                                                    }}>
                                                        <option value="move" disabled>Move to...</option>
                                                        <option value="currentlyReading">Currently Reading</option>
                                                        <option value="wantToRead">Want to Read</option>
                                                        <option value="read">Read</option>
                                                        <option value="none">None</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="book-title">{item.title}</div>
                                            <div className="book-authors">{item.authors.join(', ')}</div>
                                        </div>
                                    </li>
                                })}
                            </ol>
                        </div>
                    </div>

                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {bookdata.filter((item: any) => item.shelf === 'wantToRead').map((item: any) => {

                                    return <li key={item.id}>

                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + item.imageLinks.thumbnail + ')' }}></div>
                                                <div className="book-shelf-changer">
                                                    <select onChange={(event: any) => {
                                                        BooksAPI.update(item, event.target.value).then(() => {
                                                            updatebookdata()
                                                        })
                                                    }}>
                                                        <option value="move" disabled>Move to...</option>
                                                        <option value="wantToRead">Want to Read</option>
                                                        <option value="currentlyReading">Currently Reading</option>
                                                        <option value="read">Read</option>
                                                        <option value="none">None</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="book-title">{item.title}</div>
                                            <div className="book-authors">{item.authors.join(', ')}</div>
                                        </div>
                                    </li>
                                })}
                            </ol>
                        </div>
                    </div>

                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {bookdata.filter((item: any) => item.shelf === 'read').map((item: any) => {
                                    return <li key={item.id}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + item.imageLinks.thumbnail + ')' }}></div>
                                                <div className="book-shelf-changer">
                                                    <select onChange={(event: any) => {
                                                        BooksAPI.update(item, event.target.value).then(() => {
                                                            updatebookdata()
                                                        })
                                                    }}>
                                                        <option value="move" disabled>Move to...</option>
                                                        <option value="read">Read</option>
                                                        <option value="currentlyReading">Currently Reading</option>
                                                        <option value="wantToRead">Want to Read</option>
                                                        <option value="none">None</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="book-title">{item.title}</div>
                                            <div className="book-authors">{item.authors.join(', ')}</div>
                                            {/* <div className="book-authors">{item.authors.map((item: any) => {
                                                return item + ','
                                            })}</div> */}
                                        </div>
                                    </li>
                                })}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="open-search">
                <button onClick={() => {
                    history.push('/search');
                }
                }>Add a book</button>
                {/* <Link className="open-search" to='/search'>Add a book</Link> */}
            </div>

        </div>
    );
}
export default HomePage;

