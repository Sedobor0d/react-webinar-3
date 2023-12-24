export default function formatDate(dateTimeString, t) {
   const months = [
      'comment.january',
      'comment.february',
      'comment.march',
      'comment.april',
      'comment.may',
      'comment.june',
      'comment.july',
      'comment.august',
      'comment.september',
      'comment.october',
      'comment.november',
      'comment.december'
   ];
   const date = new Date(dateTimeString);
   const day = date.getDate();
   const month = date.getMonth();
   const year = date.getFullYear();
   const hours = date.getHours();
   const minutes = date.getMinutes();

   const formattedDate = `${day} ${t(months[month])} ${year} ${t('comment.in')} ${hours}:${minutes}`;

   return formattedDate;
}