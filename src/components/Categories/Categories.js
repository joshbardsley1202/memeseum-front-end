import React from "react"
import {BrowserRouter as Router,Route,Link} from "react-router-dom"
import "./Categories.css"


export default class Categories extends React.Component {
    render() {
        return (
            <div>
                <nav>
                    <h2>Categories</h2>
                    <div id = "border-link">

                    <Link to = "./javascript" id = "category-link-1">Javascript Memes</Link>
                    <Link to = "./office" id = "category-link-2">"The Office" Memes</Link>
                    </div>
                </nav>
            </div>
        )
    }
}