import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as userService from "../services/userService.js";
import * as groupService from "../services/groupService.js";
import AddModalUser from "../components/Users/AddModalUser.jsx";
import EditModalUser from "../components/Users/EditModalUser.jsx";
import { RouletteSpinnerOverlay } from 'react-spinner-overlay'
import { Button } from 'primereact/button';
import GroupContext from "../contexts/GroupContext.jsx";
import UserContext from "../contexts/UserContext.jsx";

export default function Users() {
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isAddVisible, setIsAddVisible] = useState(false);
  // const [users, setUsers] = useState([]);
  const { groups } = useContext(GroupContext);
  const { users, handleAddUser, handleEditUser } = useContext(UserContext);

  const navigate = useNavigate();

  // useEffect(() => {
  //   setLoading(true);

  //   Promise.all([userService.getAll()])
  //     .then(([usersResult, groupsResult]) => {
  //       setUsers(usersResult);

  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       console.error("Error fetching data:", err);
  //       setLoading(false);
  //     });
  // }, []);



  const handleAdd = () => {

    setIsAddVisible(true)
  }

  // const handleAddUser = (newUser) => {

  //   setUsers(prevUsers => [...prevUsers, newUser]);

  // };


  // const handleEditUser = (editUser) => {
  //   setGroups(prevUsers => {

  //     return prevUsers.map(user => {

  //       if (user.userId === editUser.userId) {
  //         return editUser;
  //       } else {
  //         return user;
  //       }
  //     });
  //   });
  // };

  const handleEdit = (userId) => {
    setSelectedUserId(userId);
    const user = users.find(user => user.userId === userId);
    setSelectedUser(user);
    setIsEditVisible(true);
  };

  const handleCloseEditModal = () => {
    setIsEditVisible(false);
  };


  const handleCloseAddModal = () => {
    setIsAddVisible(false);
  };

  return (
    <main id="main" className="main">
      <RouletteSpinnerOverlay loading={loading} />
      <div className="pagetitle">
        <h1>Потребители</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Начало</a></li>
            <li className="breadcrumb-item active">Потребители</li>
          </ol>
        </nav>
      </div>
      <section className="section alist">
        <div className="row">
          <div className="col-lg-8">
            <div className="row">Потребители</div>
          </div>
          <div className="card">
            <div className="card-body">
              <Button label="+ Добавяне на потребител" raised onClick={handleAdd} />

            </div>
            <table>
              <thead>
                <tr>
                  <th>Име</th>
                  <th>Потребителско име</th>
                  <th>Група</th>
                  <th>Статус</th>
                  <th>Редакция</th>
                </tr>
              </thead>
              <tbody>
                {users && groups && users.map((user) => (
                  <tr key={user.userId}>
                    <td>{user.userName}</td>
                    <td>{user.userRealName}</td>
                 
                    <td>
                      {user.groupIds && groups ?
                        user.groupIds.split(',').map(groupId =>
                          groups.find(group => group.groupId === parseInt(groupId))?.groupName
                        ).join(', ')
                        :
                        ''}
                    </td>
                    <td>{user.activeStatus ? 'Активна' : 'Неактивна'}</td>
                    <td><input type="button" value='Редакция' onClick={() => handleEdit(user.userId)} /></td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </section>
      {isEditVisible && <EditModalUser visible={isEditVisible} handleCloseEditModal={handleCloseEditModal} editUser={handleEditUser} setLoading={setLoading} groups={groups} user={selectedUser} />}
      {isAddVisible && <AddModalUser visible={isAddVisible} handleCloseAddModal={handleCloseAddModal} addUser={handleAddUser} setLoading={setLoading} groups={groups} />}
    </main>
  );
}