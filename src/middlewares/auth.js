const adminAuth = (req, res, next) => {
    const token = "hey"
    const isAuthorized = token === "hey"
    if(isAuthorized){
        next()
    }else{
        res.status(401).send("unauthorized")
    }
}

const userAuth = (req, res, next) => {
    const token = "hey"
    const isAuthorized = token === "hey"
    if(isAuthorized){
        next()
    }else{
        res.status(401).send("unauthorized")
    }
}

module.exports = { adminAuth, userAuth };