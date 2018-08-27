let data = {
    token: "",
    loggedIn: false
}

if (localStorage.loggedIn) {
    data.loggedIn = localStorage.loggedIn;
}

module.exports = data;