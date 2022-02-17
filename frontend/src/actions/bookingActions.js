import Axios from 'axios';
import { BOOK_EMPTY } from '../constants/bookConstants';
import {
  BOOKING_CREATE_FAIL,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_DETAILS_FAIL,
  BOOKING_DETAILS_REQUEST,
  BOOKING_DETAILS_SUCCESS,
  BOOKING_MINE_LIST_REQUEST,
  BOOKING_MINE_LIST_FAIL,
  BOOKING_MINE_LIST_SUCCESS,
  BOOKING_LIST_REQUEST,
  BOOKING_LIST_SUCCESS,
  BOOKING_LIST_FAIL,
  BOOKING_DELETE_REQUEST,
  BOOKING_DELETE_SUCCESS,
  BOOKING_DELETE_FAIL,
  BOOKING_COMPLETE_REQUEST,
  BOOKING_COMPLETE_SUCCESS,
  BOOKING_COMPLETE_FAIL,
} from '../constants/bookingConstants';

export const createBooking = (booking) => async (dispatch, getState) => {
  dispatch({ type: BOOKING_CREATE_REQUEST, payload: booking });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post('/api/bookings', booking, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: BOOKING_CREATE_SUCCESS, payload: data.booking });
    dispatch({ type: BOOK_EMPTY });
    localStorage.removeItem('bookRooms');
  } catch (error) {
    dispatch({
      type: BOOKING_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsBooking = (bookingId) => async (dispatch, getState) => {
  dispatch({ type: BOOKING_DETAILS_REQUEST, payload: bookingId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/bookings/${bookingId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: BOOKING_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BOOKING_DETAILS_FAIL, payload: message });
  }
};
export const listBookingMine = () => async (dispatch, getState) => {
  dispatch({ type: BOOKING_MINE_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get('/api/bookings/mine', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: BOOKING_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BOOKING_MINE_LIST_FAIL, payload: message });
  }
};
export const listBookings = ({ manager = '' }) => async (dispatch, getState) => {
  dispatch({ type: BOOKING_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/bookings?manager=${manager}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    console.log(data);
    dispatch({ type: BOOKING_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BOOKING_LIST_FAIL, payload: message });
  }
};

export const deleteBooking = (bookingId) => async (dispatch, getState) => {
  dispatch({ type: BOOKING_DELETE_REQUEST, payload: bookingId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/bookings/${bookingId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: BOOKING_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BOOKING_DELETE_FAIL, payload: message });
  }
};
export const completeBooking = (bookingId) => async (dispatch, getState) => {
  dispatch({ type: BOOKING_COMPLETE_REQUEST, payload: bookingId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(
      `/api/bookings/${bookingId}/complete`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: BOOKING_COMPLETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BOOKING_COMPLETE_FAIL, payload: message });
  }
};