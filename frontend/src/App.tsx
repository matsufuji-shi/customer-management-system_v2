import React from "react";
import './App.css';
import useCategories from "./hooks/useCategories";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import apiService from "./services/apiService";

function App() {
    const { categoryList, refreshCategories } = useCategories();

    const addUser = (name, email) => {
        apiService.addUser(name, email)
            .then(() => {
                alert("User added successfully");
                refreshCategories();
            })
            .catch(err => {
                console.error("Error adding user: ", err);
                alert("Failed to add user");
            });
    };

    return (
        <div className="App">
            <UserForm addUser={addUser} />
            <UserList categoryList={categoryList} />
        </div>
    );
}

export default App;
