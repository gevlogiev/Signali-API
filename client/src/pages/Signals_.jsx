import React, { useState, useEffect, useContext } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { InputNumber } from 'primereact/inputnumber';
import * as signalService from "../services/signalService";
import * as groupService from "../services/groupService";
import { Paginator } from 'primereact/paginator';
import { Tag } from 'primereact/tag';
import SignalEdit from './SignalEdit';
import { useNavigate } from 'react-router-dom';
import GroupContext from '../contexts/GroupContext';
import { RouletteSpinnerOverlay } from 'react-spinner-overlay'
import { Filter } from '../components/Filter';
import CategoryContext from '../contexts/CategoryContext';


export default function Signals1() {
    const [signals, setSignals] = useState(null);
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [pageData, setPageData] = useState([]);
    const [first, setFirst] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageRows, setPageRows] = useState(10);
    const { groups } = useContext(GroupContext);
    const { categories } = useContext(CategoryContext);


    const [filterName, setFilterName] = useState('');
    const [filterData, setFilterData] = useState(null);

    const handleFilterChange = (formData) => {
     
        console.log('Filter data:', formData);
        
        setFilterData(formData);
    };


    const navigate = useNavigate();


    const [selectedSignal, setSelectedSignal] = useState(null);


    const handleEditSignal = (id) => {
        console.log(id);
        navigate(`/signal/${id}`)
    
    };



    const onPageChange = (event) => {

        setPageNumber(event.page + 1);
        setFirst(event.first);
        setPageRows(event.rows)
    };

    useEffect(() => {
        setLoading(true)

        const fetchSignals = signalService.getAll(pageRows, pageNumber,filterData);

        Promise.all([fetchSignals])
            .then(([signalsResult]) => {
                setSignals(signalsResult);
                setLoading(false)

            })
            .catch(error => {
                setLoading(false)

                console.error('Error fetching data:', error);
            });

            window.scroll(0,0);
    }, [pageNumber, pageRows, filterData]);

   


    const getStatusText = (status) => {
        switch (status) {
            case 1:
                return "🔔Получен";
            case 2:
                return "🔀Възложен";
            case 3:
                return "Email";
            case 4:
                return "✅Приключен";
            case 5:
                return "❌Невалиден";

            default:
                return "";
        }
    }; 
    
    const getSourceText = (status) => {
        switch (status) {
            case 1:
                return "🌐";
            case 2:
                return "✉️";
            case 3:
                return "112";

            default:
                return "";
        }
    };



    return (
        <main id="main" className="main relative">

            <RouletteSpinnerOverlay loading={loading} />


        <Filter onFilterChange={handleFilterChange} />
            

            <div className="card small-card p-2 d-flex" >
                                <div className="card-body p-0">
                                    <div className="row d-flex gap-2 p-1">
                                        <div className="w-2 p-0">
                                            <p className="card-text"></p>
                                        </div>
                                        <div className="w-15 p-0">
                                            <p className="card-text fw-bold">Деловоден номер</p>
                                        </div>
                                        <div className="w-15 p-0">
                                            <p className="card-text fw-bold">Дата на подаване</p>
                                        </div>
                                        <div className="w-20 p-0">
                                            <p className="card-text fw-bold">Подател</p>
                                        </div>
                                        <div className="w-10 p-0">
                                            <p className="card-text fw-bold">Статус</p>
                                        </div>
                                        <div className="w-15 p-0">
                                            <p className="card-text fw-bold">Категория</p>
                                        </div>
                                        <div className="w-15 p-0">
                                            <p className="card-text fw-bold">Приключен на</p>
                                        </div>
                                        <div className="w-3 p-0">
                                            <span className="icon fw-bold">Изт.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                {signals && signals.data && signals.data.length > 0 && (
                    <div className="p-fluid">
                        {signals.data.map((signal, index) => (

                            <div className="card small-card p-2 d-flex flex-wrap signal" key={index} onClick={() => handleEditSignal(signal.signal_id)}>
                            
                                <div className="card-body p-0">
                                    <div className="row d-flex gap-2 p-1">
                                        <div className="w-2 p-0">
                                            <p className="card-text">{signal.is_new_count > 0 ? null : "⚠️"}</p>
                                        </div>
                                        <div className="w-15 p-0">
                                            <p className="card-text">{signal.delovoden_number ? `${signal.delovoden_number} от ${signal.delovoden_date}` : `Не е заведен`}</p>
                                        </div>
                                        <div className="w-15  p-0">
                                            <p className="card-text">{signal.random_number} от {new Date(signal.date_received).toLocaleDateString("bg-BG")}</p>
                                        </div>
                                        <div className="w-20  p-0">
                                            <p className="card-text">{signal.name}</p>
                                        </div>
                                        <div className="w-10  p-0">
                                            <p className="card-text">{getStatusText(signal.status)}</p>
                                        </div>
                                        <div className="w-15  p-0">
                                            <p className="card-text">{ categories.find(x => x.categoryId == signal.category_id)?.categoryName}</p>
                                        </div>
                                        <div className="w-15  p-0">
                                            <p className="card-text">{signal.date_end ?  new Date(signal.date_end).toLocaleDateString("bg-BG") : null}</p>
                                        </div>
                                        <div className="w-2  p-0">
                                            <span className="icon">{getSourceText(signal.source)}</span>
                                        </div>
                                        <div className="w-100  p-0">
                                            <hr />
                                            <p className="text-start pl-2"><i>{signal.text}</i></p>
                                        </div>
                                        {/* <div className="w-100">
                                            <input type='button' value={'Преглед'} onClick={() => handleEditSignal(signal)} className="w-15"></input>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}


                {signals && signals.current_page && (
                    <Paginator first={first} rows={pageRows} totalRecords={signals.total} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />
                )}
        </main>


    );




}
