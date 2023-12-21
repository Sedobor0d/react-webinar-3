export default function formatDate(dateTimeString) {
   const months = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
   ];
   const date = new Date(dateTimeString);
   const day = date.getDate();
   const month = date.getMonth();
   const year = date.getFullYear();
   const hours = date.getHours();
   const minutes = date.getMinutes();

   const formattedDate = `${day} ${months[month]} ${year} в ${hours}:${minutes}`;

   return formattedDate;
}