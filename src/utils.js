const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

/**
 * Возвращает правильную форму слова "раз" в зависимости от числа.
 * @param number {number} Число
 * @returns {string} Форма слова "раз(а)"
 */
export const getTextHowManyTimes = (number) => {
  let lastTwoDigits = number % 100;
  if (lastTwoDigits >= 5 && lastTwoDigits <= 21) return "раз";

  let lastDigit = number % 10;
  if (lastDigit >= 2 && lastDigit <= 4) return "раза";
  else return "раз";
}

/**
 * Возвращает текст с информацией о совершенных выделений и правильной форме слова "раз".
 * @param selected {boolean} Флаг выбора, выделен элемент или нет
 * @param countSelect {number} Количество совершенных выделений
 * @returns {string} Текст с информацией
 */
export const getTextCountSelected = (selected = false, countSelect = 0) => {
  if (!selected) return ''

  const text = getTextHowManyTimes(countSelect)

  return ` | Выделяли ${countSelect} ${text}`
}