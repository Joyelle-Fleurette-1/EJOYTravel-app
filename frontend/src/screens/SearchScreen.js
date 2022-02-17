import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listHotels } from '../actions/hotelActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Hotel from '../components/Hotel';
import Rating from '../components/Rating';
import { prices, ratings } from '../utils';

export default function SearchScreen(props) {
  const {
    name = 'all',
    province = 'all',
    min = 0,
    max = 0,
    rating = 0,
    booking = 'newest',
  } = useParams();
  const dispatch = useDispatch();
  const hotelList = useSelector((state) => state.hotelList);
  const { loading, error, hotels } = hotelList;

  const hotelProvinceList = useSelector((state) => state.hotelProvinceList);
  const {
    loading: loadingProvinces,
    error: errorProvinces,
    provinces,
  } = hotelProvinceList;

  useEffect(() => {
    dispatch(
      listHotels({
        name: name !== 'all' ? name : '',
        province: province !== 'all' ? province : '',
        min,
        max,
        rating,
        booking,
      })
    );
  }, [province, dispatch, max, min, name, booking, rating]);

  const getFilterUrl = (filter) => {
    const filterProvince = filter.province || province;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortbooking = filter.booking || booking;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/province/${filterProvince}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/booking/${sortbooking}`;
  };
  return (
    <div>
      <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{hotels.length} Results</div>
        )}
        <div>
          Sort by{' '}
          <select
            value={booking}
            onChange={(e) => {
              props.history.push(getFilterUrl({ booking: e.target.value }));
            }}
          >
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
            <option value="toprated">Avg. Customer Reviews</option>
          </select>
        </div>
      </div>
      <div className="row top">
        <div className="col-1">
          <h3>Department</h3>
          <div>
            {loadingProvinces ? (
              <LoadingBox></LoadingBox>
            ) : errorProvinces ? (
              <MessageBox variant="danger">{errorProvinces}</MessageBox>
            ) : (
              <ul>
                <li>
                  <Link
                    className={'all' === province ? 'active' : ''}
                    to={getFilterUrl({ province: 'all' })}
                  >
                    Any
                  </Link>
                </li>
                {provinces.map((c) => (
                  <li key={c}>
                    <Link
                      className={c === province ? 'active' : ''}
                      to={getFilterUrl({ province: c })}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3>Price</h3>
            <ul>
            {prices.map((p) => (
                <li key={p.name}>
                  <Link
                    to={getFilterUrl({ min: p.min, max: p.max })}
                    className={
                      `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''
                    }
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
            </div>
          <div>
            <h3>Avg. Customer Review</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? 'active' : ''}
                  >
                    <Rating caption={' & up'} rating={r.rating}></Rating>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {hotels.length === 0 && (
                <MessageBox>No hotel Found</MessageBox>
              )}
              <div className="row center">
                {hotels.map((hotel) => (
                  <Hotel key={hotel._id} hotel={hotel}></Hotel>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}