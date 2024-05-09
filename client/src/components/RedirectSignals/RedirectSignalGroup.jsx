import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import * as userService from '../../services/userService'

import { RouletteSpinnerOverlay } from 'react-spinner-overlay'
import { MultiSelect } from 'primereact/multiselect';


export default function RedirectSignalGroup({ visible, handleCloseAddModal, addUser, setLoading, groups }) {


    
    const SubmitForm = () => {
        setLoading(true)
        handleCloseAddModal()
        userService.create(formData)
            .then(result => {
                if (result > 0) {
                    formData.userId = result;
                    addUser(formData)
                    setLoading(false);
                }
            })
            .catch(err => {
                console.error("Error fetching groups:", err);
                setLoading(false);
            });

    }



    const [formData, setFormData] = useState({
        userRealName: '',
        userName: '',
        userEmail: '',
        userPassword: '',
        userPasswordRetake: '',
        onDuty: false,
        userType: null,
        activeStatus: true,
        selectedGroups: []
    });

    const handleChangeSelectedGroups = (e) => {
        setFormData(prevState => ({
            ...prevState,
            selectedGroups: e.value 
        }));
    };

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

            <Dialog header={`Добавяне на нов потребител`} visible={visible} style={{ width: '50vw' }} onHide={handleCloseAddModal} footer={footerContent}>
                <div className="card">
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="userRealName" className="form-label">Имена</label>
                                <input type="phone" className="form-control" id="userRealName" name="userRealName" value={formData.userRealName} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">

                                <label htmlFor="userName" className="form-label">Потребителско име</label>
                                <input type="userName" className="form-control" id="userName" name="userName" value={formData.userName} onChange={handleChange} />
                            </div>
                            {/* <div className="col-md-12">
                                <label htmlFor="userRealName" className="form-label">Имена</label>
                                <input type="text" className="form-control" id="userRealName" name="userRealName" value={formData.userRealName} onChange={handleChange} />
                            </div> */}
                            <div className="col-md-6">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="phone" name="userEmail" value={formData.userEmail} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="status" className="form-label">Към група</label>
                                <MultiSelect
                                    value={formData.selectedGroups}
                                    onChange={handleChangeSelectedGroups}
                                    options={groupOptions}
                                    optionLabel="label"
                                    placeholder={'Изберете група'}
                                    maxSelectedLabels={3}
                                    className="w-full md:w-20rem"
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="userPassword" className="form-label">Парола</label>
                                <input type="password" className="form-control" id="userPassword" name="userPassword" value={formData.userPassword} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">

                                <label htmlFor="userPasswordRetake" className="form-label">Повтори парола</label>
                                <input type="password" className="form-control" id="userPasswordRetake" name="userPasswordRetake" value={formData.userPasswordRetake} onChange={handleChange} />
                            </div>
                            {/* <div className="col-12">
                                <label htmlFor="description" className="form-label">Опитсание</label>
                                <input type="text" className="form-control" id="description" name="groupDescription" value={formData.groupDescription} onChange={handleChange} />
                            </div> */}
                            <div className="col-md-6">
                                <label htmlFor="onduty" className="form-label">Група Дежурен</label>
                                <select id="onduty" className="form-select" name="onDuty" value={formData.onDuty} onChange={handleChange}>
                                    <option disabled selected>Изберете</option>
                                    <option value={true}>Да</option>
                                    <option value={false}>Не</option>
                                </select>
                            </div>  <div className="col-md-6">
                                <label htmlFor="userType" className="form-label">Тип потребител</label>
                                <select id="userType" className="form-select" name="userType" value={formData.userType} onChange={handleChange}>
                                    <option value={null} disabled selected>Изберете</option>
                                    <option disabled value={1}>Супер администратор</option>
                                    <option value={2}>Администратор</option>
                                    <option value={3}>Дежурен</option>
                                    <option value={4}>Дирекция</option>
                                    <option value={5}>За четене</option>
                                </select>
                            </div>

                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
