import React, { useContext } from "react";

import './style.css';
import Money from '../ui/money';
import { plural } from '../../utils'
import { ProductsContext } from "../../context/products-context";

function Controls() {

  const { addedProduct, totalAmount, setIsOpenModal } = useContext(ProductsContext);

  const countProduct = addedProduct.length;
  const countText = countProduct > 0 ?
    `${countProduct} ${plural(countProduct,
      { one: 'товар', few: 'товара', many: 'товаров' })} / ` : 'пусто';

  return (
    <div className="Controls">
      <div className="Controls-container">
        В корзине:
        <p className="Controls-count">
          {countText}
          {countProduct > 0 && <Money>{totalAmount}</Money>}
        </p>
        <button className="Controls-btn" onClick={() => setIsOpenModal(true)}>Перейти</button>
      </div>
    </div>
  )
}

export default React.memo(Controls);
