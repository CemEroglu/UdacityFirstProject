import React, { useState, useEffect } from "react";
import * as BooksAPI from '../BooksAPI'
import '../App.css'

const HomePage = () => {
    const [bookdata, setbookdata] = useState([]);
    return (
        <div>
            <button onClick={() => {
                BooksAPI.getAll().then((data) => {
                    setbookdata(data)
                })
            }}>deneme</button>
            {bookdata.map((item: any) => {
                return <li>{item.title}</li>
            })}


            <div>denemeee</div>
            {bookdata.filter((item: any) => item.shelf === 'read').map((item: any) => {

                return <div>

                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+item.imageLinks.thumbnail+')' }}></div>
                            <div className="book-shelf-changer">
                                <select>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                        </div>
                        <div className="book-title">{item.title}</div>
                        <div className="book-authors">{item.authors.map((item: any) => {
                            return item + ','
                        })}</div>
                    </div>




                </div>


            })}

        </div>
    );
}
export default HomePage;
