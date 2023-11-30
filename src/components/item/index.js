import React, { useContext } from "react";
import PropTypes from "prop-types";

import './style.css';
import { ProductsContext } from "../../context/products-context";
import Money from '../ui/money';

function Item({ item, onClickBtn, titleBtn }) {

  const { setStore, setTotalAmount, setCountProduct, setAddedProduct, isOpenModal } = useContext(ProductsContext);

  const callbacks = {
    onClick: () => {

    }
  }

  return (
    <div className={'Item'} onClick={callbacks.onClick}>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>
        {item.title}
      </div>
      <div className='Item-price'>
        <Money>{item.price}</Money>
        {isOpenModal &&
          <div className='Item-count'>
            {item.count} шт.
          </div>}
      </div>

      <div className='Item-actions'>
        <button onClick={onClickBtn}>
          {titleBtn}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string
  }).isRequired,
};

export default React.memo(Item);
