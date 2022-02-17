import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createHotel,
  deleteHotel,
  listHotels,
} from '../actions/hotelActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  HOTEL_CREATE_RESET,
  HOTEL_DELETE_RESET,
} from '../constants/hotelConstants';

export default function HotelListScreen(props) {
  const managerMode = props.match.path.indexOf('/manager') >= 0;
  const hotelList = useSelector((state) => state.hotelList);
  const { loading, error, hotels } = hotelList;
  const hotelCreate = useSelector((state) => state.hotelCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    hotel: createdHotel,
  } = hotelCreate;

  const hotelDelete = useSelector((state) => state.hotelDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = hotelDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: HOTEL_CREATE_RESET });
      props.history.push(`/hotel/${createdHotel._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: HOTEL_DELETE_RESET });
    }
    dispatch(listHotels({ manager: managerMode ? userInfo._id : '' }));
  }, [
    createdHotel,
    dispatch,
    props.history,
    managerMode,
    successCreate,
    successDelete,
    userInfo._id,
  ]);

  const deleteHandler = (hotel) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteHotel(hotel._id));
    }
  };
  const createHandler = () => {
    dispatch(createHotel());
  };
  return (
    <div>
      <div className="row">
        <h1>hotels</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Create hotel
        </button>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>PROVINCE</th>
              <th>BRAND</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel._id}>
                <td>{hotel._id}</td>
                <td>{hotel.name}</td>
                <td>{hotel.price}</td>
                <td>{hotel.province}</td>
                <td>{hotel.brand}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/hotel/${hotel._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(hotel)}
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