import React, { useCallback, useContext } from "react";

import './style.css';
import { ProductsContext } from "../../context/products-context";
import Head from "../head";
import List from "../list";
import TotalAmount from "../total-amount";

const Basket = () => {
   const { addedProduct, setAddedProduct, setIsOpenModal, totalAmount, setTotalAmount } = useContext(ProductsContext);

   const callbacks = {
      handleDeleteProduct: useCallback((product) => {
         setTotalAmount(prev => prev - (product.price * product.count))

         setAddedProduct(prev => {
            return prev.filter(item => item.code !== product.code)
         })
      }, [])
   }

   return (
      <div className="Basket">
         <div className="Basket-container">
            <div className="Basket-header">
               <Head title='Корзина' />
               <button className="Basket-btn" onClick={() => setIsOpenModal(false)}>Закрыть</button>
            </div>
            {addedProduct.length > 0 ?
               <>
                  <List list={addedProduct} onClickBtn={callbacks.handleDeleteProduct} titleBtn={'Удалить'} />
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