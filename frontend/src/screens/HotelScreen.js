import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createReview, detailsHotel } from '../actions/hotelActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { HOTEL_REVIEW_CREATE_RESET } from '../constants/hotelConstants';

export default function HotelScreen(props) {
  const dispatch = useDispatch();
  const hotelId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const hotelDetails = useSelector((state) => state.hotelDetails);
  const { loading, error, hotel } = hotelDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const hotelReviewCreate = useSelector((state) => state.hotelReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = hotelReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: HOTEL_REVIEW_CREATE_RESET });
    }
    dispatch(detailsHotel(hotelId));
  }, [dispatch, hotelId, successReviewCreate]);
  const addToBookHandler = () => {
    props.history.push(`/book/${hotelId}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(hotelId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };
  return (
    <div>
       {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Go back to the <b>Home Page</b></Link>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={hotel.image}
                alt={hotel.name}
              ></img>
            </div>
            <div className="col-2">
              <img
                className="subHotels"
                src={hotel.image1}
                alt={hotel.name}
              ></img>
            </div>
            <div className="col-2">
              <img
                className="subHotels"
                src={hotel.image2}
                alt={hotel.name}
              ></img>
            </div>
            <div className="col-2">
              <img
                className="subHotels"
                src={hotel.image3}
                alt={hotel.name}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{hotel.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={hotel.rating}
                    numReviews={hotel.numReviews}
                  ></Rating>
                </li>
                <li>Price : {hotel.price} Fbu</li>
                <li>
                  Description:
                  <p>{hotel.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <h2>
                      <Link to={`/manager/${hotel.manager._id}`}>
                        <u>Any questions? Click here and get them clarified.</u>
                      </Link>
                    </h2>
                    
                  </li>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">{hotel.price} Fbu</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {hotel.countInStock > 0 ? (
                          <span className="success">Hurry up and book, There still rooms available.</span>
                        ) : (
                          <span className="danger">No rooms available</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {hotel.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Number of rooms</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(hotel.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToBookHandler}
                          className="primary block"
                        >
                          Proceed with your reservation at {hotel.name}
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h2 id="reviews">Reviews</h2>
            {hotel.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}
            <ul>
              {hotel.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Write a customer review</h2>
                    </div>
                    <div>
                      <label htmlFor="rating"><b>Rating</b></label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excelent</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment"><b>Comment</b></label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Submit
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}