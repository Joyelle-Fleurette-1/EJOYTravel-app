import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBooking, listBookings } from '../actions/bookingActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { BOOKING_DELETE_RESET } from '../constants/bookingConstants';

export default function BookingListScreen(props) {
  const managerMode = props.match.path.indexOf('/manager') >= 0;
  const bookingList = useSelector((state) => state.bookingList);
  const { loading, error, bookings } = bookingList;

  const bookingDelete = useSelector((state) => state.bookingDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = bookingDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: BOOKING_DELETE_RESET });
    dispatch(listBookings({ manager: managerMode ? userInfo._id : '' }));
  }, [dispatch, managerMode, successDelete, userInfo._id]);
  const deleteHandler = (booking) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteBooking(booking._id));
    }
  };
  return (
    <div>
      <h1>bookings</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking._id}</td>
                <td>{booking.user.name}</td>
                <td>{booking.createdAt.substring(0, 10)}</td>
                <td>{booking.totalPrice}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/booking/${booking._id}`);
                    }}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(booking)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}