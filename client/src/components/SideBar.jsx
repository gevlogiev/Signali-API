import { NavLink } from 'react-router-dom';
import React , {useContext, useState} from 'react';
import AuthContext from '../contexts/authContext';

export default function SideBar() {
    
    const [isCollapsed, setIsCollapsed] = useState(true);
    const { auth } = useContext(AuthContext);

    const handleToggleCollapse = () => {
      
      setIsCollapsed(!isCollapsed);
    };

    const handleCloseCollapse = () => {
      setIsCollapsed(true);
    };

    const currentDate = new Date();
    const expDate = new Date(auth.expDate);


    if (!auth.accessToken) {
      return null; // If the user is not authenticated, return null (nothing)
    }

    
   if (expDate <= currentDate) {

      return null;
    }



    return (
        <aside id="sidebar" className="sidebar">

            <ul className="sidebar-nav" id="sidebar-nav">

              <li className="nav-item">
                <NavLink to="/dashboard" className="nav-link collapsed" onClick={handleCloseCollapse }>
                    <i className="bi bi-grid"></i>
                    <span>Начало</span>
                </NavLink>
              </li>

            

              {/* <li className="nav-heading">Pages</li> */}

              <li className="nav-item">
                <NavLink to="/signals" className="nav-link collapsed" onClick={handleCloseCollapse}>
                    <i className="bi bi-person"></i>
                    <span>Сигнали</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/users" className="nav-link collapsed" onClick={handleCloseCollapse }>
                  <i className="bi bi-question-circle"></i>
                  <span>Потребители</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/groups" className="nav-link collapsed" onClick={handleCloseCollapse }>
                  <i className="bi bi-envelope"></i>
                  <span>Групи</span>
                </NavLink>
              </li>  
              
              
              <li className="nav-item">
                <NavLink to="/categories" className="nav-link collapsed" onClick={handleCloseCollapse }>
                  <i className="bi bi-envelope"></i>
                  <span>Категории</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/onDuty" className="nav-link collapsed" onClick={handleCloseCollapse }> 
                  <i className="bi bi-card-list"></i>
                  <span>Дежурен</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/recipes" className="nav-link collapsed" onClick={handleCloseCollapse }> 
                  <i className="bi bi-card-list"></i>
                  <span>Справки</span>
                </NavLink>
              </li>

              <li className="nav-heading">------------------------------------------</li>

              <li className="nav-item">
                <NavLink to="/shedule" className="nav-link collapsed" onClick={handleCloseCollapse }> 
                  <i className="bi bi-card-list"></i>
                  <span>Запази час</span>
                </NavLink>
              </li>

              <li className="nav-heading">------------------------------------------</li>

              {/* <li className="nav-item">
                <a className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
                  <i className="bi bi-layout-text-window-reverse"></i><span>Настройки</span><i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                  <li>
                    <NavLink to="/mkb" className="nav-link collapsed">
                      <i className="bi bi-circle"></i><span>Списък МКБ</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/medicaments" className="nav-link collapsed">
                      <i className="bi bi-circle"></i><span>Списък лекарства</span>
                    </NavLink>
                  </li>
                </ul>
              </li> */}

              <li className="nav-item">
                <a
                  className={`nav-link ${isCollapsed ? 'collapsed' : ''}`}
                  data-bs-target="#tables-nav"
                  data-bs-toggle="collapse"
                  href="#"
                  onClick={handleToggleCollapse}
                >
                  <i className="bi bi-layout-text-window-reverse"></i>
                  <span>Настройки</span>
                  <i className={`bi bi-chevron-down ms-auto ${isCollapsed ? 'collapsed' : ''}`}></i>
                </a>
                <ul
                  id="tables-nav"
                  className={`nav-content collapse ${isCollapsed ? '' : 'show'}`}
                  data-bs-parent="#sidebar-nav"
                >
                  <li>
                    <NavLink to="/mkb" className="nav-link collapsed">
                      <i className="bi bi-circle"></i>
                      <span>Настройки на системата</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/medicaments" className="nav-link collapsed">
                      <i className="bi bi-circle"></i>
                      <span>Настройки за справки</span>
                    </NavLink>
                  </li>
                </ul>
              </li>

              

            </ul>

          </aside>
    )
}