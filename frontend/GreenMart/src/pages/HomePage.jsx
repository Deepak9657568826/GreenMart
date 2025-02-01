import React, { useContext } from 'react';
import Couresel from '../components/Couresel';
import Product from './Product';
import { useSelector } from 'react-redux';

function HomePage() {
  const state = useSelector((state) => state.auth);

  const users = state.userDetails;

  function getGreeting() {
    const now = new Date();
    const hour = now.getHours(); // Get the current hour (0-23)
    console.log(hour);
    if (hour >= 5 && hour < 12) {
      return 'Good Morning!';
    } else if (hour >= 12 && hour < 17) {
      return 'Good Afternoon!';
    } else if (hour >= 17 && hour < 22) {
      return 'Good Evening!';
    } else {
      return 'Good Night!';
    }
  }
  

  // Example Usage
  const user = users.name || "User";
  const greeting = getGreeting();
  const greet = `Welcome ${user}, ${greeting}`;

  return (
    <div >
      {/* <h1 className="text-xl md:text-2xl m-0 p-0 font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500 drop-shadow-lg">
        {greet}
      </h1> */}
      <Couresel />
      <Product />
    </div>
  );
}

export default HomePage;
