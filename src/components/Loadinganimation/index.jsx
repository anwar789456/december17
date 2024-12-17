import React from 'react';
import './style.scss'
const Loader = () => {
  return (
    <div className="containerAnim">
      <ul>
        <li>
          <div class="loader">
            <div class="child"></div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Loader;