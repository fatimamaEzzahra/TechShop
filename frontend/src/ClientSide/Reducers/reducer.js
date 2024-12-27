const initState={cart_total:0};
const Reducer = (state = initState,action)=>{
 switch(action.type){
  case 'Fetch':
    return ({ ...state,cart_total:action.payload.cart_total})
  case 'Increment':
    return ({...state,cart_total:state.cart_total+1})
    case 'Decrement':
      return ({...state,cart_total:state.cart_total-1})
  case 'Reset':
    return ({...state,cart_total:0})
  default:
    return state
 }
}
export {Reducer}