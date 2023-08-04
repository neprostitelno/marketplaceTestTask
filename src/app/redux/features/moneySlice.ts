import {createSlice} from '@reduxjs/toolkit'


export type initialState = {}

const initialState: initialState = {
    coins: 10000,
    dollars: 10000
} as initialState

export const moneySlice = createSlice({
    name: "money",
    initialState: initialState,
    reducers: {
        setPayCoins(state, action){
            state.coins -= action.payload
        },
        setPayDollars(state, action){
            state.dollars -= action.payload
        },
        conversionMoney(state, action){

            if(action.payload.from === 'Dollars' && action.payload.to === 'Coins'&&
                state.dollars>=Number(action.payload.count)){
                state.coins += Number(action.payload.count)
                state.dollars -= action.payload.count
            } else if(action.payload.from === 'Coins' && action.payload.to === 'Dollars'&&
            state.coins >= Number(action.payload.count)){
                state.coins -= action.payload.count
                state.dollars += Number(action.payload.count)
            }else if(action.payload.from === 'Dollars' && action.payload.to === 'Dollars'){

            }if(action.payload.from === 'Coins' && action.payload.to === 'Coins'){

            }
        }
    }
})

export const {setPayCoins, setPayDollars,conversionMoney} = moneySlice.actions;
export default moneySlice.reducer;