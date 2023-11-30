import React, { useContext } from "react";
import PropTypes from "prop-types";

import './style.css';
import { ProductsContext } from "../../context/products-context";
import Head from "../head";
import List from "../list";
import Money from '../ui/money';

const Basket = () => {
   const { addedProduct, setIsOpenModal, totalAmount } = useContext(ProductsContext);

   const callbacks = {
      onDelete: (item) => {
         // setStore(prevStore => {
         //    const updatedList = prevStore.list.map(value => {
         //       if (value.code === item.code) {
         //          return { ...value, count: item.count + 1 };
         //       }
         //       return value;
         //    });
         //    return { ...prevStore, list: updatedList };
         // });
         // setTotalAmount(prev => prev + item.price)
         // setCountProduct(prev => prev + 1)
         // setAddedProduct(prev => {
         //    if (prev.find(el => el.code === item.code)) return prev
         //    return [...prev, item]
         // })
      }
   }

   return (
      <div className="Basket">
         <div className="Basket-container">
            <div className="Basket-header">
               <Head title='Корзина' />
               <button className="Basket-header__btn" onClick={() => setIsOpenModal(false)}>Закрыть</button>
            </div>
            <List list={addedProduct} onClickBtn={callbacks.onDelete} titleBtn={'Удалить'} />
            <div className="Basket-total">
               <div className="Basket-total-container">
                  <span className="Basket__sum">Итого</span>
                  <Money>{totalAmount}</Money>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Basket;