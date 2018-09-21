import React from "react"
import "./Cards.css"


export default class Cards extends React.Component {
    render() {
        return (
            <div>
            <div class = "meme-container">
            <div class = "meme-pic">
            <img src = "./assets/Kanye_meme.png"/>
            </div>


            </div>

            <div class = "meme-container">
            <div class = "meme-pic">
            <img src = "./assets/Office-meme.png"/>
            </div>

            </div>
            
            <div class = "meme-container">
            <div class = "meme-pic">
            <img src = "./assets/Chicken_meme.png"/>
            </div>
            </div>


            </div>
        )
    }
}