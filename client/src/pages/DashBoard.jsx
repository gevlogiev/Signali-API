import Еxaminations from "../components/Еxaminations";
import Procedures from "../components/Procedures";
import Customers from "../components/Customers";
import RecentCreatedDocuments from "../components/RecentCreatedDocuments";
import RecentActivity from "../components/RecentActivity";
import { useEffect, useState } from "react";
import * as dashboardService from "../services/dashboardService"
import { RouletteSpinnerOverlay } from 'react-spinner-overlay'

export default function DashBoard() {
    const [loading, setLoading] = useState(false);
    const [dashboardData, setDashboardData] = useState({
        signalsDay: 0,
        signalsMonth: 0,
        signalsYear: 0,
        lastFiveSignals: [],
    });

    useEffect(() => {
        setLoading(true)
        dashboardService.getAll()
            .then(result => {

                setDashboardData(result)
                setLoading(false)

            })


            .catch(err => console.log(err))
    }, []);



    return (
        <main id="main" className="main">
            <RouletteSpinnerOverlay loading={loading} />
            <div className="pagetitle">
                <h1>Система за сигнали към община Провадия</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Начало</a></li>
                        {/* <li className="breadcrumb-item active">Начало</li> */}
                    </ol>
                </nav>
            </div>

            <section className="section dashboard">

                <div className="row">

                    <div className="col-lg-8">
                        <div className="row">
                            <Еxaminations signalsDay={dashboardData.signalsDay} />
                            <Procedures signalsMonth={dashboardData.signalsMonth} />
                            <Customers signalsYear={dashboardData.signalsYear} />
                            {/* <Reports /> */}
                            <RecentCreatedDocuments lastFiveSignals={dashboardData.lastFiveSignals} />
                        </div>
                    </div>


                    <div className="col-lg-4">
                        <RecentActivity />
                    </div>

                </div>

            </section>

        </main>
    )
}