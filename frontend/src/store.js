import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { bookReducer } from './reducers/bookReducers';
import {
  bookingCreateReducer,
  bookingDeleteReducer,
  bookingCompleteReducer,
  bookingDetailsReducer,
  bookingListReducer,
  bookingMineListReducer,
} from './reducers/bookingReducers';
import {
  hotelProvinceListReducer,
  hotelCreateReducer,
  hotelDeleteReducer,
  hotelDetailsReducer,
  hotelListReducer,
  hotelReviewCreateReducer,
  hotelUpdateReducer,
} from './reducers/hotelReducers';
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSigninReducer,
  userTopManagerListReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './reducers/userReducers';

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  book: {
    bookRooms: localStorage.getItem('bookRooms')
      ? JSON.parse(localStorage.getItem('bookRooms'))
      : [],
    hotelReservation: localStorage.getItem('hotelReservation')
      ? JSON.parse(localStorage.getItem('hotelReservation'))
      : {},
    moreInformation: localStorage.getItem('moreInformation')
      ? JSON.parse(localStorage.getItem('moreInformation'))
      : {},
  },
};
const reducer = combineReducers({
  hotelList: hotelListReducer,
  hotelDetails: hotelDetailsReducer,
  book: bookReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  bookingCreate: bookingCreateReducer,
  bookingDetails: bookingDetailsReducer,
  bookingMineList: bookingMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  hotelCreate: hotelCreateReducer,
  hotelUpdate: hotelUpdateReducer,
  hotelDelete: hotelDeleteReducer,
  bookingList: bookingListReducer,
  bookingDelete: bookingDeleteReducer,
  bookingComplete: bookingCompleteReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userTopManagersList: userTopManagerListReducer,
  hotelProvinceList: hotelProvinceListReducer,
  hotelReviewCreate: hotelReviewCreateReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;