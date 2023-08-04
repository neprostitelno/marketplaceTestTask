"use client"
import axios from 'axios';
import {getProducts, setCurrentPage, setFetching, setTotalCount} from '@/app/redux/features/productsSlice'
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "@/app/redux/store";
import React, {useEffect, useState} from "react";
import style from './page.module.scss'
import {addToCart, initialState, removeItem} from "@/app/redux/features/cartSlice";
import useLocalStorageState from 'use-local-storage-state'

export default function Products() {
    const dispatch = useDispatch()
    const {value} = useSelector((state: RootState) => state.products);
    const cart = useSelector((state: RootState) => state.cart);
    const [cartProduct, setCart] = useLocalStorageState<initialState>('cartProduct', {})

    useEffect(() => {
        if (value.fetching) {
            const product = async () => {
                try {
                    const res = await axios.get(`https://dummyjson.com/products?limit=30&skip=${value.currentPage}`)
                    dispatch(getProducts(res.data.products))
                    dispatch(setTotalCount(res.data.total))
                    dispatch(setCurrentPage())
                    dispatch(setFetching(false))
                } catch (e) {
                    console.log(e)
                }
            }
            product()
        }
    }, [value.fetching])


    React.useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
            && value.products.length <= value.totalCount) {
            dispatch(setFetching(true))
        }
    }

    function addProduct(cart) {
        dispatch(addToCart(cart))

    }

    function deleteProduct(cart) {
        dispatch(removeItem(cart))
    }

    useEffect(() => {
        setCart(cart)
    }, [cart, setCart])

    return <div className={style.products}>
        {value.products.map((p, index) => <div key={index} className={style.aProduct}>
            <img alt={p.title} src={p.images[0]}/>
                <div className={style.data}>
                    <div>{p.title}</div>
                    <div>Price: {p.price}</div>
                </div>
                <div>
                    <button className={style.buttonProduct} onClick={() => addProduct(p)}>+</button>
                    {cart[p.id] ? cart[p.id].quantity : 0}
                    <button className={style.buttonProduct}  disabled={!cart[p.id]} onClick={() => deleteProduct(p)}>-</button>
                </div>
        </div>)
        }
    </div>
}
