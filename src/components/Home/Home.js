import React, {Component} from "react"
import Categories from "../Categories/Categories"
import Cards from "../Cards/Cards"

export default class Home extends Component {
    render() {
        return (
            <main>
                
                <Categories/>
                <Cards/>
            </main>
            // <div>
            //     <header>
            //         <Header/>
            //         <Sidenav/>
            //     </header>
            //     <Main>
            //         <Categories/>
            //     </Main>
            // </div>
        )
    }
}