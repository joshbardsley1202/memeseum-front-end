import React, {Component} from "react"
import Categories from "../Categories/Categories"
import Cards from "../Cards/Cards"
import loading from '../../assets/loading.gif'
import apis from "../../api";
import Upload from "../Upload/Upload";

export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            categories: [],
            category: undefined,
            memes: [],
            isLoaded: false
        }
        this.getMemes = this.getMemes.bind(this)
        this.findCategories = this.findCategories.bind(this)
    }

    componentDidMount() {
        this.getMemes()
    }

    findCategories(memeData) {
        let memeCategories = []
        memeData.forEach(meme => {
            if (memeCategories.indexOf(meme.category) == -1 && meme.category !== "") {
                memeCategories.push(meme.category)
            }
        })
        return memeCategories
    }

    getMemes() {
        //TODO make a class for fetching memes.
        this.setState({isLoaded: false})
        fetch(apis.postsDatabaseURl)
            .then(res => res.json())
            .then(resJSON => {
                this.setState({
                    categories: this.findCategories(resJSON.data),
                    memes: resJSON.data,
                    isLoaded: true
                });
            })
            .catch(error => console.error(error));
    }

    render() {
        let memes = undefined;
        if (this.state.isLoaded) {
            if (this.state.memes.length === 0) {
                memes = (
                    <h1>There are no memes :(</h1>
                )
            } else {
                memes = (
                    <Cards
                        memes={this.state.memes}
                        categories={this.state.categories}
                    />
                )
            }
        } else {
            memes = (
                <div className="loading-gif">
                    <img src={loading}/>
                </div>
            )
        }
        return (
            <main>
                <Upload
                    categories={this.state.categories}
                />
                {memes}
            </main>
        )
    }
}