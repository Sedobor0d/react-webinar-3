import { getProducts } from "../../services";
import { getNumArrPages } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      list: [],
      currentPage: 0,
      totalPages: 0,
      numArrPages: []
    }
  }

  async load(pageNum = 1) {
    if (pageNum === this.getState().currentPage) return;

    const data = await getProducts(pageNum - 1);
    const totalPages = Math.ceil(data.count / 10);

    this.setState({
      ...this.getState(),
      list: data.items,
      currentPage: pageNum,
      totalPages: totalPages,
      numArrPages: getNumArrPages(pageNum, totalPages)
    }, 'Загружены товары из АПИ');
  }

  async setOneProduct(product) {
    if (this.getState().numArrPages.length === 0) {
      this.setState({
        ...this.getState(),
        list: [product],
      }, 'Добавлен товар при перезагрузки');
    }
  }
}
export default Catalog;
