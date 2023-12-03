import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({ list, onClickBtn, titleBtn }) {

  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onClickBtn={() => onClickBtn(item)} titleBtn={titleBtn} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired
    })
  ).isRequired,
  onClickBtn: PropTypes.func.isRequired,
  titleBtn: PropTypes.string.isRequired,
};

List.defaultProps = {
  onClickBtn: () => {
  },
}

export default React.memo(List);
