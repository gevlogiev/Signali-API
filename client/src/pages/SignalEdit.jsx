import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import { SelectButton } from 'primereact/selectbutton';

import { RouletteSpinnerOverlay } from 'react-spinner-overlay'
import * as signalService from "../services/signalService";
import { RouletteSpinner } from 'react-spinner-overlay'


import GroupContext from '../contexts/GroupContext';
import UserContext from '../contexts/UserContext';
import CategoryContext from '../contexts/CategoryContext';
import SignalFiles from '../components/SignalFiles';

function SignalEdit() {

    //#region  nomenclatures
    const topics = [
        { name: 'Сигнал', value: '1' },
        { name: 'Предложение', value: '2' },
        { name: 'Похвала', value: '3' },

    ];
    const auth = JSON.parse(localStorage.getItem('auth'));


    const location = useLocation();
    const [signal, setSignal] = useState({});


    const { categories } = useContext(CategoryContext)
    const { groups } = useContext(GroupContext);
    const { users } = useContext(UserContext)
    const { id, pageNumber, } = useParams();
    const [loading, setLoading] = useState(false)
    const [loadingFiles, setLoadingFiles] = useState(false)
    const [selectedAction, setSelectedAction] = useState(0)
    const [seeHistory, setSeeHistory] = useState(true)
    const [countOpen, setCountOpen] = useState("");
    const [changeDelovodenNumber, setChangeDelovodenNumber] = useState(false)
    const [signalNote, setSignalNote] = useState('');
    const [invalid, setInvalid] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([])
    const [selectedMembers, setSelectedMembers] = useState([])
    const [redirectNote, setRedirectNote] = useState('belejka ')


    const groupOptions = groups.map(group => ({
        label: group.groupName,
        value: group.groupId,
        disabled: signal.redirects?.find(x => x.redirected_group_id == group.groupId),
    }));
    const handleChangeGroup = (e) => {
        setSelectedMembers(e.value);
    };


    const handleChangeUser = (e) => {
        setSelectedUsers(e.value);
    };

    const categoriesOptions = categories.map(category => ({ label: (category.categoryName), value: category.categoryId }));
    const handleChangeCategory = (e) => {
        setSignal(state => ({
            ...state,
            category_id: e.target.value
        }));
    };

    const handleChange = (e) => {
        setSignal(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };



    //#endregion
    const userOptions = users.map(user =>
        ({ label: (user.userRealName + ' (' + user.userEmail + ')'), value: user.userId, disabled: signal.emailsSend?.find(x => x.to_user_id == user.userId), }));


    // const [updatePerformed, setUpdatePerformed] = useState(false);

    useEffect(() => {
        setLoading(true)

        signalService.getById(id)
            .then((data) => {
                setSignal(data)
                const redirectedToIds = data.redirects
                    .map(redirect => redirect.redirected_group_id)
                    .filter(redirectedGroupId => redirectedGroupId !== null);
                setSelectedMembers(redirectedToIds)
                const userEmailSend = data.emailsSend?.map(emailSend => emailSend.to_user_id);
                setSelectedUsers(userEmailSend)
                setCountOpen(data.is_new_count)
                setLoading(false)

            })
            .catch(error => {
                setLoading(false)

                console.error('Error fetching data:', error);
            });
    }, [])

    useEffect(() => {

        if (signal && signal.id) {


            if (countOpen <= 0) {
                signalService.updateSignalCount(signal.id)
                    .then(result => {
                        // Update performed successfully, set the state to prevent further updates
                        // setUpdatePerformed(true);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            // window.scrollTo(0, 0);
        }
    }, [countOpen]);



    const optionsAction = [
        { label: ' 🔃 Насочване', value: 2, disabled: signal.is_final || signal.date_end != null },
        { label: ' 📨 Изпращане', value: 3, disabled: signal.is_final || signal.date_end != null },
        { label: ' ✅ Приключване', value: 4, disabled: (signal.is_final || selectedMembers?.length != signal?.redirects?.length || selectedUsers?.length != signal?.emailsSend?.length) },
        { label: ' 🚫 Невалиден', value: 5, disabled: (signal.is_final || selectedMembers?.length != signal?.redirects?.length || selectedUsers?.length != signal?.emailsSend?.length) || signal.date_end != null }
    ];


    const updateSignal = async () => {

        const dataToUpdate = {
            signalId: signal.id,
            delovodenNumber: signal.delovoden_number,
            delovodenDate: signal.delovoden_date,
            signalNote: signalNote,
            selectedCategory: signal.category_id,
            selectedMembers: selectedMembers,
            selectedUsers: selectedUsers,
            userId: auth.id,
            dateEndSignal: signal.date_end,
            invalid: invalid,
            selectedAction: selectedAction,
            redirectNote: redirectNote,
        };


        signalService.updateSignal(dataToUpdate)
            .then(result => {

                setSignal(result)
                // window.location.href = '/signals';
            })
            .catch(err => {
                console.log(err);
            });
    };


    const getStatusText = (status) => {
        switch (status) {
            case 1:
                return "Получен";
            case 2:
                return "Възложен";
            case 3:
                return "Email";
            case 4:
                return "Приключен";
            case 5:
                return "Невалиден";

            default:
                return "грешка";
        }
    };

    const deleteRedirect = (e, id) => {
        e.preventDefault()
        console.log(`iztrivam redirect s ID ${id}`);
        return
    }

    return (

        <main id="main" className="main">
            <RouletteSpinnerOverlay loading={loading} />
            <div className="card">
                <h4>Електронен номер: {signal.random_number} / Дата на подаване {signal.date_received} - {getStatusText(signal.status)} ////////////////{signal.id}</h4> <input type='button' hidden value={'Пормени датата'}></input>
            </div>

            <div className="card p-3">
                <h4>Данни за лицето подало сигнал:</h4>
                <div className="row pt-2 ">
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="name" className="form-label">Имена</label>
                                    <InputText id="name" aria-describedby="name-help" value={signal.name} readOnly className="form-control" disabled />
                                    <small id="name-help" className="form-text text-muted">
                                        Тази информация не се редактира
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="phone" className="form-label">Телефон</label>
                                    <InputText id="phone" aria-describedby="phone-help" value={signal.phone} readOnly className="form-control" disabled />
                                    <small id="phone-help" className="form-text text-muted">
                                        Тази информация не се редактира
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <InputText id="email" aria-describedby="email-help" value={signal.email} readOnly className="form-control" disabled />
                                    <small id="email-help" className="form-text text-muted">
                                        Тази информация не се редактира
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>



            <div className="card">
                <div className="col-md-12 p-3">
                    <h4>Данни сигнала:</h4>
                    <div className="form-group row  pt-2">
                        <div className="col-md-4 d-flex flex-wrap">
                            <label htmlFor="delovodenNumber" className="form-label w-100">Деловоден номер</label>
                            <InputText aria-describedby="delovodenNumber-help" value={signal.delovoden_number || ''} id='delovodenNumber' name='delovoden_number' onChange={handleChange} className="form-control" />
                            <small id="delovodenNumber-help" className="form-text text-muted">
                                Попълнете деловоден номер
                            </small>
                        </div>
                        <div className="col-md-4 d-flex flex-wrap">
                            <label htmlFor="delovodenDate" className="form-label w-100">Дата на завеждане</label>
                            <Calendar className='w-100' id="delovodenDate" name='delovodenDate' value={signal.delovoden_date} onChange={(e) => setDelovodenDate(e.value)} disabled={changeDelovodenNumber} showTime hourFormat="24" dateFormat="dd/mm/yy" maxDate={new Date()} />
                            <small id="delovodenDate-help" className="form-text text-muted w-100">
                                Изберете дата за завеждане
                            </small>
                        </div>
                        <div className="col-md-4 d-flex flex-wrap">
                            <label htmlFor="topic" className="form-label w-100">Вид на описанието</label>
                            <Dropdown value={signal.topic} onChange={(e) => setSelectedTopic(e.value)} options={topics} optionLabel="name"
                                placeholder="Вид на описанието" className="w-100 md:w-14rem " />
                            <small id="topic-help" className="form-text text-muted w-100">
                                Вид на описанието
                            </small>
                        </div>


                        <div className="col-md-8 pt-2" >
                            <div className="form-group">
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="location" className="form-label">Местонахождение</label>
                                        <InputText id="location" aria-describedby="location-help" value={signal.location} readOnly className="form-control" />
                                        <small id="location-help" className="form-text text-muted">
                                            Тази информация не се редактира
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" d-flex flex-wrap w-100">

                            <label className='pt-3' htmlFor="SignalText">За какво се отнася похвалата или оплакването:</label>
                            <InputTextarea className='w-100' name='SignalText' autoResize placeholder="Описание на сигнала/похвала" rows={5} cols={30} />
                        </div>
                        <div className="d-flex flex-wrap w-100">
                            <label className='pt-3 w-100' htmlFor="SignalText">Бележка</label>
                            <InputTextarea
                                name='SignalText'
                                value={signalNote}
                                onChange={(e) => setSignalNote(e.target.value)}
                                autoResize
                                placeholder="Добавете бележка свързана със сигнала"
                                rows={2}
                                cols={10}
                                className='w-100'
                            />
                            <small id="location-help" className="form-text text-muted w-100">
                                Тази информация се вижда само от потребителите в системата
                            </small>
                            <div className='d-flex flex-wrap w-100 pt-4'>
                                <h4 className='w-100'>Категория </h4>

                                <Dropdown
                                    value={signal.category_id}
                                    onChange={handleChangeCategory}
                                    options={categoriesOptions}

                                    placeholder="Изберете категория"
                                    className="w-full md:w-14rem"
                                    optionLabel="label"
                                />

                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <SignalFiles signalFiles={signal.uploads} />


            <div className="card p-3">
                <h4>Действия:</h4>

                <div className="d-flex flex-wrap ">
                    <SelectButton
                        unselectable={true}
                        value={selectedAction}
                        options={optionsAction}
                        onChange={(e) => setSelectedAction(e.value)}
                        optionLabel="label"
                        placeholder="Изберете действие"
                    />

                    <div className='w-100 p-3'>

                        {selectedAction == 2 && (
                            <>
                                <label htmlFor="status" className="form-label w-50">Към група</label>
                                <MultiSelect
                                    value={selectedMembers}
                                    onChange={handleChangeGroup}
                                    options={groupOptions}
                                    optionLabel="label"
                                    placeholder={'Изберете група'}
                                    maxSelectedLabels={3}
                                    className="w-100 md:w-20rem"
                                    disabled={signal.is_final}
                                />
                            </>


                        )}
                        {selectedAction == 3 && (
                            <>
                                <label htmlFor="status" className="form-label w-50">Изпрати на email:</label>
                                <MultiSelect
                                    value={selectedUsers}
                                    onChange={handleChangeUser}
                                    options={userOptions}
                                    optionLabel="label"
                                    placeholder={'Изберете потребител'}
                                    maxSelectedLabels={3}
                                    className="w-100 md:w-20rem"
                                    disabled={signal.is_final}
                                />
                            </>
                        )}
                        {selectedAction == 4 && (
                            <>
                                <div className="col-md-4 d-flex flex-wrap">
                                    <label htmlFor="signalDateEnd" className="form-label w-100">Дата на приключване</label>
                                    <Calendar className='w-100' id="signalDateEnd" name='date_end'
                                        value={signal.date_end == null ? null : new Date(signal.date_end)}

                                        onChange={handleChange}
                                        disabled={invalid != ''}
                                        showTime
                                        hourFormat="24"
                                        dateFormat="dd/mm/yy"
                                        maxDate={new Date()} />
                                    <small id="signalDateEnd-help" className="form-text text-muted w-100">
                                        Датата на приключване може да се променя от администратор
                                    </small>


                                    {signal.is_final && signal.date_end && (
                                        <input className='w-100' type='button' value='Махни приключване'></input>
                                    )}

                                    {signal.date_end && !signal.is_final && (
                                        <input className='w-100' type='button' value='Изчисти дата'></input>
                                    )}


                                </div>

                            </>
                        )}
                        {selectedAction == 5 && (
                            <>
                                {/* disabled = {signal.is_final} */}
                                <div>Причина за отказ</div>
                                <input type='text' onChange={(e) => setInvalid(e.target.value)} value={invalid}></input>

                            </>

                        )}




                        {/* {selectedAction == 5 && (
                            <>
                                <div>Причина за отказ</div>
                                <input type='text'></input>

                            </>
                        )} */}

                    </div>
                </div>


                <div>
                    <input type='button' value={seeHistory ? 'Скрий история' : 'Покажи история'} onClick={(e) => setSeeHistory(!seeHistory)}></input>
                </div>
                {seeHistory && (

                    <>
                        <hr />
                        <h3>История на обработката</h3>
                        <hr />

                        <table>
                            <thead>
                                <th>Дата</th>
                                <th>Насочен към</th>
                                <th>Статус</th>
                                <th>Описание</th>
                                <th>Потребител</th>
                            </thead>

                            <tbody>


                                {signal.redirects && signal.redirects.map((redirect, index) => (
                                    <tr key={index}>
                                        <td>{redirect.created_on}</td>
                                        <td>{groups.find(group => group.groupId === redirect.redirected_group_id)?.groupName}</td>
                                        <td>{getStatusText(redirect.status)}</td>
                                        <td>{redirect.redirect_note}</td>
                                        <td>{users.find(user => user.userId === redirect.from_user_id)?.userRealName}</td>
                                        <td><input className="bg-white border-0" type="button" value="❌" onClick={e => deleteRedirect(e, redirect.id)}/></td>
                                    </tr>
                                ))}

                                <tr>
                                    <td>{signal.date_received}</td>
                                    <td></td>
                                    <td>Получен</td>
                                    <td></td>
                                    <td>{signal.source == 1 ? "Уебсайт" : signal.source == 2 ? 'Дежурен' : signal.source == 3 ? "Телефон" : signal.source == 4 ? "Mail" : ''}</td>
                                </tr>

                            </tbody>


                        </table>
                    </>
                )}
                <hr className='mt-5' />
                <h3 >Изпратени на електронна поща</h3>
                <hr />



                {signal.emailsSend?.length > 0 ? (
                    <table>
                        <thead>
                            <th>Дата</th>
                            <th>Изпратен към</th>
                            <th>Статус</th>
                            <th>Изпратен от</th>
                        </thead>

                        <tbody>

                            {signal.emailsSend && signal.emailsSend.map((signal, index) => (
                                <tr key={index}>
                                    <td>{signal.send_on}</td>
                                    <td>{users.find(user => user.userId === signal.to_user_id)?.userRealName}</td>
                                    <td>{signal.send_user_id ? 'Изпратен' : 'Грешка при изпращане'}</td>
                                    <td>{users.find(user => user.userId === signal.send_user_id)?.userRealName}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                ) : (<p>Няма изратени мейли</p>)

                }


            </div>
            <div className="d-flex gap-2">
                <Button
                    label="Потвърди"
                    icon="pi pi-check"
                    severity="success"
                    raised
                    className='rounded'
                    onClick={updateSignal}
                />
                <Button
                    label="Откажи"
                    icon="pi pi-times-circle"
                    severity="danger"
                    raised
                    className='rounded'
                //onClick={(e) => deny(e, regNum.regnumbeR_ID)}
                />
            </div>


        </main>
    );
}

export default SignalEdit;
