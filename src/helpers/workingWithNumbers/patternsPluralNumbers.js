/**
 * Возвращает правильную форму слова в зависимости от числа.
 * @param number {number} Число для определения формы слова
 * @param template {object} Объект, содержащий правила склонения слова для разных числительных
 * @returns {string} Правильная форма слова
 */
export const endingNumber = (number, template) => {
   const { enOrdinalRules, endings } = template;

   const key = enOrdinalRules.select(number);
   const text = endings[key];

   return text;
}

/**
 * Создает шаблон с правилами склонения числительных на русском языке.
 * @param one {string} Форма слова для числа 1 (единственное число)
 * @param few {string} Форма слова для чисел 2-4 (множественное число)
 * @param many {string} Форма слова для чисел, не попадающих под другие формы
 * @returns {object} Объект с правилами и формами слова.
 */
export const templateNumberRu = (one, few, many) => {
   const enOrdinalRules = new Intl.PluralRules("ru-RU");
   const endings = {
      one: `${one}`,
      few: `${few}`,
      many: `${many}`
   }
   return { enOrdinalRules, endings }
}