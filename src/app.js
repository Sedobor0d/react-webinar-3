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
      { code: generateCode(), title: 'Название товара', price: 100.0, count: 0 },
      { code: generateCode(), title: 'Книга про React', price: 770, count: 0 },
      { code: generateCode(), title: 'Конфета', price: 33, count: 0 },
      { code: generateCode(), title: 'Трактор', price: 7955320, count: 0 },
      { code: generateCode(), title: 'Телефон iPhone XIXV', price: 120000, count: 0 },
      { code: generateCode(), title: 'Карандаши цветные', price: 111, count: 0 },
      { code: generateCode(), title: 'Товар сюрприз', price: 0, count: 0 },
    ]
  })
  const [addedProduct, setAddedProduct] = useState([])
  const [countProduct, setCountProduct] = useState(0) //Общее кол-во выбранных товаров
  const [totalAmount, setTotalAmount] = useState(0) //Общая стоиость товаров
  const [isOpenModal, setIsOpenModal] = useState(false) //Модальное окно

  const callbacks = {
    onAdd: useCallback((item) => {
      setStore(prevStore => {
        const updatedList = prevStore.list.map(value => {
          if (value.code === item.code) {
            return { ...value, count: item.count + 1 };
          }
          return value;
        });
        return { ...prevStore, list: updatedList };
      });
      setTotalAmount(prev => prev + item.price)
      setCountProduct(prev => prev + 1)
      setAddedProduct(prev => {
        if (prev.find(el => el.code === item.code)) return prev
        return [...prev, item]
      })
    }, [])
  }

  return (
    <ProductsContext.Provider value={{
      store, setStore,
      addedProduct, setAddedProduct,
      countProduct, setCountProduct,
      totalAmount, setTotalAmount,
      isOpenModal, setIsOpenModal
    }}>
      <PageLayout>
        <Head title='Магазин' />
        <Controls />
        <List list={store.list} onClickBtn={callbacks.onAdd} titleBtn={'Добавить'} />
        {isOpenModal && <Basket />}
      </PageLayout>
    </ProductsContext.Provider>
  );
}

export default App;
