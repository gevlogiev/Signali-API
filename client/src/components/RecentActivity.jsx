export default function RecentActivity(){
    return(
            <div className="card">
                

                <div className="card-body">
                    <h5 className="card-title">Последно обработени сигнали<span></span></h5>

                    <div className="activity">

                        <div className="activity-item d-flex">
                            <div className="activite-label">32 мин</div>
                            <i className='bi bi-circle-fill activity-badge text-success align-self-start'></i>
                            <div className="activity-content">
                                Преглед д-р Цветков <a href="#" className="fw-bold text-dark">по здравна каса</a> 
                            </div>
                        </div>

                        <div className="activity-item d-flex">
                            <div className="activite-label">56 мин</div>
                            <i className='bi bi-circle-fill activity-badge text-danger align-self-start'></i>
                            <div className="activity-content">
                                Преглед д-р Цветков <a href="#" className="fw-bold text-dark">частен преглед</a>
                            </div>
                        </div>

                        <div className="activity-item d-flex">
                            <div className="activite-label">2 часа</div>
                            <i className='bi bi-circle-fill activity-badge text-primary align-self-start'></i>
                            <div className="activity-content">
                                Преглед д-р Колев <a href="#" className="fw-bold text-dark">по здравна каса</a> 
                            </div>
                        </div>

                        <div className="activity-item d-flex">
                            <div className="activite-label">1 ден</div>
                            <i className='bi bi-circle-fill activity-badge text-info align-self-start'></i>
                            <div className="activity-content">
                                Преглед д-р Пенева <a href="#" className="fw-bold text-dark">частен преглед</a>
                            </div>
                        </div>

                        <div className="activity-item d-flex">
                            <div className="activite-label">2 дни</div>
                            <i className='bi bi-circle-fill activity-badge text-warning align-self-start'></i>
                            <div className="activity-content">
                                Преглед д-р Цветков <a href="#" className="fw-bold text-dark">по здравна каса</a> 
                            </div>
                        </div>

                        <div className="activity-item d-flex">
                            <div className="activite-label">28 дни</div>
                            <i className='bi bi-circle-fill activity-badge text-muted align-self-start'></i>
                            <div className="activity-content">
                                Преглед д-р Маринов <a href="#" className="fw-bold text-dark">по здравна каса</a> 
                            </div>
                        </div>

                        <div className="activity-item d-flex">
                            <div className="activite-label">32 дни</div>
                            <i className='bi bi-circle-fill activity-badge text-info align-self-start'></i>
                            <div className="activity-content">
                                Преглед д-р Пенева <a href="#" className="fw-bold text-dark">частен преглед</a>
                            </div>
                        </div>

                        <div className="activity-item d-flex">
                            <div className="activite-label">40 дни</div>
                            <i className='bi bi-circle-fill activity-badge text-warning align-self-start'></i>
                            <div className="activity-content">
                                Преглед д-р Цветков <a href="#" className="fw-bold text-dark">по здравна каса</a> 
                            </div>
                        </div>

                        <div className="activity-item d-flex">
                            <div className="activite-label">42 дни</div>
                            <i className='bi bi-circle-fill activity-badge text-muted align-self-start'></i>
                            <div className="activity-content">
                                Преглед д-р Маринов <a href="#" className="fw-bold text-dark">по здравна каса</a> 
                            </div>
                        </div>

                    </div>

                </div>

            </div>
    )
}