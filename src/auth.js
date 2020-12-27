import axios from 'axios';

class Auth {
    async login({username, password}) {
        await axios.post('http://gstpcto.herokuapp.com/login', {
            username: username,
            password: password
        })
            .then(function (response) {
                console.log(response);
                const responseData = response.data;
                const { data } = responseData;
                console.log(data);
                localStorage.setItem('token', data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    logout() {
        localStorage.setItem('token', '');
    }

    isAuthenticated() {
        const jwtToken = localStorage.getItem('token');
        // eslint-disable-next-line
        const re = new RegExp("^[A-Za-z0-9-_=]+1\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$");
        if ( !(jwtToken.match(re)) || jwtToken === null || jwtToken === undefined || jwtToken ===  "" || jwtToken === "null" || jwtToken === "undefined"){
            return false;   // Non è presente un token
        } 
        return true;    // È presente un token, la verifica della validità avviene server-side.
    }
}

export default new Auth();