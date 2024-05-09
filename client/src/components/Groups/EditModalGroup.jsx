import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import * as groupService from '../../services/groupService'

export default function EditModalGroup({ visible, handleCloseEditModal,editGroup, setLoading , group}) {


    const [groupId, setGroupId] = useState(group.groupId)
    const [groupName, setGroupName] = useState(group.groupName)
    const [groupPhone, setGroupPhone] = useState(group.groupPhone)
    const [groupDescription, setGroupDescription] = useState(group.groupDescription)
    const [activeStatus, setActveStatus] = useState(group.activeStatus)
    const [onDuty, setOnDuty] = useState(group.onDuty)
    const [createdOn, setCreatedOn] = useState(formatDate(group.createdOn));

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
        groupId: groupId,
        groupName: groupName,
        groupPhone: groupPhone,
        groupDescription: groupDescription,
        activeStatus: activeStatus,
        onDuty: onDuty
    });
    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const updateGroup = () => {

        setLoading(true)
        handleCloseEditModal()
        groupService.update(groupId, formData)
            .then(result => {

                if (result == 200) {

                    editGroup(formData);
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
            <Button label="Редакция" icon="pi pi-check" onClick={updateGroup} autoFocus severity="success" raised />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Dialog header={`Редакция на група ${group.groupName}`} visible={visible} style={{ width: '50vw' }} onHide={handleCloseEditModal} footer={footerContent}>
                <div className="card">
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-12">
                                <label htmlFor="name" className="form-label">Име на група</label>
                                <input type="text" className="form-control" id="groupName" name="groupName" value={formData.groupName} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="phone" className="form-label">Телефон</label>
                                <input type="phone" className="form-control" id="phone" name="groupPhone" value={formData.groupPhone} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="status" className="form-label">Статус</label>
                                <select id="status" className="form-select" name="activeStatus" value={formData.activeStatus} onChange={handleChange}>
                                    <option disabled selected>Изберете</option>
                                    <option value={true}>Активна</option>
                                    <option value={false}>Неактивна</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <label htmlFor="description" className="form-label">Опитсание</label>
                                <input type="text" className="form-control" id="description" name="groupDescription" value={formData.groupDescription} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="onduty" className="form-label">Група Дежурен</label>
                                <select id="onduty" className="form-select" name="onDuty" value={formData.onDuty} onChange={handleChange}>
                                    <option disabled selected>Изберете</option>
                                    <option value={true}>Да</option>
                                    <option value={false}>Не</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="createdOn" className="form-label">Създадена </label>
                                <input type="text" className="form-control" id="createdOn" defaultValue={createdOn} disabled />
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
