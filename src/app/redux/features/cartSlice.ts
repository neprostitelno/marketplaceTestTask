import {createSlice} from '@reduxjs/toolkit'


export type initialState = {
    [key: string | number]: object
}

const initialState: initialState = {} as initialState

export const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemInCart = state[action.payload.id];
            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                state[action.payload.id] = {...action.payload, quantity: 1}
            }
        },
        removeItem: (state, action) => {
            const removeItem = state[action.payload.id];
            if (removeItem.quantity === 1) {
                delete state[action.payload.id]
            } else {
                removeItem.quantity--;
            }
        },
        clearCart: () => initialState

    },
})

export const {
    addToCart,
    clearCart,
    removeItem,
} = cartSlice.actions;
export default cartSlice.reducer;