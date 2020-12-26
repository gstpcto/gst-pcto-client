import axios from 'axios';

class Auth {
    constructor() {
        this.authenticated = false;
    }

    async login({username, password}) {
        const _this = this;
        await axios.post('http://gstpcto.herokuapp.com/login', {
            username: username,
            password: password
        })
            .then(function (response) {
                console.log(response);
                const responseData = response.data;
                const { data } = responseData;
                console.log(data);
                _this.authenticated = true;
                console.log(_this.authenticated);
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