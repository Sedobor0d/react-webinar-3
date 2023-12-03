import React, { useContext } from "react";
import PropTypes from "prop-types";

import './style.css';
import { ProductsContext } from "../../context/products-context";
import Money from '../ui/money';
import MyButton from '../ui/button';

function Item({ item, onClickBtn, titleBtn }) {

  const { isOpenModal } = useContext(ProductsContext);

  return (
    <div className='Item'>
      <div className='Item-code'>
        {item.code}
      </div>

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
        <MyButton onClick={onClickBtn}>
          {titleBtn}
        </MyButton>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    count: PropTypes.number,
  }).isRequired,
  onClickBtn: PropTypes.func.isRequired,
  titleBtn: PropTypes.string.isRequired,
};

Item.defaultProps = {
  onClickBtn: () => {
  }
}

export default React.memo(Item);
