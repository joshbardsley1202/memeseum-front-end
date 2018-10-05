import React, {Component} from 'react';
import defaultProfilePicture from '../../../assets/default-profile-picture.png'
import './Meme.css'

export default class Meme extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: props.url,
            owner: props.owner,
            likes: props.likes
        }
    }

    render() {
        return (
            <div className="component-meme">
                <div className="meme-owner">
                    <div className="meme-owner-img">
                        <img src={defaultProfilePicture}></img>
                    </div>
                    <p>
                        {
                            this.state.owner == ""
                                ?
                                "Unknown user"
                                :
                                this.state.owner
                        }
                    </p>
                </div>
                <div className="meme-img">
                    <img src={this.state.url}/>
                </div>
                {/*//TODO: These are simply place holders, functionality needs to bee added later.*/}
                <div className="meme-options">
                    <div className="meme-option like-meme">
                        <button>❤️</button>
                    </div>
                    <div className="meme-option share-meme">
                        <button>📤</button>
                    </div>
                    <div className="meme-option comment-meme">
                        <button>💬</button>
                    </div>
                    <div className="meme-option download-meme">
                        <button>📥</button>
                    </div>

                </div>


            </div>
        );
    }
}

