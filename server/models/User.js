const User = {};


User.findByToken = (token) => {

    return  {
        username: "Dummy Bear",
        tokenContent: token,
        data: {}
    }

}

module.exports = User;