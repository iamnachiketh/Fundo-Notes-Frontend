import axios from "axios";

export const login = function (uri, data) {

    axios.post(`http://localhost:4000/api/v1/users/${uri}`, data)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        });
}

export const signup = function (uri, data) {

    const { confirmPassword, ...newData } = data;
    
    axios.post(`http://localhost:4000/api/v1/users/${uri}`, newData)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        });
}

