import React, {Component} from "react"

import apis from "../../api";
import "./Home.css"

import Cards from "../Cards/Cards"
import loading from '../../assets/loading.gif'
import Upload from "../Upload/Upload.js";
import firebase from "firebase";


export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            category: undefined,
            memes: [],
            isLoaded: false,
            isAuthenticated: undefined,
        };
        this.getMemes = this.getMemes.bind(this);
        this.findCategories = this.findCategories.bind(this);
        this.isUserLoggedin = this.isUserLoggedin.bind(this);
    }

    componentDidMount() {
        this.getMemes()
    }

    isUserLoggedin() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) this.setState({isAuthenticated: true});
            else this.setState({isAuthenticated: false});
        });
    }

    findCategories(memeData) {
        let memeCategories = [];
        if (memeData) {
            memeData.forEach(meme => {
                if (
                    memeCategories.indexOf(meme.category) === -1
                    &&
                    meme.category !== ""
                ) {
                    memeCategories.push(meme.category);
                }
            });
        }
        return memeCategories;
    }

    getMemes() {
        this.setState({isLoaded: false}, () => {
            this.isUserLoggedin();
        });
        fetch(apis.memes_Data)
            .then(res => res.json())
            .then(resJSON => {
                this.setState({
                    categories: this.findCategories(resJSON.memes),
                    memes: resJSON.memes,
                    isLoaded: true
                });
                console.log(resJSON)
            })
            .catch(error => console.error(error));
    }

    render() {
        let memes = null;
        let upload = null;
        if (this.state.isLoaded && this.state.isAuthenticated !== undefined) {
            if (this.state.memes.length === 0) {
                memes = (
                    <div className="no-memes">
                        <h1 id="nomemes-cry">😭</h1>
                        <h1>There are no memes...</h1>
                    </div>
                );
            } else {
                memes = (
                    <Cards
                        memes={this.state.memes}
                        categories={this.state.categories}
                    />
                );
            }
            if (this.state.isAuthenticated) {
                upload = (
                    <Upload
                        categories={this.state.categories}
                        getMemes={this.getMemes}
                    />
                )
            } else {
                upload = (
                    <div className="home-welcome">
                        <h1>Welcome to Memeseum!</h1>
                        <div className="">

                        </div>
                    </div>
                )
            }
        } else {
            memes = (
                <div className="loading-gif">
                    <img src={loading}/>
                </div>
            );
        }
        return (
            <main>
                {upload}
                {memes}
            </main>
        )
    }
}