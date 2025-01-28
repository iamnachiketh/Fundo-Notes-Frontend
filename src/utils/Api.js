import axios from "axios";

const baseUrl = "http://localhost:4000/api/v1";

export const login = async function (uri, data) {

    try {

        const response = await axios.post(`${baseUrl}/${uri}`, data);
        return response;

    } catch (error) {
        return error.response;
    }
}

export const signup = async function (uri, data) {

    const { confirmPassword, ...newData } = data;

    try {

        const response = await axios.post(`${baseUrl}/${uri}`, newData);

        return response;

    } catch (error) {
        console.log(error.response.status);
        return error.response;
    }

}

export const getAllNotes = function (uri, userEmail) {

    return new Promise(async (resolve, reject) => {
        try {

            const response = await axios.get(`${baseUrl}/${uri}`, {
                headers: {
                    "x-token": `Bearer ${localStorage.getItem("token")}`
                },
                params: {
                    userEmail,
                    page: 1,
                    limit: 5
                }
            });

            resolve(response);

        } catch (error) {
            console.log("This is an error: ", error);
            reject(error.response);
        }
    });

}


export const addNote = async function (uri, data) {
    try {

        console.log(data);
        const response = await axios.post(`${baseUrl}/${uri}`, data, {
            headers: {
                "x-token": `Bearer ${localStorage.getItem("token")}`
            }
        });

        return response;

    } catch (error) {
        console.log(error);
        return error.response;
    }
}


export const getArchiveNotes = function (uri) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`${baseUrl}/${uri}`, {
                headers: {
                    "x-token": `Bearer ${localStorage.getItem("token")}`
                },
                params: {
                    email: localStorage.getItem("userEmail")
                }
            });
            resolve(response);
        } catch (error) {
            reject(error.response);
        }
    });
}


export const getTrashNotes = function (uri) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`${baseUrl}/${uri}`, {
                headers: {
                    "x-token": `Bearer ${localStorage.getItem("token")}`
                },
                params: {
                    email: localStorage.getItem("userEmail")
                }
            });
            resolve(response);
        } catch (error) {
            reject(error.response);
        }
    });
}

