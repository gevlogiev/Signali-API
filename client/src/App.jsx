import './App.css'

import { useState } from "react"
import Header from "./components/Header"
import SideBar from "./components/SideBar"
import DashBoard from "./pages/DashBoard";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signals from "./pages/Signals_OLD";
import Users from "./pages/Users";
import Groups from "./pages/Groups";
import Shedule from "./pages/Shedule";
import OnDuty from "./pages/OnDuty";
import Login from "./auth/Login"
import { AuthProvider } from './contexts/AuthContext';
import AuthGuard from "./components/AuthGuard";
import HeaderWeb from "./components/HeaderWeb";
import Logout from "./auth/Logout";
import HomePage from "./pages/HomePage";
import LazyLoadDemo from "./pages/Signals_";
import Signals1 from "./pages/Signals_";
import SignalEdit from "./pages/SignalEdit";
import Page404 from "./pages/Page404";
import { GroupProvider } from "./contexts/GroupContext";
import { UserProvider } from "./contexts/UserContext";
import { CategoryProvider } from "./contexts/CategoryContext";
import Categories from "./pages/Categories";
import Tracking from './pages/Tracking';





function App() {


  const [showMenu, setShowMenu] = useState(1);

  function handleShowMenu() {
    setShowMenu(!showMenu);
  }


  return (





    <AuthProvider>
      <GroupProvider>
        <UserProvider>
          <CategoryProvider>


            <div className={`${showMenu ? '' : 'toggle-sidebar'}`}>
              <Header hsmenu={handleShowMenu} />
              <HeaderWeb />
              <SideBar />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/tracking" element={<Tracking />} />


                <Route element={<AuthGuard />}>
                  <Route path="/dashboard" element={<DashBoard />} />
                  <Route path="/signals" element={<Signals1 />} />
                  <Route path="signal/:id?" element={<SignalEdit />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/groups" element={<Groups />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/onDuty" element={<OnDuty />} />
                  <Route path="/shedule" element={<Shedule />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/*" element={<Page404 />} />
                </Route>
              </Routes>
            </div>
          </CategoryProvider>
        </UserProvider>
      </GroupProvider>
    </AuthProvider>

  )
}

export default App
