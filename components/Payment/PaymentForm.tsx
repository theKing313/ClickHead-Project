"use client"
import { useDispatch, useSelector } from "@/lib/redux/store";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { use, useState } from "react";
import { Button } from "../ui/button";
import { clearCart } from "@/lib/redux/slices/productSlice/productSlice";
// Dialog
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
export default function PaymentForm() {
    const [success, setSuccess] = useState(false)
    const stripe = useStripe();
    const elements = useElements();
    const cardElement = elements?.getElement("card");
    const getUserPayment: number = useSelector((state) => state.product.totalPriceUser)
    const dispatch = useDispatch()

    const [load, setLoad] = useState(false)

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setLoad(true)
            if (!stripe || !cardElement) {
                return null;
            }
            const { data } = await axios.post("/api/", {
                data: { amount: getUserPayment },
            });
            const clientSecret = data;
            if (data !== null && clientSecret !== undefined) {
                setSuccess(!success)
                dispatch(clearCart())
            }
            const statusStripe = await stripe?.confirmCardPayment(clientSecret, {
                payment_method: { card: cardElement },
            });
            setLoad(false)
        } catch (error) {

            console.log(error);
        }
    }


    return <>
        {success ?
            <div className="text-green-400">Успешная Оплата !</div>
            :
            <Dialog>
                <DialogTrigger asChild>
                    {getUserPayment !== 0 && <Button variant="outline">Оплата</Button>}

                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Оплата</DialogTitle>
                        <DialogDescription >
                            <div className="mt-3">Total price : ${getUserPayment}</div>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <form onSubmit={onSubmit} >
                            <CardElement />

                            <div className="flex flex-col gap-y-3 w-full" >
                                <Button className="w-full mt-3" type={"submit"} >Оплата</Button>
                                <div className="text-base text-slate-200 self-center">{load && 'loading...'}</div>
                            </div>

                        </form>
                    </div>
                </DialogContent>
            </Dialog>

        }

    </>;
}
































