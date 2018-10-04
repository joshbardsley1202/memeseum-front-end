import React, { Component } from 'react'
import "./DeleteCard.css"

export default class DeleteCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: props.id
        }
        this.deletePost = this.deletePost.bind(this)
    }
    deletePost() {
        fetch(`http://localhost:5000/posts/${this.state.id}`, { method: "DELETE" })
            .then(res => {
                if(res.status == 204){
                    alert("Deleted");
                    this.props.getMemes();
                }
                else{
                    alert('Oops, the post could not be deleted.')
                    console.error(res)
                }
                
            })
    }
  render() {
    return (
        <div>
      <button onClick ={this.deletePost} id = "delete-button">Delete</button>
    </div>
    )
  }
}

