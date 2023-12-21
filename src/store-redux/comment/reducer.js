export const initialState = {
   _id: '',
   text: '',
   dateCreate: '',
   parent: {
      _id: '',
      _type: ''
   },
}

export default function reducer(state = initialState, action) {
   switch (action.type) {
      case 'comment/add':
         return { ...state, }

      default:
         break;
   }
}