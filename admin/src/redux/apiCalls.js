// import { loginFailure, loginStart, loginSuccess } from "./userRedux"
// import {
//     getProductStart,
//     getProductSuccess,
//     getProductFailure, 
//     deleteProductStart, 
//     deleteProductSuccess,
//     deleteProductFailure, 
//     updateProductStart,
//     updateProductSuccess,
//     updateProductFailure,
//     addProductStart,
//     addProductSuccess,
//     addProductFailure 
// } from "./productRedux";
// import { publicRequest, userRequest } from "../requestMethods";
// export const login = async (dispatch, user)=> {
//     dispatch(loginStart());
//     try {
//         const res = await publicRequest.post('/user/login', user);
//         dispatch(loginSuccess(res.data))
//     } catch (error) {
//         dispatch(loginFailure())
//     }
// }


// export const getProducts = async (dispatch) =>{
//     dispatch(getProductStart());
//     try {
//         const res = await publicRequest.get('/product/all');
//         dispatch(getProductSuccess(res.data.data))
//     } catch (error) {
//         dispatch(getProductFailure())
//     }}

// export const deleteProduct = async (dispatch, id) =>{
//     dispatch(deleteProductStart());
//     try {
//         dispatch(deleteProductSuccess(id))
//         await userRequest.delete(`/product/delete/${id}`);
//     } catch (error) {
//         dispatch(deleteProductFailure())
//     }}

// export const updateProduct = async (dispatch, product, id) =>{
//     dispatch(updateProductStart());
//     try {
//         dispatch(updateProductSuccess({product,id}))
//         await userRequest.patch(`/product/update/${id}`);
//     } catch (error) {
//         dispatch(updateProductFailure())
//     }}

// export const addProduct = async (dispatch,product) =>{
//     dispatch(addProductStart());
//     console.log(product)
//     try {
//         const res = await userRequest.post(`/product/add`,product);
//         dispatch(addProductSuccess(res.data.data))
//     } catch (error) {
//         dispatch(addProductFailure())
//     }}