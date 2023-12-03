import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
   constructor(initState = {}) {
      this.state = initState;
      this.listeners = []; // Слушатели изменений состояния
      this.addedProduct = [] //Выбранные товары в корзине
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
   * @returns {Array<Object>} - Массив выбранных товаров, в коризне
   */
   getAddedProduct() {
      return this.addedProduct;
   }

   /**
   * Установка состояния
   * @param newState {Array<Object>}
   */
   setAddedProduct(newState) {
      this.addedProduct = newState;

      // Вызываем всех слушателей
      for (const listener of this.listeners) listener();
   }

   /**
    * Добавление товара в корзину
    * @param {Object} 
    */
   addProduct(product) {
      const findProduct = this.addedProduct.find((item) => item.code === product.code);
      const store = this.addedProduct

      if (findProduct) {
         const updatedProduct = { ...findProduct, count: findProduct.count + 1 };
         this.setAddedProduct(store.map((item) => (item.code === product.code ? updatedProduct : item)))
      } else {
         const newProduct = { ...product, count: 1 };
         this.setAddedProduct([...store, newProduct])
      }
   };

   /**
    * Удаление товара из коризны по коду
    * @param {number}
    */
   deleteProduct(code) {
      const newArr = this.addedProduct.filter(item => item.code !== code)
      this.setAddedProduct(newArr)
   };
}

export default Store;