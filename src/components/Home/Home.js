import React, {Component} from "react"
import Categories from "../Categories/Categories"
import Cards from "../Cards/Cards"
import Upload from "../Upload/Upload"

export default class Home extends Component {
    render() {
        return (
            <main>
                <Upload/>
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