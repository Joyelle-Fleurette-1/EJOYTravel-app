import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveMoreInformation } from '../actions/bookActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function MoreInformationScreen(props) {
  const book = useSelector((state) => state.book);
  const { hotelReservation } = book;
  const { moreInformation } = book;
  if (!hotelReservation.phone) {
    props.history.push('/reservation');
  }
  const [idType, setIdType] = useState(moreInformation.idType);
  const [idNumber, setIdNumber] = useState(moreInformation.idNumber);
  const [nationality, setNationality] = useState(moreInformation.nationality);
  const [permanentAddress, setPermanentAddress] = useState(moreInformation.permanentAddress);
  const [currentAddress, setCurrentAddress] = useState(moreInformation.currentAddress);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveMoreInformation({ idType, idNumber, nationality, permanentAddress, currentAddress }));
    props.history.push('/placebooking');
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>More Information</h1>
        </div>
        <div>
          <label htmlFor="idType">ID Type </label>
          <input
            type="text"
            id="idType"
            placeholder="Write if Passport or National Id"
            value={idType}
            onChange={(e) => setIdType(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">ID Number</label>
          <input
            type="text"
            id="idNumber"
            placeholder="Enter Your ID Number Number"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="nationality">nationality</label>
          <input
            type="text"
            id="nationality"
            placeholder="Enter nationality"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="permanentAddress">Permanent Address</label>
          <input
            type="text"
            id="permanentAddress"
            placeholder="Enter permanent address"
            value={permanentAddress}
            onChange={(e) => setPermanentAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="deaprtureDate">Current Address</label>
          <input
            type="text"
            id="currentAddress"
            placeholder="Enter current address"
            value={currentAddress}
            onChange={(e) => setCurrentAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}