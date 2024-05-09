import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import * as groupService from '../../services/groupService'

import { RouletteSpinnerOverlay } from 'react-spinner-overlay'


export default function AddModalGroup({ visible, handleCloseAddModal, addGroup, setLoading }) {







    const SubmitForm = () => {
        setLoading(true)
        handleCloseAddModal()
        groupService.create(formData)
            .then(result => {
                if (result > 0) {
                    formData.groupId = result;
                    addGroup(formData)
                    setLoading(false);
                }
            })
            .catch(err => {
                console.error("Error fetching groups:", err);
                setLoading(false);
            });

    }



    const [formData, setFormData] = useState({
        groupId: '',
        groupName: '',
        groupPhone: '',
        groupDescription: '',
        activeStatus: true,
        onDuty: false
    });
    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };






    const footerContent = (
        <div>
            <Button label="Отказ" icon="pi pi-times" onClick={handleCloseAddModal} severity="danger" raised />
            <Button label="Добавяне" icon="pi pi-check" onClick={SubmitForm} autoFocus severity="success" raised />
        </div>
    );

    return (
        <div className="card flex justify-content-center">

            <Dialog header={`Добавяне на нова група`} visible={visible} style={{ width: '50vw' }} onHide={handleCloseAddModal} footer={footerContent}>
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

                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
