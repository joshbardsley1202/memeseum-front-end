import React from "react"
import "./Upload.css"

export default class Upload extends React.Component {
    addPhoto = (event) => {
console.log(event.target)
    }


    render() {
        return(
            <div>
                <h1>Upload</h1>
                <form 
                    className = "upload"
                    onSubmit = {this.addPhoto}>
                    <label class = "cabinet">
                        ADD A MEME
                        <input 
                            class = "file-select"
                            onChange = {this.fileSelected}
                            type = "file"
                            name = "file"
                            accept = ".png,.jpg,.jpeg"
                            required
                        />
                    </label>
                </form>
            </div>
        )
    }
}