import React, { useContext } from "react";
import PropTypes from 'prop-types';

import './style.css';
import MyButton from '../ui/button';
import Money from '../ui/money';
import { plural } from '../../utils'
import { ProductsContext } from "../../context/products-context";

function Controls() {

  const { addedProduct, totalAmount, setIsOpenModal } = useContext(ProductsContext);

  let countProduct = addedProduct.length;

  const countItem = () => {
    return (countProduct > 0 ?
      `
      ${countProduct} 
      ${plural(countProduct, { one: 'товар', few: 'товара', many: 'товаров' })}
      ${` / `}
      `:
      'пусто'
    )
  }

  return (
    <div className='Controls'>
      В коризне:
      <p className='Controls__count'>
        {countItem()}
        {countProduct > 0 ? <Money >{totalAmount}</Money> : null}
      </p>
      <MyButton onClick={() => setIsOpenModal(true)}>Перейти</MyButton>
    </div>
  )
}

Controls.propTypes = {
  onOpen: PropTypes.func
};

Controls.defaultProps = {
  onOpen: () => { }
}

export default React.memo(Controls);
