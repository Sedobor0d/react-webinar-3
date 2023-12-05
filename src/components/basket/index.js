import React from "react";
import PropTypes from 'prop-types';

import './style.css';
import Head from "../head";
import List from "../list";
import TotalAmount from "../total-amount";
import Modal from "../ui/modal";

const Basket = ({ setIsOpenModal, addedProduct, deleteProduct, totalAmount }) => {

   const callbacks = {
      onClose: () => {
         setIsOpenModal(false)
      },
      onDelete: (product) => {
         deleteProduct(product)
      }
   }

   return (
      <Modal>
         <div className="Basket">
            <div className="Basket-header">
               <Head title='Корзина' />
               <button className="Basket-btn" onClick={callbacks.onClose}>Закрыть</button>
            </div>
            {addedProduct.length > 0 ?
               <>
                  <List list={addedProduct} onClickBtn={callbacks.onDelete} titleBtn={'Удалить'} />
                  <TotalAmount totalAmount={totalAmount} />
               </> :
               <div className="Basket-empty">
                  <h2>Корзина пуста</h2>
               </div>
            }
         </div>
      </Modal>
   );
};

Basket.propTypes = {
   addedProduct: PropTypes.array.isRequired,
   deleteProduct: PropTypes.func.isRequired,
   setIsOpenModal: PropTypes.func.isRequired,
   totalAmount: PropTypes.number.isRequired,
};

export default React.memo(Basket);