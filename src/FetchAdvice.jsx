import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import pic1 from './assets/images/pattern-divider-desktop.svg'
import pic2 from './assets/images/icon-dice.svg'

const FetchAdvice = () => {
  // State to store the advice and advice number
  const [adviceText, setAdvice] = useState('Loading..');
  const [adviceNumber, setAdviceNumber] = useState('');

  // Function to fetch advice from the API using Axios
  const fetchAdvice = async () => {
    try {
      const response = await axios.get('https://api.adviceslip.com/advice');
      const data = response.data.slip;
      setAdvice(data.advice);
      setAdviceNumber(data.id);
    } catch (error) {
      console.error(`Error fetching advice: ${error.message}`);
    }
  };

  // Use useEffect to fetch advice after the component mounts
  useEffect(() => {
    // Wait for 3 seconds before fetching advice
    const timeoutId = setTimeout(() => {
      fetchAdvice();
    }, 1000);

    // Clear the timeout if the component unmounts
    return () => {
      clearTimeout(timeoutId);
    };
  }, []); // Empty dependency array means this effect runs once after mounting

  return (
    <>
      <main>
        <div className="container">
            <p className='num'>Advice #{adviceNumber}</p>
            <p className='text'>{adviceText}</p>
        </div>
        <img id='divide' src={pic1} alt=""  />
        <button id='dice' onClick={fetchAdvice}>
            <img src={pic2} alt="" />
        </button>
      </main>

      <div className="attribution">
    Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
    Coded by <a href="https://github.com/Tonega">Tony</a>.
  </div>

    </>
  );
};

export default FetchAdvice;
