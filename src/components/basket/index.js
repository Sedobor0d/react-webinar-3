import React, { useContext } from "react";

import './style.css';
import { ProductsContext } from "../../context/products-context";
import Head from "../head";
import List from "../list";
import TotalAmount from "../total-amount";

const Basket = () => {
   const { addedProduct, handleDeleteProduct, setIsOpenModal, totalAmount } = useContext(ProductsContext);

   const callbacks = {
      onClose: () => {
         setIsOpenModal(false)
      },
      onDelete: (product) => {
         handleDeleteProduct(product)
      }
   }

   return (
      <div className="Basket">
         <div className="Basket-container">
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
      </div>
   );
};

export default React.memo(Basket);