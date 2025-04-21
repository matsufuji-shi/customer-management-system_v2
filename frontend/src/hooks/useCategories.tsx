import { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const useCategories = () => {
    const [categoryList, setCategoryList] = useState([]);

    const refreshCategories = () => {
        apiService.getUsers().then(response => {
            setCategoryList(response.data);
        });
    };

    useEffect(() => {
        refreshCategories();
    }, []);

    return { categoryList, refreshCategories };
};

export default useCategories;
