export default function Customers(props){
    return(

        <div className="col-xxl-4 col-xl-12">

            <div className="card info-card customers-card">

                <div className="card-body">
                    <h5 className="card-title">Общо сигнали за годината <span>| През текущата година</span></h5>

                    <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-people"></i>
                    </div>
                    <div className="ps-3">
                        <h6>{props.signalsYear}</h6>
                        <span className="pt-1 text-danger small fw-bold">12%</span> <span className="pt-2 text-muted small ps-1">увеличение спрямо предходната година</span>

                    </div>
                    </div>

                </div>
            </div>

      </div>
    )
}