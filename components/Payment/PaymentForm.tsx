"use client"
import { useSelector } from "@/lib/redux/store";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React from "react";
import { Button } from "../ui/button";

export default function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const cardElement = elements?.getElement("card");
    const getUserPayment: number = useSelector((state) => state.product.totalPriceUser)
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (!stripe || !cardElement) {
                return null;
            }
            const { data } = await axios.post("/api/", {
                data: { amount: getUserPayment },
            });
            const clientSecret = data;
            await stripe?.confirmCardPayment(clientSecret, {
                payment_method: { card: cardElement },
            });
        } catch (error) {

            console.log(error);
        }
    }


    return <>
        <form onSubmit={onSubmit} >
            <CardElement />
            <Button className="w-full mt-3" type="submit">Оплата</Button>
        </form>
    </>;
}