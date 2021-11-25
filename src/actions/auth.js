import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

 export const login = (formData, history) => async (dispatch) => {
     try {
         const {data} = await api.login(formData)

          dispatch({type: AUTH, data })
        history.push('/')
     } catch (error) {
         console.error(error)
     }
 }

 export const signup = (formData, history) => async (dispatch) => {
    try {
        const {data} = await api.signup(formData)

        dispatch({type: AUTH, data })
       history.push('/')
    } catch (error) {
        console.error(error)
    }
}