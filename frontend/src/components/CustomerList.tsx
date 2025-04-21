import React from "react";
interface User {
    name: string;
    email: string;
}
interface UserListProps {
    categoryList: User[];
}
const UserList = ({ categoryList }: UserListProps) => {
    return (
        <ul>
            {categoryList.map((val: User, index: number) => (
                <li key={index}>
                    <div className="user-info">
                        <span>名前:</span><span>{val.name}</span>
                        <span>メール:</span><span>{val.email}</span>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default UserList;
