import React from "react"
import "./Header.css"


export default class Header extends React.Component {
    render() {
        return (
            <header>
                <h1 id = "logo-header">Memeseum</h1>

                <button id = "login-button">Login</button>
            </header>
        )
    }
}