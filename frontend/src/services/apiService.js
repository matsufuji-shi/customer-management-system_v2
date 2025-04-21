import Axios from 'axios';

const getUsers = () => {
    return Axios.get("http://localhost:3001/api/get/users");
};

const addUser = (name, email) => {
    return Axios.post("http://localhost:3001/api/insert/user", { name, email });
};

const apiService = {
    getUsers,
    addUser,
};

export default apiService;
