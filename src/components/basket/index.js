import React, { useContext } from "react";
import PropTypes from "prop-types";

import './style.css';
import { ProductsContext } from "../../context/products-context";
import Head from "../head";
import List from "../list";
import Money from '../ui/money';

const Basket = () => {
   const { addedProduct, setAddedProduct, setIsOpenModal, totalAmount, setTotalAmount } = useContext(ProductsContext);

   const callbacks = {
      handleDeleteProduct: (product) => {
         setTotalAmount(prev => prev - (product.price * product.count))

         setAddedProduct(prev => {
            return prev.filter(item => item.code !== product.code)
         })
      }
   }

   return (
      <div className="Basket">
         <div className="Basket-container">
            <div className="Basket-header">
               <Head title='Корзина' />
               <button className="Basket-header__btn" onClick={() => setIsOpenModal(false)}>Закрыть</button>
            </div>
            <List list={addedProduct} onClickBtn={callbacks.handleDeleteProduct} titleBtn={'Удалить'} />
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