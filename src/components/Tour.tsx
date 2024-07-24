'use client'

import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
import { useEffect } from 'react';

const Tour: React.FC = () => {
  useEffect(() => {
    const driver: any = new Driver(); // Use any to bypass type errors

    driver.defineSteps([
      {
        element: '#step1',
        popover: {
          title: 'Step 1',
          description: 'This is the first step',
          position: 'bottom'
        }
      },
      {
        element: '#step2',
        popover: {
          title: 'Step 2',
          description: 'This is the second step',
          position: 'top'
        }
      },
      // Add more steps as needed
    ]);

    driver.start();
  }, []);

  return null;
};

export default Tour;
