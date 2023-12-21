export default {
   open: (name) => {
      return { type: 'comment/open', payload: { name } }
   },
   close: () => {
      return { type: 'comment/close' }
   }
}