import React, { useState } from "react";

interface UserFormProps {
    addUser: (name: string, email: string) => void;
}

const UserForm = ({ addUser }: UserFormProps) => {
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
