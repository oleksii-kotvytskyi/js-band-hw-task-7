import React from 'react';
import PropTypes from 'prop-types';
import './style.css';


function Dropdown(props) {
  const { items, dropdownInf, visibleToggle, textValue, handleClick } = props;
    return (
      <div className={dropdownInf.open ? 'dropdownList open' : 'dropdownList'} >
        <button
         type='button' 
         onClick={() => visibleToggle(dropdownInf)}>
         { textValue  }
        </button>
        <ul>
          { items.map((item) => {
            return (
              <li key={item} onClick={handleClick}>{item}</li>
            );
          }) }
        </ul>
      </div>
    )
}
Dropdown.defaultProps = {
  dropdownInf: PropTypes.shape({
    open: PropTypes.bool,
    name: PropTypes.string
  }),
  handleClick: PropTypes.func
};

Dropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  dropdownInf: PropTypes.shape({
    open: PropTypes.bool,
    name: PropTypes.string
  }),
  visibleToggle: PropTypes.func.isRequired,
  textValue: PropTypes.string.isRequired,
  handleClick: PropTypes.func
};

export default Dropdown;