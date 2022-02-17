import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { completeBooking, detailsBooking} from '../actions/bookingActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { BOOKING_COMPLETE_RESET } from '../constants/bookingConstants';

export default function BookingScreen(props) {
  const bookingId = props.match.params.id;
  const bookingDetails = useSelector((state) => state.bookingDetails);
  const { booking, loading, error } = bookingDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const bookingComplete = useSelector((state) => state.bookingComplete);
  const {
    loading: loadingComplete,
    error: errorComplete,
    success: successComplete,
  } = bookingComplete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: BOOKING_COMPLETE_RESET });
    dispatch(detailsBooking(bookingId));
  }, [dispatch, bookingId, successComplete]);

  const completeHandler = () => {
    dispatch(completeBooking(booking._id));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>booking {booking._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Hotel Reservation</h2>
                <p>
                  <strong>Name:</strong> {booking.hotelReservation.fullName} <br />
                  <strong>Phone: </strong> {booking.hotelReservation.phone}<br/>
                  <strong>Email:</strong> {booking.hotelReservation.email},{' '} <br />
                  <strong>Arrival Date: </strong> {booking.hotelReservation.arrivalDate}<br/>
                  <strong>Departure Date: </strong> {booking.hotelReservation.departureDate}<br/>
                   
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
              <h2>More Information</h2>
                <p>
                  <strong>ID Type:</strong> {booking.moreInformation.idType} <br /><br />
                  <strong>ID Number: </strong> {booking.moreInformation.idNumber}<br /><br />
                  <strong>Nationality: </strong> {booking.moreInformation.nationality} <br /><br />
                  <strong>Permanent Address: </strong> {booking.moreInformation.permanentAddress} <br /><br />
                  <strong>Current Address: </strong> {booking.moreInformation.currentAddress} <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>booking Items</h2>
                <ul>
                  {booking.bookingItems.map((item) => (
                    <li key={item.hotel}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/hotel/${item.hotel}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x {item.price} Fbu = {item.qty * item.price} Fbu
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div >
          <div >
            <ul>
              <li>
                <div>
                  <strong> Booking Total: {booking.totalPrice} Fbu</strong>
                </div>
              </li>
              {userInfo.isAdmin && (
                <li>
                  {loadingComplete && <LoadingBox></LoadingBox>}
                  {errorComplete && (
                    <MessageBox variant="danger">{errorComplete}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={completeHandler}
                  >
                    Complete Booking
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}