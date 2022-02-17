import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Hotel from '../components/Hotel';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listHotels } from '../actions/hotelActions';
import { listTopManagers } from '../actions/userActions';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const hotelList = useSelector((state) => state.hotelList);
  const { loading, error, hotels } = hotelList;

  useEffect(() => {
    dispatch(listHotels({}));
    dispatch(listTopManagers());
  }, [dispatch]);
  return (
    <div>
      <div className= "stage">
      <div className= "layer"></div>
      <div className= "layer"></div>
      <div className= "layer"></div>
      <div className= "layer"></div>
      <div className= "layer"></div>
      <div className= "layer"></div>
      <div className= "layer"></div>
      <div className= "layer"></div>
      <div className= "layer"></div>
      <div className= "layer"></div>
      <div className= "layer"></div>
      <div className= "layer"></div>
      <div className= "layer"></div>
      <div className= "layer"></div>
      <div className= "layer"></div>
      <div className= "layer"></div>
      <div className= "layer"></div>
      <div className= "layer"></div>
      <div className= "layer"></div>
      <div className= "layer"></div>
    </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {hotels.length === 0 && <MessageBox>No hotel Found</MessageBox>}
          <div className="row center">
            {hotels.map((hotel) => (
              <Hotel key={hotel._id} hotel={hotel}></Hotel>
            ))}
          </div>
        </>
        )}
      </div>
    );
  }