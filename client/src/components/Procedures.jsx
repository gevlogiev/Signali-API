export default function Procedures(props){
    return(
        <div className="col-xxl-4 col-md-6">
                      <div className="card info-card revenue-card">
                        
                        <div className="card-body">
                          <h5 className="card-title">Приключени сигнали <span>| Предходен месец</span></h5>

                          <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                              <i className="ri-service-line"></i>
                            </div>
                            <div className="ps-3">
                              <h6>{props.signalsMonth}</h6>
                              <span className="pt-1 text-success small fw-bold">8%</span> <span className="pt-2 text-muted small ps-1">увеличение</span>

                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
    )
}