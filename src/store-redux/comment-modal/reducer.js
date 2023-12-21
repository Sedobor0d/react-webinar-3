export const initialState = {
   name: ''
}

export default function reducer(state = initialState, action) {
   switch (action.type) {
      case 'comment/open':
         return { ...state, name: action.payload.name }
      case 'comment/close':
         return { ...state, name: '' }
      default:
         return state;
   }
}