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
                    <Link to = '/Javascript' class = "category-links">Javascript Memes</Link>
                    <Link to = "/Apple" class = "category-links">Apple Memes</Link>
                    <Link to = "/OOM" class = "category-links">Object Oriented Memes</Link>
                    </div>
                </nav>
            </div>
        )
    }
}