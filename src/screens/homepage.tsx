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
        </div>
    );
}
export default HomePage;
