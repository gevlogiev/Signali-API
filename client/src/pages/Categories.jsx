import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as categoryService from "../services/categoryService.js";
import AddModalCategory from "../components/Categories/AddModalCategory.jsx";
import EditModalCategory from "../components/Categories/EditModalCategory.jsx";
import { RouletteSpinnerOverlay } from 'react-spinner-overlay'
import { Button } from 'primereact/button';

import CategoryContext from "../contexts/CategoryContext.jsx";



export default function Categories() {
  const [loading, setLoading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isAddVisible, setIsAddVisible] = useState(false);

  const { categories, handleAddCategory, handleEditCategroy } = useContext(CategoryContext);
 
  const navigate = useNavigate();
  const handleAdd = () => {
    setIsAddVisible(true)
  }

  const handleEdit = (categoryId) => {
    setSelectedCategoryId(categoryId);
    const category = categories.find(category => category.categoryId === categoryId);
    setSelectedCategory(category);
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
        <h1>Категории</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Начало</a></li>
            <li className="breadcrumb-item active">Катеогрии</li>
          </ol>
        </nav>
      </div>
      <section className="section alist">
        <div className="row">
          <div className="col-lg-8">
            <div className="row">Категории</div>
          </div>
          <div className="card">
            <div className="card-body">
              <Button label="+ Добавяне на Категория" raised onClick={handleAdd} />

            </div>
            <table>
              <thead>
                <tr>
                  <th>Категория</th>
                 {categories.categoryParentId?  <th>Подкатегория</th> :  '' }
                  <th>Статус</th>
                  <th>Редакция</th>
                </tr>
              </thead>
              <tbody>
                {categories && categories.map((category) => (
                  <tr key={category.categoryId}>
                    <td>{category.categoryName}</td>
                    {categories.categoryParentId?   <td>{category.categoryParentId}</td> :  '' }  
                    <td>{category.categoryStatus}</td>



                    {/* <td>{1 + 1 ? 'Активна' : 'Неактивна'}</td> */}
                    <td><input type="button" value='Редакция' onClick={() => handleEdit(category.categoryId)} /></td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </section>
      {isEditVisible && <EditModalCategory visible={isEditVisible} handleCloseEditModal={handleCloseEditModal} editUser={handleEditCategroy} setLoading={setLoading} category={selectedCategory} />}
      {isAddVisible && <AddModalCategory visible={isAddVisible} handleCloseAddModal={handleCloseAddModal} addUser={handleAddCategory} setLoading={setLoading} />}
    </main>
  );
}