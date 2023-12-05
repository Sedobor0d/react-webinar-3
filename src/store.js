/**
 * Хранилище состояния приложения
 */
class Store {
   constructor(initState = {}) {
      this.state = initState;
      this.state.addedProduct = [] //Выбранные товары в корзине
      this.state.totalAmount = 0 //Общая стоимость товаров
      this.listeners = []; // Слушатели изменений состояния
   }

   /**
    * Подписка слушателя на изменения состояния
    * @param listener {Function}
    * @returns {Function} Функция отписки
    */
   subscribe(listener) {
      this.listeners.push(listener);
      // Возвращается функция для удаления добавленного слушателя
      return () => {
         this.listeners = this.listeners.filter(item => item !== listener);
      }
   }

   /**
    * Выбор состояния
    * @returns {Object}
    */
   getState() {
      return this.state;
   }

   /**
   * Установка состояния
   * @param newState {Array<Object>}
   */
   setState(newState) {
      this.state = newState;

      // Вызываем всех слушателей
      for (const listener of this.listeners) listener();
   }

   /**
    * Добавление товара в корзину
    * @param {Object} 
    */
   addProduct(product) {
      const store = this.state.addedProduct
      const findProduct = store.find((item) => item.code === product.code);

      let updatedArray;

      if (findProduct) {
         const updatedProduct = { ...findProduct, count: findProduct.count + 1 };
         updatedArray = store.map((item) => (item.code === product.code ? updatedProduct : item))
      } else {
         const newProduct = { ...product, count: 1 };
         updatedArray = [...store, newProduct]
      }
      this.setState({
         ...this.state,
         totalAmount: this.state.totalAmount + product.price,
         addedProduct: updatedArray
      })
   };

   /**
    * Удаление товара из коризны по коду
    * @param {number}
    */
   deleteProduct(product) {
      const updatedArray = this.state.addedProduct.filter(item => item.code !== product.code)
      this.setState({
         ...this.state,
         totalAmount: this.state.totalAmount - (product.price * product.count),
         addedProduct: updatedArray
      })
   };
}

export default Store;