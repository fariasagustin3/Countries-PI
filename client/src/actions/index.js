import axios from 'axios';
import {
  GET_ALL_COUNTRIES,
  FILTER_BY_CONTINENT,
  FILTER_BY_ACTIVITY,
  ORDER_BY_NAME,
  GET_ACTIVITIES,
  COUNTRY_BY_NAME,
  POST_ACTIVITY,
  GET_DETAILS,
  ORDER_BY_POPULATION,
  CLEAN_DETAILS
} from './actionTypes';

export function getAllCountries() {
  return async function(dispatch) {
    const countries = await axios(`/countries`)
    return dispatch({ type: GET_ALL_COUNTRIES, payload: countries.data })
  }
}

export function filterByContinent(payload) {
  return {
    type: FILTER_BY_CONTINENT,
    payload
  }
}

export function filterByActivity(payload) {
  return {
    type: FILTER_BY_ACTIVITY,
    payload
  }
}

export function cleanDetails(payload) {
  return {
    type: CLEAN_DETAILS,
    payload
  }
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload
  }
}

export function orderByPopulation(payload) {
  return {
    type: ORDER_BY_POPULATION,
    payload
  }
}

export function getActivities() {
  return async function(dispatch) {
    const activities = await axios.get(`/activities`)
    return dispatch({ type: GET_ACTIVITIES, payload: activities.data })
  }
}

export function countryByName(name) {
  return async function(dispatch) {
    const country = await axios.get(`/countries/name?name=${name}`);
    return dispatch({ type: COUNTRY_BY_NAME, payload: country.data })
  }
}

export function postActivity(payload) {
  return async function(dispatch) {
    const activities = await axios.post(`/activities`, payload)
    return activities;
  }
}

export function getDetails(id) {
  return async function(dispatch) {
    const country = await axios.get(`/countries/${id}`)
    return dispatch({ type: GET_DETAILS, payload: country.data })
  }
}