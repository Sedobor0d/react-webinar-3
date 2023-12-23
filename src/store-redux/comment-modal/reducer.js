export const initialState = {
   name: 'newComment',
   parent: {}
}

export default function reducer(state = initialState, action) {
   switch (action.type) {
      case 'comment/open':
         return { ...state, name: action.payload.name, parent: action.payload.parent }
      default:
         return state;
   }
}