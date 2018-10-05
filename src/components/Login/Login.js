import React, {Component} from 'react';
import "./Login.css"
import { firebase } from '../../firebase-config.js'
//TODO: find imports from the above line and make sure that they are being used correctly.
export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            isUserLoggedIn: false
        }
        this.onLoginSubmit = this.onLoginSubmit.bind(this)

    }
    onLoginSubmit(event){
        event.preventDefault();
        var formData = new FormData(event.target)
        const loginCredentials = {
            email: formData.get("email"),
            password: formData.get("password")
        }
        //TODO: Remove implementation below once you get the login working right.
        alert(`
            BETA: logged in \n 
            user: ${loginCredentials.email} \n
            password: ${loginCredentials.password}
        `)

        /*
        * TODO: add firebase functionality below once your API key is setup
        * this.authWithEmailPassword(loginCredentials)
        */

    }
    /* TODO: implement this function
    authWithEmailPassword(loginCredentials){
        firebase.auth().signInWithEmailAndPassword(
            loginCredentials.email,
            loginCredentials.password
        )
            .then(res => {
                this.retreieveUserData(res.user.displayName)
                alert('Welcome back, ' + res.user.displayName + "! 😁")
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode)
                alert(errorMessage)
            });
    }
    */
    /* TODO: implement this function
    * Note: Untill the backend has support to add new users these will not work.
    retreieveUserData(displayName){
        fetch(apis.userInfo + displayName)
            .then(res => {
                if(res.status === 404) this.setState({ userWasFound: false })
                else return res.json()
            })
            .then(resJSON => {
                 //For long time deployment, it is a good idea to add functionality to log errors on a seperate backend to review problems and fix them.
                if(resJSON === undefined) alert('Oops, something went wrong. \n User was not found in our database.')
                else{
                    this.setState({
                        userWasFound: true,
                        firstName: resJSON.user.firstName,
                        lastName: resJSON.user.lastName
                        //Below: Implementation is up to you, but you dont need it
                        // userAge: resJSON.user.age,
                        // userBio: resJSON.user.bio,
                        // userLocation: resJSON.user.from
                    })
                }
            })
            .catch(error => console.error(error))
    }
     */
    render() {
        return (
            <section className="component-login">
                <h1>Welcome back, Memer.</h1>
                <form
                    className="login-form"
                    onSubmit={this.onLoginSubmit}
                >
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            autoFocus
                            required
                            type="text"
                            name="email"
                            placeholder="edp445@sport.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            required
                            type="password"
                            name="password"
                        />
                    </div>
                    <div>
                        <input
                            id="login-submit-btn"
                            type="submit"
                            value="Login"
                        />
                    </div>
                </form>

            </section>
        );
    }
}
