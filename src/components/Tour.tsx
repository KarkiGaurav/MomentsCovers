'use client'

import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect } from 'react';

const Tour: React.FC = () => {
  useEffect(() => {
    const driverObj = driver({
      showProgress: true,
      popoverClass: 'driverjs-theme',
      steps: [
        {
          element: '#step-1',
          popover: {
            title: 'Sign Up or Log In',
            description: 'Click on the signup button to create an account.',
            side: 'left',
            align: 'start'
          }
        },
        {
          element: '#step-2',
          popover: {
            title: 'Start Your Journey',
            description: 'Click here to start your journey for customizing your phone case.',
            side: 'bottom',
            align: 'start'
          }
        },
        {
          element: '#step-3',
          popover: {
            title: 'Upload Image',
            description: 'Click here to upload your image or drop it here.',
            side: 'bottom',
            align: 'start'
          }
        },
        {
          element: '#step-4',
          popover: {
            title: 'Customize Design',
            description: 'Customize your design here by changing the color, material, finish, etc.',
            side: 'bottom',
            align: 'start'
          }
        },
        {
          element: '#step-5',
          popover: {
            title: 'Pay for Case',
            description: 'Please click on the checkout button to continue the payment process.',
            side: 'bottom',
            align: 'start'
          }
        }
        
      ]
    });
    driverObj.drive();

  }, []);

  return null;
};

export default Tour;
