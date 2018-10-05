const production = false
const apis = {
    postsDatabaseURl: (
        production ?
            "localhost:5000/posts"
            :
            "https://memeseum-backend.herokuapp.com/posts/"
    )
}
export default apis