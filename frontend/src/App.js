import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import BookScreen from './screens/BookScreen';
import HomeScreen from './screens/HomeScreen';
import BookingHistoryScreen from './screens/BookingHistoryScreen';
import BookingScreen from './screens/BookingScreen';
import MoreInformationScreen from './screens/MoreInformationScreen';
import PlaceBookingScreen from './screens/PlaceBookingScreen';
import HotelListScreen from './screens/HotelListScreen';
import HotelScreen from './screens/HotelScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import HotelReservationScreen from './screens/HotelReservationScreen';
import SigninScreen from './screens/SigninScreen';
import HotelEditScreen from './screens/HotelEditScreen';
import BookingListScreen from './screens/BookingListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ManagerRoute from './components/ManagerRoute';
import ManagerScreen from './screens/ManagerScreen';
import AboutUs from './screens/AboutUs';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listHotelProvinces } from './actions/hotelActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';

function App() {
  const book = useSelector((state) => state.book);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { bookRooms } = book;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const hotelProvinceList = useSelector((state) => state.hotelProvinceList);
  const {
    loading: loadingProvinces,
    error: errorProvinces,
    provinces,
  } = hotelProvinceList;
  useEffect(() => {
    dispatch(listHotelProvinces());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="brand" to="/">
              EJOY Travel
            </Link>
          </div>
          <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          
          <div>
            <Link to="/book">
              Book
              {bookRooms.length > 0 && (
                <span className="badge">{bookRooms.length}</span>
              )}
            </Link>
            <Link to="aboutus">
              About Us
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                <li>
                    <Link to="/bookinghistory">Booking History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isManager && (
              <div className="dropdown">
                <Link to="#admin">
                  Manager <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/hotellist/manager">Hotels</Link>
                  </li>
                  <li>
                    <Link to="/bookinglist/manager">Bookings</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/hotellist">hotels</Link>
                  </li>
                  <li>
                    <Link to="/bookinglist">bookings</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
            
          </div>
        </header>
        <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="provinces">
            <li>
              <strong>Provinces</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingProvinces ? (
              <LoadingBox></LoadingBox>
            ) : errorProvinces ? (
              <MessageBox variant="danger">{errorProvinces}</MessageBox>
            ) : (
              provinces.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/province/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
          <Route path="/manager/:id" component={ManagerScreen}></Route>
          <Route path="/aboutus" component={AboutUs}></Route>
          <Route path="/book/:id?" component={BookScreen}></Route>
          <Route path="/hotel/:id" component={HotelScreen} exact></Route>
          <Route path="/hotel/:id/edit" component={HotelEditScreen} exact></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/reservation" component={HotelReservationScreen}></Route>
          <Route path="/moreinfo" component={MoreInformationScreen}></Route>
          <Route path="/placebooking" component={PlaceBookingScreen}></Route>
          <Route path="/booking/:id" component={BookingScreen}></Route>
          <Route path="/bookinghistory" component={BookingHistoryScreen}></Route>
          <Route path="/search/province/:province" component={SearchScreen} exact></Route>
          <Route path="/search/province/:province/name/:name" component={SearchScreen} exact></Route>
          <Route path="/search/name/:name?" component={SearchScreen} exact></Route>
          <Route path="/search/province/:province/name/:name/min/:min/max/:max/rating/:rating/booking/:booking" component={SearchScreen} exact></Route>
          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
          <AdminRoute path="/hotellist" component={HotelListScreen} exact></AdminRoute>
          <AdminRoute path="/bookinglist" component={BookingListScreen} exact></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <ManagerRoute path="/hotellist/manager" component={HotelListScreen}></ManagerRoute>
          <ManagerRoute path="/bookinglist/manager" component={BookingListScreen}></ManagerRoute>
          <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
          <h1>Hotels</h1>
          <Route path="/" component={HomeScreen} exact></Route>
          <hr></hr>
          <hr></hr>
          

          <ul className="provinces">
            <li>
            <h1>Places to Visit</h1>
            </li>
            {loadingProvinces ? (
              <LoadingBox></LoadingBox>
            ) : errorProvinces ? (
              <MessageBox variant="danger">{errorProvinces}</MessageBox>
            ) : (
              provinces.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/province/${c}`}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </main>
        <footer className="row center">
          <div> All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
