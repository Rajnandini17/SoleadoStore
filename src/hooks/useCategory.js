import {useState, useEffect} from 'react';
import axios from 'axios';

export default function useCategory() {
    const [categories, setCategories] = useState([]);

    //get category
    const getCategories = async () => {
            try {
                const auth = JSON.parse(localStorage.getItem('auth'));
                const config = {
                  headers: {
                    Authorization: `Bearer ${auth.token}`, 
                  },
                };
                
                const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`, config);
                setCategories(data?.category)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getCategories();
    }, []);
    return categories;
};