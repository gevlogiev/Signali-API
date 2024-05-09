import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as groupService from "../services/groupService.js";
import EditModalGroup from "../components/Groups/EditModalGroup.jsx";
import AddModalGroup from "../components/Groups/AddModalGroup.jsx";
import { RouletteSpinnerOverlay } from 'react-spinner-overlay'
import { Button } from 'primereact/button';
import GroupContext from "../contexts/GroupContext.jsx";

export default function Groups() {

    const { groups, handleAddGroup, handleEditGroup  } = useContext(GroupContext);


    const [loading, setLoading] = useState(false);
    // const [groups, setGroups] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isAddVisible, setIsAddVisible] = useState(false);
    const navigate = useNavigate();


    const handleAdd = () => {
        setIsAddVisible(true)
    }

    const handleEdit = (groupId) => {
        setSelectedGroupId(groupId);
        const group = groups.find(group => group.groupId === groupId);
        setSelectedGroup(group);
        setIsEditVisible(true);
    };

    const handleCloseEditModal = () => {
        setIsEditVisible(false);
    };


    const handleCloseAddModal = () => {
        setIsAddVisible(false);
    };

    return (
        <main id="main" className="main">
                <RouletteSpinnerOverlay  　loading={loading} />
            <div className="pagetitle">
                <h1>Потребителски групи</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Начало</a></li>
                        <li className="breadcrumb-item active">Групи</li>
                    </ol>
                </nav>
            </div>
            <section className="section alist">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="row">Потребителски групи</div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                        <Button label="+ Добавяне на група" raised   onClick={handleAdd} />
                            {/* <input type="button" className="btn btn-success" value={'+ Добавяне на група '} onClick={handleAdd}></input> */}
                        </div>
                        <table className='table  table-striped table-bordered'>
                            <thead>
                                <tr>
                                    <th>Име</th>
                                    <th>Телефон</th>
                                    <th>Описание</th>
                                    <th>Статус</th>
                                    <th>Дежурен</th>
                                    <th>Редакция</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groups.map((group) => (
                                    <tr key={group.groupId}>
                                        <td>{group.groupName}</td>
                                        <td>{group.groupPhone}</td>
                                        <td>{group.groupDescription}</td>
                                        <td>{group.activeStatus ? 'Активна' : 'Неактивна'}</td>
                                        <td>{group.onDuty ? 'Да' : 'Не'}</td>

                                        <td><input type="button" value='Редакция' onClick={() => handleEdit(group.groupId)}></input></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            {isEditVisible && <EditModalGroup visible={isEditVisible} handleCloseEditModal={handleCloseEditModal} editGroup={handleEditGroup} setLoading={setLoading} group={selectedGroup}   />}
            {isAddVisible && <AddModalGroup visible={isAddVisible} handleCloseAddModal={handleCloseAddModal} addGroup={handleAddGroup}   setLoading={setLoading}/>}
        </main>
    );
}