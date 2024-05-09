import * as signalService from "../services/signalService";
import { useEffect, useState } from "react";

export default function Signals() {
    const [signals, setSignals] = useState([]);

    useEffect(() => {
        signalService.getAll()
            .then(result => setSignals(result))
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        
        new simpleDatatables.DataTable("#signalTable", {
            pagination: true,
            sortable: true
        });
    }, [signals]);

    return (
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>Data Tables</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li className="breadcrumb-item">Tables</li>
                        <li className="breadcrumb-item active">Data</li>
                    </ol>
                </nav>
            </div>

            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Datatables</h5>
                                <p>Add lightweight datatables to your project with using the <a href="https://github.com/fiduswriter/Simple-DataTables" target="_blank">Simple DataTables</a> library. Just add <code>.datatable</code> class name to any table you wish to convert to a datatable.</p>
                                <table id="signalTable" className="table datatable">
                                    <thead>
                                        <tr>
                                            <th>Име</th>
                                            <th>Email</th>
                                            <th>Телефон</th>
                                            <th>Адрес</th>
                                            <th data-type="date" data-format="YYYY/DD/MM">Текст</th>
                                            <th>Номер</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {signals.map(signal => (
                                            <tr key={signal.id}>
                                                <td>{signal.name}</td>
                                                <td>{signal.email}</td>
                                                <td>{signal.phone}</td>
                                                <td>{signal.location}</td>
                                                <td>{signal.text}</td>
                                                <td>{signal.random_number}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <script src="./../lib/simple-datatables.js"></script>
        </main>
    );
}
