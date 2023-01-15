import axios from 'axios';

import { CLEAR_CURRENT_PROFILE,
  GET_PROFILE, 
  GET_PROFILES,
  PROFILE_LOADING,
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_ERRORS
} from './types';

//Get current profile
export const getCurrentProfile = ()=>dispatch=>{
  dispatch(setProfileLoading());
  axios.get('/api/users')
    .then(res=>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })      
    )
    .catch(err=>
      dispatch({
        type:GET_PROFILE,
        payload:{}
      })
    );
}

//Create Profile
export const createProfile = (profileData, history)=>dispatch =>{
  axios
    .post('/api/users', profileData)
    .then(res =>history.push('/order'))
    .catch(err=>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}; 

//Get all profiles
export const getProfiles = ()=>dispatch=>{
  dispatch(setProfileLoading());
  dispatch(clearErrors());
  axios
    .get('/api/users/all')
    .then(res=>
      dispatch({
        type : GET_PROFILES,
        payload: res.data
      })  
    )
    .catch(err=>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

//Profile loading
export const setProfileLoading=()=>{
  return{
    type: PROFILE_LOADING
  }
}

//Clear profile
export const clearCurrentProfile=()=>{
  return{
    type: CLEAR_CURRENT_PROFILE
  }
}

// //Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
};