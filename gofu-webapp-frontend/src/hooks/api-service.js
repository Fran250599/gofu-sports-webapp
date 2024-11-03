import axios from "axios";

export const getCategories = async () => {
    try {
        const response =  await axios.get('http://localhost:5000/categorias');
        return response.data;
    } catch (err) {
      console.error(err);
    } 
  };

export const editProduct = async (data, id) => {
  try {
    const response =  await axios.put(`http://localhost:5000/productos/${id}`, data);
    return response.status;
  } catch (err) {
    console.error(err);
    return 400;
  } 
}

export const deleteProduct = async (id) => {
  try {
    const response =  await axios.delete(`http://localhost:5000/productos/${id}`);
    return response.status;
  } catch (err) {
    console.error(err);
    return 400;
  } 
}


export const addProduct = async (data) => {
  try {
    const response =  await axios.post(`http://localhost:5000/productos/`, data);
    return response.status;
  } catch (err) {
    console.error(err);
    return 400;
  } 
}