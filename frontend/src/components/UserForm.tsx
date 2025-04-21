import React, { useState } from "react";

const UserForm = ({ addUser }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    return (
        <div className="textBox">
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br />
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
            <button onClick={() => addUser(name, email)}>Add User</button>
        </div>
    );
};

export default UserForm;
