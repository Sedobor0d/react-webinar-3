import React, { useContext } from "react";
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

export default React.memo(List);
