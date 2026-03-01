import React, { useState, useRef, useEffect, useMemo } from 'react'
import './App.css';
import StackedBarChart from './chart';
import { motion, AnimatePresence } from 'framer-motion';
import data from './data';

// Helper to parse date string (MM/DD/YYYY) into a Date object
const parseDate = (dateStr) => {
  const [month, day, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day); // month is 0-indexed in JS
};

// Format month for display: "January 2026"
const formatMonthYear = (date) => {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

function App() {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [direction, setDirection] = useState('right'); // Track animation direction

  // Extract unique months from data, sorted chronologically
  const months = useMemo(() => {
    const monthSet = new Set();
    data.forEach(item => {
      const date = parseDate(item.date);
      // Use first day of month as representative
      const monthKey = new Date(date.getFullYear(), date.getMonth(), 1);
      monthSet.add(monthKey.toISOString()); // store as string for easy comparison
    });
    return Array.from(monthSet)
      .map(str => new Date(str))
      .sort((a, b) => a - b);
  }, []);

  const handlePrev = () => {
    setCurrentMonthIndex(prev => Math.max(prev - 1, 0));
    setDirection('left');
  };

  const handleNext = () => {
    setCurrentMonthIndex(prev => Math.min(prev + 1, months.length - 1));
    setDirection('right');
  };

  // Filter data for the selected month
  const selectedMonthData = useMemo(() => {
    if (!months.length) return [];
    const selectedMonth = months[currentMonthIndex];
    return data.filter(item => {
      const date = parseDate(item.date);
      return date.getFullYear() === selectedMonth.getFullYear() &&
             date.getMonth() === selectedMonth.getMonth();
    });
  }, [currentMonthIndex, months]);


  // If no months, show nothing
  if (!months.length){
    return (
      <div className="App">
        <h2 className="nothing">No data available</h2>
      </div>
    )
  }
  console.log(direction);

  return (
    <div className="App">
      <div className="title-container">
        <a 
          onClick={handlePrev} 
          disabled={currentMonthIndex === 0}
          className={`material-icons change-month-arrow ${currentMonthIndex === 0 ? 'disabled' : ''}`}
          style={{ cursor: currentMonthIndex === 0 ? 'not-allowed' : 'pointer' }}
        >
          &#xe314;
        </a>
        <h2 className="month-title">
          {formatMonthYear(months[currentMonthIndex])}
        </h2>
        <a 
          onClick={handleNext} 
          disabled={currentMonthIndex === months.length - 1}
          className={`material-icons change-month-arrow ${currentMonthIndex === months.length - 1 ? 'disabled' : ''}`}
          style={{ cursor: currentMonthIndex === months.length - 1 ? 'not-allowed' : 'pointer' }}
        >
          &#xe315;
        </a>
      </div>
      <AnimatePresence mode="sync">
        <motion.div
          key={currentMonthIndex}
          initial={{ x: direction === 'right' ? 1000 : -1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction === 'right' ? -1000 : 1000, opacity: 0 }}
          transition={{ duration: 1 }}
          style={{ width: '100%' }}
        >
          <StackedBarChart data={selectedMonthData} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
