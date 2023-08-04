'use client';

import {configureStore} from '@reduxjs/toolkit'
import productsSlice from './features/productsSlice'
import {TypedUseSelectorHook, useSelector} from "react-redux";
import cartSlice from "@/app/redux/features/cartSlice";
import moneySlice from "@/app/redux/features/moneySlice";

export const store = configureStore({
    reducer: {
        products: productsSlice,
        cart: cartSlice,
        money: moneySlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
