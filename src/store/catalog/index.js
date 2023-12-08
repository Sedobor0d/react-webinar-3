import { getAllProducts, getSpecificProducts } from "../../services";
import { getNumArrPages } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      totalPages: 0,
      numArrPages: []
    }
  }

  async load() {
    const data = await getAllProducts();
    const totalPages = Math.ceil(data.count / 10);

    this.setState({
      ...this.getState(),
      list: data.items,
      totalPages: totalPages,
      numArrPages: getNumArrPages(0, totalPages)
    }, 'Загружены товары из АПИ');
  }

  async clickToPageNum(pageNumber) {
    if (pageNumber === this.getState().currentPage) {
      return;
    }
    const data = await getSpecificProducts(pageNumber - 1);
    const totalPages = Math.ceil(data.count / 10);

    this.setState({
      ...this.getState(),
      list: data.items,
      currentPage: pageNumber,
      totalPages: totalPages,
      numArrPages: getNumArrPages(pageNumber, totalPages)
    }, 'Загружены товары по номеру страницы из АПИ');
  }
}
export default Catalog;
