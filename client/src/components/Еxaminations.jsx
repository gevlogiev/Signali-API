export default function Еxaminations(props) {

 
    return(
        <div className="col-xxl-4 col-md-6">
        <div className="card info-card sales-card">

          {/* <div className="filter">
            <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <li className="dropdown-header text-start">
                <h6>Филтър</h6>
              </li>

              <li><a className="dropdown-item" href="#">Днес</a></li>
              <li><a className="dropdown-item" href="#">Този месец</a></li>
              <li><a className="dropdown-item" href="#">Тази година</a></li>
            </ul>
          </div> */}

          <div className="card-body">
            <h5 className="card-title">Получени сигнали <span>| Днес</span></h5>

            <div className="d-flex align-items-center">
              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                
                <i className="ri-stethoscope-fill"></i>
              </div>
              <div className="ps-3">
                <h6>{props.signalsDay}</h6>
                <span className="pt-1 text-success small fw-bold">12%</span> <span className="pt-2 text-muted small ps-1">повече от вчера</span>

              </div>
            </div>
          </div>

        </div>
      </div>
    )
}