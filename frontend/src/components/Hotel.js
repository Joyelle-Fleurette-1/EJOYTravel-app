import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Hotel(props) {
  const { hotel } = props;
  return (
    <div key={hotel._id} className="card">
      <Link to={`/hotel/${hotel._id}`}>
        <img className="medium" src={hotel.image} alt={hotel.name} />
      </Link>
      <div className="card-body">
        <Link to={`/hotel/${hotel._id}`}>
          <h2>{hotel.name}</h2>
        </Link>
        {hotel.description}
        <Rating
          rating={hotel.rating}
          numReviews={hotel.numReviews}
        ></Rating>
        <div className="row">
          <div className="price">{hotel.price} Fbu</div>
          <div>
            <Link to={`/manager/${hotel.manager._id}`}>
              <u>Any questions? Click here</u>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}