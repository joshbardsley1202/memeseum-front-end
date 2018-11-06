const production = false
const baseUrl = production ? "/IMPLEMENT/" : "http://localhost:5000"
const apis = {
    memes_Data: `${baseUrl}/memes/`,
    userInfo_Data: `${baseUrl}/userinfo/`
}
export default apis