import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToBook, removeFromBook } from '../actions/bookActions';
import MessageBox from '../components/MessageBox';

export default function BookScreen(props) {
  const hotelId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const book = useSelector((state) => state.book);
  const { bookRooms, error } = book;
  const dispatch = useDispatch();
  useEffect(() => {
    if (hotelId) {
      dispatch(addToBook(hotelId, qty));
    }
  }, [dispatch, hotelId, qty]);
  const removeFromBookHandler = (id) => {
    // delete action
    dispatch(removeFromBook(id));
  };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=reservation');
  };
  return (
    <div className="row top">
      <div className="col-2">
        <h1>Complete Your reservation.</h1>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {bookRooms.length === 0 ? (
          <MessageBox>
            No Room has been booked. <Link to="/">Go to <b>Home Page</b> to add rooms.</Link>
          </MessageBox>
        ) : (
          <ul>
            {bookRooms.map((room) => (
              <li key={room.hotel}>
                <div className="row">
                  <div>
                    <img
                      src={room.image}
                      alt={room.name}
                      className="subHotels"
                    ></img>
                    
                  </div>
                  <div className="min-30">
                    <Link to={`/hotel/${room.hotel}`}>{room.name}</Link>
                  </div>
                  <div>
                    <select
                      value={room.qty}
                      onChange={(e) =>
                        dispatch(
                          addToBook(room.hotel, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(room.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>{room.price}Fbu</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromBookHandler(room.hotel)}
                    >
                      <b>Delete</b>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                You are about to book ({bookRooms.reduce((a, c) => a + c.qty, 0)}) room(s) at:
                 {bookRooms.reduce((a, c) => a + c.price * c.qty, 0)} Fbu
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={bookRooms.length === 0}
              >
                Proceed
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}