import StoreModule from "../module";
import { getOneProduct } from "../../services";

class Product extends StoreModule {

   initState() {
      return {
         _id: '',
         title: '',
         description: '',
         madeInTitle: '',
         categoryTitle: '',
         edition: '',
         price: 0
      }
   }

   async setProduct(_id) {
      const data = await getOneProduct(_id);
      if (data) {
         this.setState({
            ...this.getState(),
            _id: data._id,
            title: data.title,
            description: data.description,
            madeInTitle: data.madeIn.title,
            categoryTitle: data.category.title,
            edition: data.edition,
            price: data.price
         }, 'Загружен товар из АПИ');
      }
      return data
   }
}
export default Product;