import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import * as userService from '../../services/userService'
import { MultiSelect } from 'primereact/multiselect';

export default function EditModalUser({ visible, handleCloseEditModal, editUser, setLoading, groups, user }) {


    const [userId, setUserId] = useState(user.userId)
    const [userName, setUserName] = useState(user.userName)
    const [userRealName, setuserRealNamePhone] = useState(user.userRealName)
    const [activeStatus, setActveStatus] = useState(user.activeStatus)
    const [userGroup, setUserGroup] = useState(user.userGroup)
    const [createdOn, setCreatedOn] = useState(formatDate(user.createdOn));
    const [updatedOn, setUpdateOn] = useState(formatDate(user.updatedOn));

    const [selectedGroups, setSelectedGroups] = useState(user.groupIds ? user.groupIds.split(',').map(id => parseInt(id)) : []);
    const placeholderText = user.groupIds ? "Изберете група" : "Няма избрана група";



    const handleChangeGroup = (e) => {
        setSelectedGroups(e.value);
    };

    const groupOptions = groups.map(group => ({ label: group.groupName, value: group.groupId }));





    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    const [formData, setFormData] = useState({
        userId: userId,
        userName: userName,
        userRealName: userRealName,
        activeStatus: activeStatus,
        userGroup: userGroup,

    });
    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const updateUser = () => {

        setLoading(true)
        handleCloseEditModal()
        userService.update(userId, formData)
            .then(result => {

                if (result == 200) {

                    editUser(formData);
                    setLoading(false);
                }
            })
            .catch(err => {
                console.error("Error fetching groups:", err);
                setLoading(false);
            });
    }



    const footerContent = (
        <div>
            <Button label="Отказ" icon="pi pi-times" onClick={handleCloseEditModal} severity="danger" raised />
            <Button label="Редакция" icon="pi pi-check" onClick={updateUser} autoFocus severity="success" raised />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Dialog header={`Редакция на потребител ${user.userRealName}`} visible={visible} style={{ width: '50vw' }} onHide={handleCloseEditModal} footer={footerContent}>
                <div className="card">
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-12">
                                <label htmlFor="name" className="form-label">Име </label>
                                <input type="text" className="form-control" id="userRealName" name="userRealName" value={formData.userRealName} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="phone" className="form-label">Потребителско име</label>
                                <input type="phone" className="form-control" id="phone" name="userName" value={formData.userName} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="status" className="form-label">Статус</label>
                                <select id="status" className="form-select" name="activeStatus" value={formData.activeStatus} onChange={handleChange}>
                                    <option disabled selected>Изберете</option>
                                    <option value={true}>Активен</option>
                                    <option value={false}>Неактивен</option>
                                </select>
                            </div>
                            {/* <div className="col-12">
                                <label htmlFor="description" className="form-label">Опитсание</label>
                                <input type="text" className="form-control" id="description" name="groupDescription" value={formData.groupDescription} onChange={handleChange} />
                            </div> */}
                            <div className="col-md-12">
                                <label htmlFor="onduty" className="form-label">Принадлежи към групи</label>
                                <MultiSelect
                                    value={selectedGroups}
                                    onChange={(e) => setSelectedGroups(e.value)}
                                    options={groupOptions}
                                    optionLabel="label"
                                    placeholder={placeholderText}
                                    maxSelectedLabels={3}
                                    className="w-full md:w-20rem"
                                />



                            </div>
                            <div className="col-md-6">
                                <label htmlFor="createdOn" className="form-label">Създаден </label>
                                <input type="text" className="form-control" id="createdOn" defaultValue={createdOn} disabled />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="UpdatedOn" className="form-label">Последен вход </label>
                                <input type="text" className="form-control" id="UpdatedOn" defaultValue={updatedOn} disabled />
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
