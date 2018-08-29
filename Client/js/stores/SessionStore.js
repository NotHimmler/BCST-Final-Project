class SessionStore {
    constructor() {
        this.loggedIn = false;
        this.token = "";
    }
    
    setLoggedIn(val) {
        this.loggedIn = val;
    }
}

export default SessionStore;