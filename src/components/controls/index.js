import React, { useContext } from "react";
import PropTypes from "prop-types";

import './style.css';
import Money from '../ui/money';
import { plural } from '../../utils'
import { ProductsContext } from "../../context/products-context";

function Controls({ countProduct }) {

  const { totalAmount, setIsOpenModal } = useContext(ProductsContext);

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
  countProduct: PropTypes.number.isRequired
};

export default React.memo(Controls);
