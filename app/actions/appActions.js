import {AsyncStorage} from 'react-native';
import axios from "axios";
import {disconnect} from '../socket';
import {instance, scriptsDirectory} from "../constants";

export function authenticateStudent(username, password) {
    return dispatch => {
        dispatch({type: 'AUTHENTICATE_STUDENT'});
        instance.post("students/authenticate", {username, password}, (response) => {
            if (response.status === 200 && response.data.success) {
                if (response.data.authenticated) {
                    try {
                        AsyncStorage.setItem('@RIDGE-Student:auth_token', response.data.token, () => {
                            dispatch({type: 'AUTHENTICATE_STUDENT_FULFILLED', payload: response.data.success});
                            dispatch(readStudent());
                        });
                    } catch (error) {
                        dispatch({type: 'AUTHENTICATE_STUDENT_REJECTED', payload: error});
                    }
                } else {
                    dispatch({type: 'AUTHENTICATE_STUDENT_DENIED', payload: false});
                }
            } else {
                dispatch({type: 'AUTHENTICATE_STUDENT_REJECTED', payload: response.data.reason});
            }
        });
    };
}

export function readStudent() {
    return dispatch => {
        dispatch({type: 'READ_STUDENT'});
        try {
            AsyncStorage.getItem('@RIDGE-Student:auth_token', (err, token) => {
                if (token !== null) {
                  console.log(token);
                    axios.post("http://194.73.225.206:8081/api/students/app-read-token", {token}, (response) => {
                      console.log(response);
                        if (response.status === 200 && response.data.success) {
                            if (response.data.empty) {
                                dispatch({type: 'READ_STUDENT_EMPTY', payload: false});
                            } else {
                                dispatch(getHouseConfig(response.data.student._id));
                                dispatch({
                                    type: 'READ_STUDENT_FULFILLED',
                                    payload: response.data.student
                                });
                            }
                        } else {
                            dispatch({type: 'READ_STUDENT_REJECTED', payload: response.data.reason});
                        }
                    }).catch((err) => {
                      console.log(err);
                    });
                } else {
                    dispatch({type: 'READ_STUDENT_EMPTY', payload: false});
                }
            });
        } catch (error) {
            dispatch({type: 'READ_STUDENT_REJECTED', payload: error});
        }
    };
}

export function readStudentMajor(id) {
    return dispatch => {
        dispatch({type: 'READ_STUDENT_MAJOR'});
        try{
        AsyncStorage.getItem('@RIDGE-Student:auth_token', (err, token) => {
            if(token !== null){
              instance.get("students/app-read", {params: {id, minor: false}, headers: { 'X-Access-Token': token}}, (response) => {
                  if (response.status === 200 && response.data.success) {
                      dispatch({type: 'READ_STUDENT_MAJOR_FULFILLED', payload: response.data.student});
                  } else {
                      dispatch({type: 'READ_STUDENT_MAJOR_REJECTED', payload: response.data.reason});
                  }
              });
            }
            else{
              dispatch({type: 'READ_STUDENT_MAJOR_REJECTED', payload: err});
            }
          });
        }
        catch(error){
          dispatch({type: 'READ_STUDENT_MAJOR_REJECTED', payload: error});
        }
    };
}

export function readStudentMinor(id) {
  return dispatch => {
      dispatch({type: 'READ_STUDENT_MINOR'});
      try{
      AsyncStorage.getItem('@RIDGE-Student:auth_token', (err, token) => {
          if(token !== null){
            instance.get("students/app-read", {params: {id, minor: true}, headers: { 'X-Access-Token': token}}, (response) => {
                if (response.status === 200 && response.data.success) {
                    dispatch({type: 'READ_STUDENT_MINOR_FULFILLED', payload: response.data.student});
                } else {
                    dispatch({type: 'READ_STUDENT_MINOR_REJECTED', payload: response.data.reason});
                }
            });
          }
          else{
            dispatch({type: 'READ_STUDENT_MINOR_REJECTED', payload: err});
          }
        });
      }
      catch(error){
        dispatch({type: 'READ_STUDENT_MINOR_REJECTED', payload: error});
      }
  };
}

export function readLocations(id) {
    return dispatch => {
        dispatch({type: 'READ_LOCATIONS'});
        try{
        AsyncStorage.getItem('@RIDGE-Student:auth_token', (err, token) => {
            if(token !== null){
              instance.get("locations/app-read-locations", {params : {id}, headers: { 'X-Access-Token': token}}, (response) => {
                  if (response.status === 200 && response.data.success) {
                      dispatch({type: 'READ_LOCATIONS_FULFILLED', payload: response.data.locations});
                  } else {
                      dispatch({type: 'READ_LOCATIONS_REJECTED', payload: response.data.reason});
                  }
              });
            }
            else{
              dispatch({type: 'READ_LOCATIONS_REJECTED', payload: err});
            }
          });
        }
        catch(error){
          dispatch({type: 'READ_LOCATIONS_REJECTED', payload: error});
        }
    };
}

export function updateLocation(id, locationID) {
    return dispatch => {
        dispatch({type: 'UPDATE_LOCATION'});
        try{
        AsyncStorage.getItem('@RIDGE-Student:auth_token', (err, token) => {
            if(token !== null){
              instance.get("students/app-update-location", {params: {id, locationID}, headers: { 'X-Access-Token': token}}, (response) => {
                  if (response.status === 200 && response.data.success) {
                      dispatch({type: 'UPDATE_LOCATION_FULFILLED', payload: response.data.student});
                  } else {
                      dispatch({type: 'UPDATE_LOCATION_REJECTED', payload: response.data.reason});
                  }
              });
            }
            else{
              dispatch({type: 'UPDATE_LOCATION_REJECTED', payload: err});
            }
          });
        }
        catch(error){
          dispatch({type: 'UPDATE_LOCATION_REJECTED', payload: error});
        }
    };
}


export function logout() {
    return dispatch => {
        dispatch({type: 'LOGOUT_STUDENT'});
        try {
            AsyncStorage.removeItem('@RIDGE-Student:auth_token', () => {
                disconnect();
                dispatch({type: 'LOGOUT_STUDENT_FULFILLED', payload: true});
            });
        } catch (error) {
            dispatch({type: 'LOGOUT_STUDENT_REJECTED', payload: error});
        }
    };
}

export function getHouseConfig(id) {
    return dispatch => {
      dispatch({type: 'GET_HOUSE_CONFIG'});
        try{
        AsyncStorage.getItem('@RIDGE-Student:auth_token', (err, token) => {
            if(token !== null){
              instance.get("students/app-get-config", {params: {id}, headers: { 'X-Access-Token': token}}, response => {
                  if (response.status === 200 && response.data.success) {
                      dispatch({type: 'GET_HOUSE_CONFIG_FULFILLED', payload: response.data.config});
                  } else {
                      dispatch({type: 'GET_HOUSE_CONFIG_REJECTED', payload: response.data.reason});
                  }
              });
            }
            else{
              dispatch({type: 'GET_HOUSE_CONFIG_REJECTED', payload: err});
            }
          });
        }
        catch(error){
          dispatch({type: 'GET_HOUSE_CONFIG_REJECTED', payload: error});
        }
    };
}

export function readCalendar(id) {
    return dispatch => {
      dispatch({type: 'READ_CALENDAR'});
        try{
        AsyncStorage.getItem('@RIDGE-Student:auth_token', (err, token) => {
            if(token !== null){
              instance.get("calendar/app-read-calendar", {params: {id}, headers: { 'X-Access-Token': token}}, response => {
                  if (response.status === 200 && response.data.success) {
                      dispatch({type: 'READ_CALENDAR_FULFILLED', payload: response.data.events});
                  } else {
                      dispatch({type: 'READ_CALENDAR_REJECTED', payload: response.data.reason});
                  }
              });
            }
            else{
              dispatch({type: 'READ_CALENDAR_REJECTED', payload: err});
            }
          });
        }
        catch(error){
          dispatch({type: 'READ_CALENDAR_REJECTED', payload: error});
        }
    };
}
