import React, { createContext, useState, useEffect } from 'react';
import * as userService from "../services/userService.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        userService.getAll()
            .then(result => {
                setUsers(result);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching groups:", err);
                setLoading(false);
            });
    }, []);


    const handleAddUser = (newUser) => {
        console.log(newUser);
        setUsers(prevUsers => [...prevUsers, newUser]);

    };


    const handleEditUser = (editUser) => {
        setUsers(prevGUsers => {

            return prevUsers.map(user => {

                if (user.userId === editUser.userId) {
                    return editUser;
                } else {
                    return user;
                }
            });
        });
    };



    return (
        <UserContext.Provider value={{ users, handleAddUser, handleEditUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;