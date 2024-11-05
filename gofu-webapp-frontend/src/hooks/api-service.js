import axios from "axios";

export const getCategories = async () => {
    try {
        const response =  await axios.get('https://n6nhhqnh-5000.use2.devtunnels.ms/categorias');
        return response.data;
    } catch (err) {
      console.error(err);
    } 
  };

export const editProduct = async (data, id) => {
  try {
    const response =  await axios.put(`https://n6nhhqnh-5000.use2.devtunnels.ms/productos/${id}`, data);
    return response.status;
  } catch (err) {
    console.error(err);
    return 400;
  } 
}

export const deleteProduct = async (id) => {
  try {
    const response =  await axios.delete(`https://n6nhhqnh-5000.use2.devtunnels.ms/productos/${id}`);
    return response.status;
  } catch (err) {
    console.error(err);
    return 400;
  } 
}


export const addProduct = async (data) => {
  try {
    const response =  await axios.post(`https://n6nhhqnh-5000.use2.devtunnels.ms/productos/`, data);
    return response.status;
  } catch (err) {
    console.error(err);
    return 400;
  } 
}

export const borrarCategoria = async (id) => {
  try {
    const response =  await axios.delete(`https://n6nhhqnh-5000.use2.devtunnels.ms/categorias/${id}`);
    return response.status;
  } catch (err) {
    console.error(err);
    return 400;
  } 
}


export const agregarCategoria = async (data) => {
  try {
    const response =  await axios.post(`https://n6nhhqnh-5000.use2.devtunnels.ms/categorias/`, data);
    return response.status;
  } catch (err) {
    console.error(err);
    return 400;
  } 
}


export const login = async (data) => {
  try {
    const response =  await axios.post(`https://n6nhhqnh-5000.use2.devtunnels.ms/admin/login/`, data);
    return response.status;
  } catch (err) {
    console.error(err);
    return 400;
  } 
}