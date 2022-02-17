import Axios from 'axios';
import {
  HOTEL_CREATE_FAIL,
  HOTEL_CREATE_REQUEST,
  HOTEL_CREATE_SUCCESS,
  HOTEL_DETAILS_FAIL,
  HOTEL_DETAILS_REQUEST,
  HOTEL_DETAILS_SUCCESS,
  HOTEL_LIST_FAIL,
  HOTEL_LIST_REQUEST,
  HOTEL_LIST_SUCCESS,
  HOTEL_UPDATE_REQUEST,
  HOTEL_UPDATE_SUCCESS,
  HOTEL_UPDATE_FAIL,
  HOTEL_DELETE_REQUEST,
  HOTEL_DELETE_FAIL,
  HOTEL_DELETE_SUCCESS,
  HOTEL_PROVINCE_LIST_SUCCESS,
  HOTEL_PROVINCE_LIST_REQUEST,
  HOTEL_PROVINCE_LIST_FAIL,
  HOTEL_REVIEW_CREATE_REQUEST,
  HOTEL_REVIEW_CREATE_SUCCESS,
  HOTEL_REVIEW_CREATE_FAIL,
} from '../constants/hotelConstants';

export const listHotels = ({
  manager = '',
  name = '',
  province = '',
  booking = '',
  min = 0,
  max = 0,
  rating = 0,
}) => async (dispatch) => {
  dispatch({
    type: HOTEL_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `/api/hotels?manager=${manager}&name=${name}&province=${province}&min=${min}&max=${max}&rating=${rating}&booking=${booking}`
    );
    dispatch({ type: HOTEL_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: HOTEL_LIST_FAIL, payload: error.message });
  }
};
export const listHotelProvinces = () => async (dispatch) => {
  dispatch({
    type: HOTEL_PROVINCE_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/hotels/provinces`);
    dispatch({ type: HOTEL_PROVINCE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: HOTEL_PROVINCE_LIST_FAIL, payload: error.message });
  }
};
export const detailsHotel = (hotelId) => async (dispatch) => {
  dispatch({ type: HOTEL_DETAILS_REQUEST, payload: hotelId });
  try {
    const { data } = await Axios.get(`/api/hotels/${hotelId}`);
    dispatch({ type: HOTEL_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: HOTEL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createHotel = () => async (dispatch, getState) => {
  dispatch({ type: HOTEL_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      '/api/hotels',
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: HOTEL_CREATE_SUCCESS,
      payload: data.hotel,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: HOTEL_CREATE_FAIL, payload: message });
  }
};
export const updateHotel = (hotel) => async (dispatch, getState) => {
  dispatch({ type: HOTEL_UPDATE_REQUEST, payload: hotel });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/hotels/${hotel._id}`, hotel, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: HOTEL_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: HOTEL_UPDATE_FAIL, error: message });
  }
};
export const deleteHotel = (hotelId) => async (dispatch, getState) => {
  dispatch({ type: HOTEL_DELETE_REQUEST, payload: hotelId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/hotels/${hotelId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: HOTEL_DELETE_SUCCESS, payload:data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: HOTEL_DELETE_FAIL, payload: message });
  }
};
export const createReview = (hotelId, review) => async (
  dispatch,
  getState
) => {
  dispatch({ type: HOTEL_REVIEW_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/hotels/${hotelId}/reviews`,
      review,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: HOTEL_REVIEW_CREATE_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: HOTEL_REVIEW_CREATE_FAIL, payload: message });
  }
};