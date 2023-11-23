/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.сode = this.getInitBaseCode(initState.list)
  }

  /** 
   * Получить самый большой code(id)
   * @param {Array<Object>} initState - Массив объектов, где каждый объект имеет свойство "code" (id).
   * @returns {number} largeCode - Число с самым большим значением code (id).
   */
  getInitBaseCode(initState) {
    let largeCode = 0
    for (const iterator of initState) {
      let codeValue = Object.values(iterator)[0]

      if (codeValue > largeCode) largeCode = codeValue
    }
    return largeCode
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
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Создать и вернуть новый код (id)
   * @returns {number} newCode - Новый идентификатор.
   */
  getGenerateId() {
    const newCode = this.сode + 1
    this.сode = newCode
    return newCode
  }
  /**
   * Добавление новой записи
   */
  addItem() {
    const newCode = this.getGenerateId();
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: 'Новая запись', countSelect: 0 }]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          if (item.selected !== true) item.countSelect += 1
          item.selected = !item.selected;
        } else {
          item.selected = false;
        }
        return item;
      })
    })
  }
}

export default Store;
