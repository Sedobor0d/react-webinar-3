import React, { createContext, useCallback, useState } from 'react';

import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import { ProductsContext } from './context/products-context';
import { generateCode } from "./utils";
import Basket from './components/basket';

function App() {

  const [store, setStore] = useState({
    list: [
      { code: generateCode(), title: 'Название товара', price: 100.0 },
      { code: generateCode(), title: 'Книга про React', price: 770 },
      { code: generateCode(), title: 'Конфета', price: 33, count: 0 },
      { code: generateCode(), title: 'Трактор', price: 7955320 },
      { code: generateCode(), title: 'Телефон iPhone XIXV', price: 120000 },
      { code: generateCode(), title: 'Карандаши цветные', price: 111 },
      { code: generateCode(), title: 'Товар сюрприз', price: 0 },
    ]
  })
  const [addedProduct, setAddedProduct] = useState([])
  const [totalAmount, setTotalAmount] = useState(0) //Общая стоиость товаров
  const [isOpenModal, setIsOpenModal] = useState(false) //Модальное окно

  const callbacks = {
    handleAddProduct: (product) => {
      setTotalAmount(prev => prev + product.price)

      setAddedProduct(prevStore => {
        const findProduct = prevStore.find((item) => item.code === product.code);

        if (findProduct) {
          const updatedProduct = { ...findProduct, count: findProduct.count + 1 };
          return prevStore.map((item) => (item.code === product.code ? updatedProduct : item))
        }
        const newProduct = { ...product, count: 1 };
        return [...prevStore, newProduct]
      })
    }
  }

  return (
    <ProductsContext.Provider value={{
      store, setStore,
      addedProduct, setAddedProduct,
      totalAmount, setTotalAmount,
      isOpenModal, setIsOpenModal
    }}>
      <PageLayout>
        <Head title='Магазин' />
        <Controls />
        <List list={store.list} onClickBtn={callbacks.handleAddProduct} titleBtn={'Добавить'} />
        {isOpenModal && <Basket />}
      </PageLayout>
    </ProductsContext.Provider>
  );
}

export default App;
