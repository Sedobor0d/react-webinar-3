import { getProducts } from "../../services";

import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      list: [],
      currentPage: 0,
      totalPages: 0
    }
  }

  async load(pageNum = 1) {
    if (pageNum === this.getState().currentPage) return;

    const data = await getProducts((pageNum - 1) * 10);

    const totalPages = Math.ceil(data.count / 10);

    this.setState({
      ...this.getState(),
      list: [...data.items],
      currentPage: pageNum,
      totalPages: totalPages
    }, 'Загружены товары из АПИ');
  }

  async setOneProduct(product) {
    if (this.getState().list.length === 0) {
      this.setState({
        ...this.getState(),
        list: [...this.getState().list, product],
      }, 'Добавлен товар при перезагрузки');
    }
  }
}
export default Catalog;
