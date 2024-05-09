import React, { createContext, useState, useEffect } from 'react';
import * as groupService from "../services/groupService.js";

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        groupService.getAll()
            .then(result => {
                setGroups(result);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching groups:", err);
                setLoading(false);
            });
    }, []);


    const handleAddGroup = (newGroup) => {
        console.log(newGroup);
        setGroups(prevGroups => [...prevGroups, newGroup]);

    };


    const handleEditGroup = (editGroup) => {
        setGroups(prevGroups => {

            return prevGroups.map(group => {

                if (group.groupId === editGroup.groupId) {
                    return editGroup;
                } else {
                    return group;
                }
            });
        });
    };



    return (
        <GroupContext.Provider value={{ groups, handleAddGroup, handleEditGroup }}>
            {children}
        </GroupContext.Provider>
    );
};

export default GroupContext;