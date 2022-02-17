import Axios from 'axios';
import {
  BOOK_ADD_ROOM,
  BOOK_REMOVE_ROOM,
  BOOK_SAVE_HOTEL_RESERVATION,
  BOOK_SAVE_MORE_INFORMATION,
  BOOK_ADD_ROOM_FAIL,
} from '../constants/bookConstants';

export const addToBook = (hotelId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/hotels/${hotelId}`);
  const {
    book: { bookRooms },
  } = getState();
  if (bookRooms.length > 0 && data.manager._id !== bookRooms[0].manager._id) {
    dispatch({
      type: BOOK_ADD_ROOM_FAIL,
      payload: `Can't Add To Book. Buy only from ${bookRooms[0].manager.manager.name} in this booking`,
    });
  } else {
    dispatch({
      type: BOOK_ADD_ROOM,
      payload: {
        name: data.name,
        image: data.image,
        image1: data.image1,
        image2: data.image2,
        image3: data.image3,
        price: data.price,
        countInStock: data.countInStock,
        hotel: data._id,
        manager: data.manager,
        qty,
      },
    });
    localStorage.setItem(
      'bookRooms',
      JSON.stringify(getState().book.bookRooms)
    );
  }
};
export const removeFromBook = (hotelId) => (dispatch, getState) => {
  dispatch({ type: BOOK_REMOVE_ROOM, payload: hotelId });
  localStorage.setItem('bookRooms', JSON.stringify(getState().book.bookRooms));
};
export const saveHotelReservation = (data) => (dispatch) => {
  dispatch({ type: BOOK_SAVE_HOTEL_RESERVATION, payload: data });
  localStorage.setItem('hotelReservation', JSON.stringify(data));
};
export const saveMoreInformation = (data) => (dispatch) => {
  dispatch({ type: BOOK_SAVE_MORE_INFORMATION, payload: data });
  localStorage.setItem('moreInformation', JSON.stringify(data));
};