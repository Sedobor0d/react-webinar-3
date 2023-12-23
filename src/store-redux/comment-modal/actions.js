export default {
   open: (name, parent) => {
      return { type: 'comment/open', payload: { name, parent } }
   },
}