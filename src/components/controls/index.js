import React from "react";
import PropTypes from "prop-types";

import './style.css';
import Money from '../ui/money';
import { plural } from '../../utils'

function Controls({ setIsOpenModal, countProduct, totalAmount }) {

  const countText = countProduct > 0 ?
    `${countProduct} ${plural(countProduct,
      { one: 'товар', few: 'товара', many: 'товаров' })} / ` : 'пусто';

  const callbacks = {
    onOpen: () => {
      setIsOpenModal(true)
    },
  }

  return (
    <div className="Controls">
      <div className="Controls-container">
        В корзине:
        <p className="Controls-count">
          {countText}
          {countProduct > 0 && <Money>{totalAmount}</Money>}
        </p>
        <button className="Controls-btn" onClick={callbacks.onOpen}>Перейти</button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  setIsOpenModal: PropTypes.func.isRequired,
  countProduct: PropTypes.number.isRequired,
  totalAmount: PropTypes.number.isRequired,
};

export default React.memo(Controls);
