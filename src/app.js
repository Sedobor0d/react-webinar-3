import React, { useCallback, useState } from 'react';

import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import { ProductsContext } from './context/products-context';
import Basket from './components/basket';

function App({ store }) {
  const [totalAmount, setTotalAmount] = useState(0) //Общая стоиость товаров
  const [isOpenModal, setIsOpenModal] = useState(false) //Модальное окно

  const list = store.getState().list;
  const addedProduct = store.getAddedProduct();

  const handleAddProduct = useCallback((product) => {
    setTotalAmount(prev => prev + product.price)
    store.addProduct(product)

  }, [store])

  const handleDeleteProduct = useCallback((product) => {
    setTotalAmount(prev => prev - (product.price * product.count))
    store.deleteProduct(product.code)

  }, [store])

  return (
    <ProductsContext.Provider value={{
      addedProduct,
      handleAddProduct, handleDeleteProduct,
      totalAmount, setTotalAmount,
      isOpenModal, setIsOpenModal
    }}>
      <PageLayout>
        <Head title='Магазин' />
        <Controls countProduct={addedProduct.length} />
        <List list={list} onClickBtn={handleAddProduct} titleBtn={'Добавить'} />
        {isOpenModal && <Basket />}
      </PageLayout>
    </ProductsContext.Provider>
  );
}

export default App;
