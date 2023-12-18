import StoreModule from "../module";
import { sortCategory } from "../../utils";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class Сategories extends StoreModule {

   /**
    * Начальное состояние
    * @return {Object}
    */
   initState() {
      return {
         listCategory: [],
      }
   }

   async setCategory() {
      const responseCategory = await fetch('api/v1/categories?fields=_id,title,parent(_id)&limit=*')
      const jsonCategory = await responseCategory.json();

      // Установка новых параметров и признака загрузки
      this.setState({
         ...this.getState(),
         listCategory: sortCategory([{ _id: 'all', title: "Все", parent: null }, ...jsonCategory.result.items]),
      }, 'Получены категории из АПИ');
   }
}


export default Сategories;