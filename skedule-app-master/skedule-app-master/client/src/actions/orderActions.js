import axios from 'axios';

import {
  ADD_ORDER,
   GET_ERRORS,
  CLEAR_ERRORS,
  GET_ORDERS,
  GET_ORDER,
  ORDER_LOADING,
  DELETE_ORDER
} from './types';

//Get Posts
export const getOrders = (date) => dispatch => {
  dispatch(clearErrors());
  dispatch(setOrderLoading());
  axios
    .get(`/api/order/all/${date}`)
    .then(res =>
      dispatch({
        type: GET_ORDERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// //Get Order
export const getOrder = (id) => dispatch => {
  dispatch(setOrderLoading());

  axios
    .get(`/api/order/${id}`)
    .then(res =>
      dispatch({
        type: GET_ORDER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ORDER,
        payload: null
      })
    );
};

//Add Order
export const addOrder = orderData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/order', orderData)
    .then(res =>
      dispatch({
        type: ADD_ORDER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// //Delete Order
export const deleteOrder = id => dispatch => {
  axios
    .delete(`/api/order/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_ORDER,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// //Add Comment
export const addComment = (orderId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/order/comment/${orderId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_ORDER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// //Delete Comment
export const deleteComment = (orderId, commentId) => dispatch => {
  axios
    .delete(`/api/order/comment/${orderId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_ORDER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


//Set loading state
export const setOrderLoading = () => {
  return {
    type: ORDER_LOADING
  }
};

// //Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
};