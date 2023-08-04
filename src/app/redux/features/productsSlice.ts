import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type initialState = {
    value: productState;
}

type productState = {
    products: object,
    totalCount: number,
    currentPage: number,
    fetching: boolean
}

const initialState = {
    value: {
        products: [],
        totalCount: 0,
        currentPage: 0,
        fetching: true,
    } as productState
} as initialState

export const productsSlice = createSlice({
    name: "products",
    initialState: initialState,
    reducers: {
        getProducts(state, action){
            state.value.products = [...state.value.products,...action.payload]
        },
        setTotalCount(state, action){
            state.value.totalCount = action.payload
        },
        setCurrentPage(state){
            state.value.currentPage += 30
        },
        setFetching(state, action){
            state.value.fetching = action.payload
        }
    }
})

export const {getProducts,setTotalCount, setCurrentPage,setFetching} = productsSlice.actions;
export default productsSlice.reducer;