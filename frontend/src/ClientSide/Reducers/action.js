export const Fetch = (cart_total) =>({
 type:'Fetch',
 payload:{cart_total}
})

export const Increment = ()=>({
 type:'Increment',
})
export const Decrement = ()=>({
 type:'Decrement',
})
export const Reset = ()=>({
 type:'Reset',
})