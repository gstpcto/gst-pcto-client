import axios from 'axios';

class Auth {
    constructor() {
        this.authenticated = false;
    }

    login({username, password}) {
        axios.post('http://gstpcto.herokuapp.com/login', {
            username: username,
            password: password
        })
            .then(function (response) {
                console.log(response);
                const responseData = response.data;
                const { data } = responseData;
                console.log(data);
                console.log(this.authenticated);
                this.authenticated = true;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    logout() {
        this.authenticated = false;
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();