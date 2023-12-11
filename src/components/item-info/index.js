import React, { memo, useEffect } from 'react';
import PropTypes from "prop-types";
import './style.css';

const ItemInfo = (props) => {

   const callbacks = {
      onAdd: () => props.onAdd(props._id)
   }

   useEffect(() => {
      props.setIsLoading(false)
   }, [])

   return (
      <div className='ItemInfo'>
         <div className="ItemInfo-content">
            <p>{props.product.description}</p>
            <p>Страна производитель: <span>{props.product.madeInTitle}</span></p>
            <p>Категория: <span>{props.product.categoryTitle}</span></p>
            <p>Год выпуска: <span>{props.product.edition}</span></p>
            <p className='ItemInfo-price'>Цена: <span>{props.product.price} ₽</span></p>
            <button onClick={callbacks.onAdd}>Добавить</button>
         </div>
      </div>
   );
};

ItemInfo.propTypes = {
   product: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      description: PropTypes.string,
      madeInTitle: PropTypes.string,
      categoryTitle: PropTypes.string,
      edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      price: PropTypes.number
   }).isRequired,
   setIsLoading: PropTypes.func,
   onAdd: PropTypes.func,
};

ItemInfo.defaultProps = {
   setIsLoading: () => { },
   onAdd: () => { }
}

export default memo(ItemInfo);