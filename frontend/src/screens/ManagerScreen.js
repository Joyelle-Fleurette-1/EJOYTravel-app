import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listHotels } from '../actions/hotelActions';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';

export default function ManagerScreen(props) {
  const managerId = props.match.params.id;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(managerId));
    dispatch(listHotels({ manager: managerId }));
  }, [dispatch, managerId]);
  return (
    <div className="row top">
      <div className="col-1">
        <div>
          <h2>
            Welcome. We are are happy you chose us.
          </h2>
          <h2>
            Please Use the information below to contact us for anything.
          </h2>
          <Link to="/">Go back to the <b>Home Page</b></Link>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <ul className="card card-body">
            <li>
              <div className="row start">
                <div className="p-1">
                  <img
                    className="managerProfile"
                    src={user.manager.logo}
                    alt={user.manager.name}
                  ></img>
                </div>
                <div className="p-1">
                </div>
              </div>
            </li>
            <li>
              <Rating
                rating={user.manager.rating}
                numReviews={user.manager.numReviews}
              ></Rating>
            </li>
            <li>
              <a href={`mailto:${user.email}`}>Click here to Contact us Via Email</a>
            </li>
            <li>Call us on: + 25776488709</li>
            <li>{user.manager.description}</li>
          </ul>
        )}
      </div>
      
    </div>
  );
}