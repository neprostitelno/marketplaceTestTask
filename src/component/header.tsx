"use client"

import Link from "next/link";
import {useSelector} from "react-redux";
import {RootState} from "@/app/redux/store";
import Conversion from "@/component/Conversion/conversion";

const Header = () => {

    const money = useSelector((state: RootState) => state.money);

    return <header>
        <h1><Link href = "/">Products</Link></h1>
        <h1><Link href = "/cart">Cart</Link></h1>
        <h1>Coins: {money.coins}</h1>
        <h1>$: {money.dollars}</h1>
        <Conversion/>
    </header>
}
export {Header}