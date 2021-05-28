import axios from 'axios';

class UsersServiceComponent {
    addUser(userObj) {
        return axios.post('http://localhost:8080/ppa/user/adduser', userObj);
    }

    deleteUser(userId) {
        return axios.delete('http://localhost:8080/ppa/user/deleteuser/' + userId);
    }

    login(email, password) {
        return axios.put('http://localhost:8080/ppa/user/loginuser?email=' + email + '&password=' + password);
    }

    logout() {
        return axios.get('http://localhost:8080/ppa/user/logout');
    }

    updateUser(userObj) {
        return axios.put('http://localhost:8080/ppa/user/updateuser', userObj);
    }

    listAllUsers() {
        return axios.get('http://localhost:8080/ppa/user/viewallusers');
    }

    listUserById(userId) {
        return axios.get('http://localhost:8080/ppa/user/viewuserbyid/' + userId);
    }

    listAllUsersByName(userName) {
        return axios.get('http://localhost:8080/ppa/user/viewuserbyname/' + userName);
    }
}

export default new UsersServiceComponent;
