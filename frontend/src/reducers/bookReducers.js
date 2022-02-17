import {
  BOOK_ADD_ROOM,
  BOOK_ADD_ROOM_FAIL,
  BOOK_EMPTY,
  BOOK_REMOVE_ROOM,
  BOOK_SAVE_MORE_INFORMATION,
  BOOK_SAVE_HOTEL_RESERVATION,
} from '../constants/bookConstants';

export const bookReducer = (state = { bookRooms: [] }, action) => {
  switch (action.type) {
    case BOOK_ADD_ROOM:
      const room = action.payload;
      const existRoom = state.bookRooms.find((x) => x.hotel === room.hotel);
      if (existRoom) {
        return {
          ...state,
          error: '',
          bookRooms: state.bookRooms.map((x) =>
            x.hotel === existRoom.hotel ? room : x
          ),
        };
      } else {
        return { ...state, error: '', bookRooms: [...state.bookRooms, room] };
      }
    case BOOK_REMOVE_ROOM:
      return {
        ...state,
        error: '',
        bookRooms: state.bookRooms.filter((x) => x.hotel !== action.payload),
      };
    case BOOK_SAVE_HOTEL_RESERVATION:
      return { ...state, hotelReservation: action.payload };
    case BOOK_SAVE_MORE_INFORMATION:
      return { ...state, moreInformation: action.payload };
    case BOOK_ADD_ROOM_FAIL:
      return { ...state, error: action.payload };
    case BOOK_EMPTY:
      return { ...state, error: '', bookRooms: [] };
    default:
      return state;
  }
};