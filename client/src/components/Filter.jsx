import React, { useState, useEffect, useContext } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import GroupContext from '../contexts/GroupContext';



export const Filter = ({ onFilterChange }) => {
    const { groups } = useContext(GroupContext);

    const groupOptions = groups.map(group => ({
        label: group.groupName,
        value: group.groupId,

    }));
    const statusOptions = ([{
        label: 'Получен',
        value: 1,
    }, {
        label: 'Възложен',
        value: 2,
    }, {
        label: 'Приключен',
        value: 3,
    }, {
        label: 'Невлаиден',
        value: 4,
    }
    ]);


    const [formData, setFormData] = useState({
        delovoden: '',
        phone: '',
        email: '',
        name: '',
        keyWord: '',
        number: '',
        dateFromSignal: '',
        dateEndSignal: '',
        sentTo: '',
        status: '',
        order: '',
        category: '',
        dateDelovodenFrom: '',
        dateDelovodenTo: '',



    });

    const handleSubmit = () => {

        onFilterChange(formData);
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: value
        }));
    };
    return (
        <div className="card p-3">
            <h4>Филтри:</h4>
            <div className="row p-3 d-flex flex-wrap w-100 gap-2">
                <div className="w-16 p-0">
                    <div className="form-group">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="phone" className="form-label">Деловоден номер</label>
                                <InputText id="phone" aria-describedby="phone-help" className="form-control" name='delovoden' value={formData.delovoden} onChange={handleChange} />
                                <small id="phone-help" className="form-text text-muted">
                                    {/* Тази информация не се редактира */}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-16 p-0">
                    <div className="form-group">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="phone" className="form-label">Телефон на подател</label>
                                <InputText id="phone" aria-describedby="phone-help" className="form-control" name='phone' value={formData.phone} onChange={handleChange} />
                                <small id="phone-help" className="form-text text-muted">
                                    {/* Тази информация не се редактира */}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-16 p-0">
                    <div className="form-group">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="email" className="form-label">Email на подател</label>
                                <InputText id="email" aria-describedby="email-help" className="form-control" name='email' value={formData.email} onChange={handleChange} />
                                <small id="email-help" className="form-text text-muted">
                                    {/* Тази информация не се редактира */}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-16 p-0">
                    <div className="form-group">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="name" className="form-label">Имена на подател</label>
                                <InputText id="name" aria-describedby="name-help" name='name' value={formData.name} onChange={handleChange} className="form-control" />
                                <small id="name-help" className="form-text text-muted">
                                    {/* Тази информация не се редактира */}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-16 p-0">
                    <div className="form-group">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="name" className="form-label">Ключова дума в описанието</label>
                                <InputText id="name" aria-describedby="name-help" className="form-control" name='keyWord' value={formData.keyWord} onChange={handleChange} />
                                <small id="name-help" className="form-text text-muted">
                                    {/* Тази информация не се редактира */}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="w-16 p-0">
                    <div className="form-group">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="email" className="form-label">Електронен номер</label>
                                <InputText id="email" aria-describedby="email-help" className="form-control" name='number' value={formData.number} onChange={handleChange} />
                                <small id="email-help" className="form-text text-muted">
                                    {/* Тази информация не се редактира */}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-16 p-0">
                    <label htmlFor="email" className="form-label">От дата (на подаване)</label>
                    <Calendar className='w-100 h-2_3r' id="signalDateEnd"
                        value={formData.dateFromSignal}
                        dateFormat="dd.mm.yy"
                        maxDate={new Date()}
                        showIcon
                        name='dateFromSignal'
                        onChange={handleChange}
                    />
                </div>

                <div className="w-16 p-0">
                    <label htmlFor="email" className="form-label">До дата (на подаване)</label>
                    <Calendar className='w-100 h-2_3r' id="signalDateEnd"
                        value={formData.dateEndSignal}
                        dateFormat="dd.mm.yy"
                        maxDate={new Date()}
                        showIcon
                        name='dateEndSignal'
                        onChange={handleChange}
                    />
                </div>

                <div className="w-16 p-0">
                    <label htmlFor="email" className="form-label">Възложен на</label>
                    <Dropdown options={groupOptions} optionLabel="label"
                        placeholder="Изберете" className="w-100 h-2_3r p-0" checkmark={true} highlightOnSelect={false} name='sentTo'
                        value={formData.sentTo} onChange={handleChange} />
                </div>


                <div className="w-16 p-0">
                    <label htmlFor="email" className="form-label">Статус</label>
                    <Dropdown value={formData.status} onChange={handleChange} name='status' options={statusOptions} optionLabel="label"
                        placeholder="Изберете" className="w-100 h-2_3r p-0" checkmark={true} highlightOnSelect={false} />
                </div>

                <div className="w-16 p-0">
                    <label htmlFor="email" className="form-label">Подредба</label>
                    <Dropdown value={formData.order} onChange={handleChange} name='order' options={statusOptions} optionLabel="label"
                        placeholder="Изберете" className="w-100 h-2_3r p-0" checkmark={true} highlightOnSelect={false} />
                </div>

                <div className="w-16 p-0">
                    <label htmlFor="email" className="form-label">Категория</label>
                    <Dropdown value={formData.category} onChange={handleChange} name='category' options={statusOptions} optionLabel="label"
                        placeholder="Изберете" className="w-100 h-2_3r p-0" checkmark={true} highlightOnSelect={false} />
                </div>



                <div className="w-16 p-0">
                    <label htmlFor="email" className="form-label">От дата (на завеждане)</label>
                    <Calendar className='w-100 h-2_3r' id="signalDateEnd" name='dateDelovodenFrom'
                        value={formData.dateDelovodenFrom}
                        dateFormat="dd.mm.yy"
                        maxDate={new Date()}
                        showIcon
                        onChange={handleChange}
                    />
                </div>

                <div className="w-16 p-0">
                    <label htmlFor="email" className="form-label">До дата (на завеждане)</label>
                    <Calendar className='w-100 h-2_3r' id="signalDateEnd" name='dateDelovodenEnd'
                        value={formData.dateDelovodenEnd}
                        dateFormat="dd.mm.yy"
                        maxDate={new Date()}
                        showIcon
                        onChange={handleChange}

                    />
                </div>






                {/* <div className="w-16 p-0">
                    <div className="form-group">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="email" className="form-label">Електронен номер</label>
                                <InputText id="email" aria-describedby="email-help"   className="form-control" />
                                <small id="email-help" className="form-text text-muted">
                                   
                                </small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-16 p-0">
                    <div className="form-group">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="email" className="form-label">Електронен номер</label>
                                <InputText id="email" aria-describedby="email-help"   className="form-control" />
                                <small id="email-help" className="form-text text-muted">
                                 
                                </small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-16 p-0">
                    <div className="form-group">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="email" className="form-label">Електронен номер</label>
                                <InputText id="email" aria-describedby="email-help"   className="form-control" />
                                <small id="email-help" className="form-text text-muted">
                                   
                                </small>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="row p-3 d-flex flex-wrap w-100 gap-2">
                <input type='button' className="btn btn-primary w-15" value='търсене' onClick={handleSubmit}></input>
                <input type='button' className="btn btn-outline-secondary w-15" value='Изчисти филтъра'></input>
            </div>
        </div>

    )
}