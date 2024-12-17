import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./multiRangeSlider.css";

const MultiRangeSlider = ({ min, max, onChange, onChangeComplete, setIsSidebarOpen }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);
    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  const handleMouseUp = () => {
    if (onChangeComplete) {
      onChangeComplete({ min: minVal, max: maxVal });
    }
  };

  const handleMinInputChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      let numericValue = Number(value);
      if (numericValue < min) {
        numericValue = min;
      }
      setMinVal(numericValue);
      minValRef.current = numericValue;
      handleMouseUp();
    }
  };

  const handleMaxInputChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      let numericValue = Number(value);
      if (numericValue > max) {
        numericValue = max;
      }
      setMaxVal(numericValue);
      maxValRef.current = numericValue;
      handleMouseUp();
    }
  };

  // Handle "Valider" button click
  const handleValiderClick = () => {
    setIsSidebarOpen(false);  // Close the sidebar when button is clicked
  };

  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Number(event.target.value);
          setMinVal(value);
          minValRef.current = value;
          handleMouseUp();
        }}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Number(event.target.value);
          setMaxVal(value);
          maxValRef.current = value;
          handleMouseUp();
        }}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
        className="thumb thumb--right"
      />
      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="MinMaxDiv">
          <div className="oneGridDiv">
            <input
              type="text"
              className="slider__left-value"
              value={minVal}
              onChange={handleMinInputChange}
              onBlur={handleMouseUp}
            />
            <span className="tndSign">Min</span>
          </div>
          <div className="oneGridDiv rightone">
            <input
              type="text"
              className="slider__right-value"
              value={maxVal}
              onChange={handleMaxInputChange}
              onBlur={handleMouseUp}
            />
            <span className="tndSign">Max</span>
          </div>
        </div>
        <div className="filterButton">
          <button className="btnfilter" onClick={handleValiderClick}>Valider</button>
        </div>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeComplete: PropTypes.func,
  setIsSidebarOpen: PropTypes.func.isRequired,  // Added as prop to control the sidebar state
};

export default MultiRangeSlider;
