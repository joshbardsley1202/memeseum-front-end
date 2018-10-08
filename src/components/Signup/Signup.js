import React, {Component} from 'react';
import './Signup.css'

export default class Signup extends Component {
    constructor(props){
        super(props)
        this.state={

        }
        this.onSignupSubmit = this.onSignupSubmit.bind(this)
    }
    onSignupSubmit(event){
        event.preventDefault()
        var formData = new FormData(event.target)
        var signUpCredentials={
            // firstName: formData.get('firstName'),
            // lastName: formData.get('lastName'),
            email: formData.get('email'),
            displayName: formData.get('displayName'),
            profilePicture: event.target[1].files[0],
            password: formData.get('password1'),
            password2: formData.get('password2')
        }
        if(signUpCredentials.password != signUpCredentials.password2){
            alert('Your passwords do not match, please try again.')
        }else{
            //TODO: Implement this else.
            console.log(signUpCredentials)
            // firebase.auth().createUserWithEmailAndPassword(
            //     signUpCredentials.email,
            //     signUpCredentials.password
            // )
            //     .then(res => {
            //         if(res.additionalUserInfo.isNewUser){
            //             firebase.auth().currentUser.updateProfile({
            //                 displayName: signUpCredentials.displayName
            //             })
            //                 .then(() => {
            //                     this.createUser({
            //                         displayName: signUpCredentials.displayName,
            //                         profilePictureUrl: signUpCredentials.photoUrl,
            //                         firstName: signUpCredentials.firstName,
            //                         lastName: signUpCredentials.lastName,
            //                         likedPictures: []
            //                     })
            //                     firebase.auth().signOut()
            //                 })
            //         }
            //     })
            //     .catch(error => {
            //         var errorCode = error.code;
            //         var errorMessage = error.message;
            //         console.error(errorCode)
            //         alert(errorMessage)
            //     });
        }
    }
    render() {
        return (
            <section className="component-signup">
                <h1>Signup.</h1>
                <form
                    className="signup-form"
                    onSubmit={this.onSignupSubmit}
                >
                    {/*TODO: Optional, but you can implement this later in another way (/Profile) perhaps?*/}
                    {/*<div>*/}
                        {/*<label>First name:</label>*/}
                        {/*<input*/}
                            {/*autoFocus*/}
                            {/*required*/}
                            {/*type="text"*/}
                            {/*name="fistName"*/}
                        {/*/>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                        {/*<label>Last name:</label>*/}
                        {/*<input*/}
                            {/*required*/}
                            {/*type="text"*/}
                            {/*name="lastName"*/}
                        {/*/>*/}
                    {/*</div>*/}
                    <div>
                        <label>Display name:</label>
                        <input
                            required
                            type="text"
                            name="displayName"
                        />
                    </div>
                    <div>
                        <label>Profile picture: [Disabled]</label>
                        <input
                            disabled
                            type="file"
                            name="profilePicture"
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            autoFocus
                            required
                            type="text"
                            name="email"
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            required
                            type="password"
                            name="password1"
                        />
                    </div>
                    <div>
                        <label>Re-enter Password:</label>
                        <input
                            required
                            type="password"
                            name="password2"
                        />
                    </div>
                    <div>
                        <input
                            id="signup-submit-btn"
                            type="submit"
                            value="Submit"
                        />
                    </div>
                </form>
            </section>
        );
    }
}