import React, {Component} from "react"
import Categories from "../Categories/Categories"
import Cards from "../Cards/Cards"

export default class Home extends Component {

    render() {
        return (
            <main>
                
                <form >

                </form>
                <Cards
                    filterBy={this.state.category}
                />
            </main>
        )
    }
}