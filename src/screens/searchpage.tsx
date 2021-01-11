import React, { useState, useEffect } from "react";
import * as BooksAPI from '../BooksAPI'
import '../App.css'
import { updateObjectBindingPattern } from "typescript";

import { useHistory } from 'react-router-dom'
import { strict } from "assert";

const SearchPage = () => {
    const history = useHistory();
    const [bookdata, setbookdata] = useState([]);
    const [searchWord, setsearchWord] = useState('');
    const [currentlyReadingBooks, setcurrentlyReadingBooks] = useState([] as any);
    const [wanttoReadBooks, setwanttoReadBooks] = useState([] as any);
    const [readBooks, setreadBooks] = useState([] as any);

    useEffect(() => {
        if (searchWord) {
            BooksAPI.search(searchWord).then(
                (data) => {
                    if (data.hasOwnProperty('error')) {
                        setbookdata([])
                    }
                    else {
                        setbookdata(data)
                    }
                })
        }
        else {
            setbookdata([])
        }
        // BooksAPI.getAll().then((data) => {
        //     setbookdata(data)
        // })

    }, [searchWord])
    useEffect(() => {
        BooksAPI.getAll().then((data) => {
            let readBooksID = [] as any;
            let curentlyreadBooksID = [] as any;
            let wanttoreadBooksID = [] as any;
            data.map((item: any) => {
                if (item.shelf === 'read') {
                    readBooksID.push(item.id)
                }
                if (item.shelf === 'currentlyReading') {
                    curentlyreadBooksID.push(item.id)
                }
                if (item.shelf === 'wantToRead') {
                    wanttoreadBooksID.push(item.id)
                }
            })
            setreadBooks(readBooksID)
            setcurrentlyReadingBooks(curentlyreadBooksID)
            setwanttoReadBooks(wanttoreadBooksID)
        })
    }, [])
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <button className="close-search" onClick={() => history.push('/')}>Close</button>
                <div className="search-books-input-wrapper">
                    {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                    <input type="text" onChange={(event) => {
                        setsearchWord(event.target.value)
                    }} placeholder="Search by title or author" />

                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {bookdata ? (
                        bookdata.map((item: any) => {
                            if (item.title && item.imageLinks && item.imageLinks.thumbnail && item.title && item.authors) {
                                return <li key={item.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + item.imageLinks.thumbnail + ')' }}></div>
                                            <div className="book-shelf-changer">
                                                <select value={
                                                    readBooks.includes(item.id) ? 'read' : (
                                                        currentlyReadingBooks.includes(item.id) ? 'currentlyReading' : (
                                                            wanttoReadBooks.includes(item.id) ? 'wantToRead' : 'none'
                                                        ))
                                                } onChange={(event: any) => {
                                                    BooksAPI.update(item, event.target.value)
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
                                        {item.authors ?
                                            <div className="book-authors">{item.authors.join(', ')}</div> : ''}
                                    </div>
                                </li>
                            }
                        }))
                        : ''
                    }
                </ol>
            </div>
        </div>
    );
}
export default SearchPage;
