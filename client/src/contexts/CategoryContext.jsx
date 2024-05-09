import React, { createContext, useState, useEffect } from 'react';
import * as categoryService from "../services/categoryService.js";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        categoryService.getAll()
            .then(result => {
                setCategories(result);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching Category:", err);
                setLoading(false);
            });
    }, []);



    const handleAddCategory = (newCategory) => {

        setCategories(prevCategories => [...prevCategories, newCategory]);

    };


    const handleEditCategory = (editCategory) => {
        setCategories(prevCategories => {

            return prevCategories.map(category => {

                if (category.categoryId === editCategory.categoryId) {
                    return editCategory;
                } else {
                    return category;
                }
            });
        });
    };



    return (
        <CategoryContext.Provider value={{ categories, handleAddCategory, handleEditCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryContext;