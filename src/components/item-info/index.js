import React, { memo, useEffect } from 'react';
import PropTypes from "prop-types";
import Head from '../head';
import './style.css';
import BasketTool from '../basket-tool';

const ItemInfo = (props) => {

   const callbacks = {
      onAdd: () => props.onAdd(props._id),
      onOpen: () => props.onOpen()
   }

   useEffect(() => {
      props.setIsLoading(false)
   }, [])

   console.log('props.select.edition: ', props.select.edition);
   return (
      <div className='ItemInfo'>
         <Head title={props.select.title} />
         <BasketTool onOpen={callbacks.onOpen} amount={props.select.amount}
            sum={props.select.sum} />
         <div className="ItemInfo-content">
            <p>{props.select.description}</p>
            <p>Страна производитель: <span>{props.select.madeInTitle}</span></p>
            <p>Категория: <span>{props.select.categoryTitle}</span></p>
            <p>Год выпуска: <span>{props.select.edition}</span></p>
            <p className='ItemInfo-price'>Цена: <span>{props.select.price} ₽</span></p>
            <button onClick={callbacks.onAdd}>Добавить</button>
         </div>
      </div>
   );
};

ItemInfo.propTypes = {
   select: PropTypes.shape({
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
   onOpen: PropTypes.func,
};

ItemInfo.defaultProps = {
   setIsLoading: () => { },
   onAdd: () => { },
   onOpen: () => { },
}

export default memo(ItemInfo);