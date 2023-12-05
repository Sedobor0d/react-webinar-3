import React, { useCallback, useState } from 'react';

import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Basket from './components/basket';

function App({ store }) {
  const [isOpenModal, setIsOpenModal] = useState(false) //Модальное окно

  const list = store.getState().list;
  const addedProduct = store.getState().addedProduct;
  const totalAmount = store.getState().totalAmount;

  const callbacks = {
    handleAddProduct: useCallback((product) => {
      store.addProduct(product)
    }, [store]),

    handleDeleteProduct: useCallback((product) => {
      store.deleteProduct(product)
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls
        setIsOpenModal={setIsOpenModal}
        countProduct={addedProduct.length}
        totalAmount={totalAmount}
      />
      <List
        list={list}
        onClickBtn={callbacks.handleAddProduct}
        titleBtn={'Добавить'}
      />
      {isOpenModal &&
        <Basket
          setIsOpenModal={setIsOpenModal}
          addedProduct={addedProduct}
          deleteProduct={callbacks.handleDeleteProduct}
          totalAmount={totalAmount}
        />}
    </PageLayout>
  );
}

export default App;
