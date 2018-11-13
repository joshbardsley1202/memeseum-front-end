import React from "react"
import "./Cards.css"
// import apis from '../../api'
// import Upload from '../Upload/Upload'
// import DeleteCard from './DeleteCard/DeleteCard'
import Meme from './Meme/Meme'

export default class Cards extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            memes: props.memes,
            category: "All Memes",
            categories: props.categories
        }
        this.updateCategory = this.updateCategory.bind(this)
    }

    updateCategory(event) {
        let value = event.target.value
        this.setState({
            category: value
        })
    }

    render() {
        let memes = null;
        let categories = this.state.categories.map(category => (
            <option>{category}</option>
        ))
        if (this.state.category === "All Memes") {
            memes = this.state.memes.map(meme => (
                <Meme
                    key={meme.id}
                    url={meme.url}
                    owner={meme.user}
                    likes={meme.likes}
                />
            )).reverse()
        } else {
            let filteredMemes = this.state.memes.filter(meme => {
                return (meme.category === this.state.category)
            })
            memes = filteredMemes.map(meme => (
                <Meme
                    key={meme.id}
                    url={meme.url}
                    owner={meme.user}
                    likes={meme.likes}
                />
            )).reverse()
        }
        return (
            <section className="component-cards">
                <form className="meme-categories">
                    <select onChange={this.updateCategory}>
                        <option>All Memes</option>
                        {categories}
                    </select>
                </form>
                <section className="memes">
                    {memes}
                </section>

            </section>
        )
    }
}
