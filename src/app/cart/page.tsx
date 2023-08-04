"use client"

import useLocalStorageState from "use-local-storage-state";
import {addToCart, clearCart, initialState, removeItem} from "@/app/redux/features/cartSlice";
import style from './page.module.scss'
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/redux/store";
import {setPayCoins, setPayDollars} from "@/app/redux/features/moneySlice";
import Modal from "@/component/MessageWindow/MessageWindow";

const Cart = () => {
    const dispatch = useDispatch()
    const [cartProduct, setCart] = useLocalStorageState<initialState>('cartProduct', {})
    const cart = useSelector((state: RootState) => state.cart);
    const [total, setTotal] = useState(0)
    const money = useSelector((state: RootState) => state.money);
    const [mainValute, setValute] = useState('')
    const [result, setResult] = useState(false)
    const cartLength = Object.keys(cart.cart).length

    function addProduct(cart: object) {
        dispatch(addToCart(cart))
    }

    function deleteProduct(cart: object) {
        dispatch(removeItem(cart))
    }

    function setPay(valute: string) {
        setValute(valute)
    }

    function payCoins(total: number) {
        dispatch(setPayCoins(total))
        setResult(true)
        dispatch(clearCart())
    }

    function payDollars(total: number) {
        dispatch(setPayDollars(total))

        dispatch(clearCart())
        setResult(true)

    }

    useEffect(() => {
        setCart(cart)
    }, [cart, setCart, result])


    useEffect(() => {
        let total = 0
        for (let i of Object.values(cart.cart)) {
            total += i.price * i.quantity
        }
        setTotal(total)
    }, [cart])

    return <div> {cartLength ?
        <div className={style.cart}>
            <table className={style.tableCart}>
                <tbody>
                <tr>
                    <th>
                        Title
                    </th>
                    <th>
                        Quantity
                    </th>
                    <th>
                        Price
                    </th>
                </tr>

                {Object.entries(cartProduct).map(([key, value]) => <tr key={key}>
                        <td>{value.title}</td>
                        <td className={style.displayButton}>
                            <button className={style.addDelete} onClick={() => addProduct(value)}>+</button>
                            {value.quantity}
                            <button className={style.addDelete} disabled={!cartProduct[key]}
                                    onClick={() => deleteProduct(value)}>-
                            </button>
                        </td>
                        <td>{value.price * value.quantity}</td>
                    </tr>
                )}
                <tr>
                    <td></td>
                    <td></td>
                    <td className={style.total}>Total: {total}</td>
                </tr>
                <tr>
                    <td>
                        <div>
                            <h3>Payment method</h3>
                            <form>
                                <div className={style.radio}>
                                    <div>
                                        <input type="radio" id="coins"
                                               name="money" value="coins" onChange={() => setPay('coins')}/>
                                        <label htmlFor="coins">Coins</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="dollars"
                                               name="money" value="dollars" onChange={() => setPay('dollars')}/>
                                        <label htmlFor="dollars">Dollars</label>
                                    </div>
                                </div>
                            </form>
                            {mainValute === 'coins' ? <>{
                                    money.coins <= total ?
                                        <h3 className={style.textMessage}>You do not have enough funds to pay for the
                                            purchase.
                                            You can convert currency in "Conversion" tab.</h3> : <div>
                                            <button onClick={() => payCoins(total)}>Pay</button>
                                        </div>
                                }</> :
                                <>{
                                    money.dollars <= total ?
                                        <h3 className={style.textMessage}>You do not have enough funds to pay for the
                                            purchase.
                                            You can convert currency in "Conversion" tab.</h3> : <div>
                                            <button onClick={() => payDollars(total)} type={"button"}>Pay</button>
                                        </div>
                                }</>}
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div> : <h1 className={style.emptyMessage}>Cart is empty...</h1>}
        <div>
            {result ? <Modal visible={true} active={result} setActive={setResult}>
                <h2 className={style.message}>Payment was successful</h2>
            </Modal> : null}
        </div>


    </div>
}

export default Cart;