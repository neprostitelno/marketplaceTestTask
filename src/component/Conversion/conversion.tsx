"use client"

import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import Modal from "@/component/MessageWindow/MessageWindow";
import style from './conversion.module.scss'
import {conversionMoney} from "@/app/redux/features/moneySlice";
import {useDispatch} from "react-redux";

const Conversion = () => {
    const dispatch = useDispatch()

    const [result, setResult] = useState(false);
    const {register, handleSubmit, reset} = useForm();

    const onSubmit = (data) => {
        dispatch(conversionMoney(data))
    }

    useEffect(() => {
        reset({
            data: 'count'
        })
    }, [result])


    return <div>
        <h1 className={style.title} onClick={() => setResult(true)}>Conversion</h1>
        {result ? <Modal visible={true} active={result} setActive={setResult}>
            <h2 className={style.conversion}>Conversion</h2>
            <form className={style.form} onSubmit={handleSubmit(onSubmit)} id='form'>
                <div>Enter amount:
                    <input {...register("count", {required: true})}/>
                </div>

                Select currencies:<br/>from
                <select id='selectFrom' name='selectFrom' {...register("from", {required: true})}>
                    <option value='Coins'>Coins</option>
                    <option value='Dollars'>Dollars</option>
                </select>
                to
                <select id='selectTo' {...register("to", {required: true})}>
                    <option value={'Coins'}>Coins</option>
                    <option value={'Dollars'}>Dollars</option>
                </select>
                <div>
                    <button type={"submit"}>Ok</button>
                    <button onClick={() => setResult(false)}>Cancel</button>
                </div>
            </form>
        </Modal> : null}
    </div>
}

export default Conversion;