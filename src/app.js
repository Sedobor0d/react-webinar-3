import React from 'react';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;

  const getTextHowManyTimes = (number) => {
    let lastTwoDigits = number % 100;
    if (lastTwoDigits >= 5 && lastTwoDigits <= 21) return "раз";

    let lastDigit = number % 10;
    if (lastDigit >= 2 && lastDigit <= 4) return "раза";
    else return "раз";
  }

  const getTextCountSelected = (selected, countSelect) => {
    if (!selected) return ''

    const text = getTextHowManyTimes(countSelect)

    return ` | Выделяли ${countSelect} ${text}`
  }

  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>{
          list.map(item =>
            <div key={item.code} className='List-item'>
              <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(item.code)}>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>
                  {item.title}
                  {getTextCountSelected(item.selected, item.countSelect)}
                </div>
                <div className='Item-actions'>
                  <button onClick={() => store.deleteItem(item.code)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
