import { Link } from 'react-router-dom';
import { useContext } from "react";
import AuthContext from "../contexts/authContext";
import UserProfile from './UserProfile';

export default function Header(props) {

  const { auth } = useContext(AuthContext);
console.log(auth);
  const name = auth.name;
  const role = auth.userRole;

  const groupMember = auth.groupMember;
  const groupNames = groupMember ? groupMember.map(groups => groups.name).join(', ') : '';

  const currentDate = new Date();
  const expDate = new Date(auth.expDate);


  
  if (!auth.accessToken) {
    return null;

  }

  if (expDate <= currentDate) {
    return null;
  }


 

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">

      <div className="d-flex align-items-center justify-content-between">
        <a href="/dashboard" className="logo d-flex align-items-center">
          {/* <img src="assets/img/logo.png" alt="" /> */}
          <p>Signali LOGO  (MUNICIPALITY)</p>
        </a>
        <i className="bi bi-list toggle-sidebar-btn" onClick={props.hsmenu}></i>
      </div>



      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">

          <li className="nav-item d-block d-lg-none">
            <a className="nav-link nav-icon search-bar-toggle " href="#">
              <i className="bi bi-search"></i>
            </a>
          </li>


          <li className="nav-item dropdown pe-3">

            <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
              <span><UserProfile username={name} /></span>
              {/* <img src={`assets/img/${user_img}`} alt="Profile" className="rounded-circle" /> */}
              {/* <span className="d-none d-md-block dropdown-toggle ps-2">{name}</span> */}
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>{name}</h6>
                <span>{groupNames}</span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>


              <li>
                <Link to="/logout" className="dropdown-item d-flex align-items-center">
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Изход</span>
                </Link>
              </li>

            </ul>
          </li>

        </ul>
      </nav>

    </header>
  )
}