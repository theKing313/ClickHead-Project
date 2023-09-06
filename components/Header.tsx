'use client';
/* Components */
import React, { useEffect, useState } from 'react'
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { InferGetStaticPropsType, GetStaticProps, GetServerSideProps } from 'next'
import { useDispatch, useSelector } from '@/lib/redux/store'
import { Button } from "@/components/ui/button"
import { SlBasketLoaded } from 'react-icons/sl';

import { clearCart, getUserPayment } from '@/lib/redux/slices/productSlice/productSlice';

// 

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "@/components/Payment/PaymentForm";
type StoreItemProps = {
    id: number
    title: string
    price: number
    quantity: number
}
// Make sure you load stripe outside the component, otherwise stripe will render every time and you definitely do not want that.
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
export default function Header() {
    const products: StoreItemProps[] = useSelector((state) => state.product.productsCarts)
    const dispatch = useDispatch()
    const [basket, setBasket] = useState(false)
    const quantity: number = useSelector((state) => state.product.cartQuantity)
    // 


    return (
        <>
            <div className="flex flex-col md:flex">
                <div className="border-b">
                    <div className="flex-1 space-y-4 p-8 pt-6">
                        <div className="flex items-center justify-between space-y-2">
                            <div className="hidden md:flex">
                                LOGO
                            </div>
                            <div className=" w-full justify-between md:justify-end relative flex items-center space-x-2 gap-x-3">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>

                                {basket &&

                                    <div className='absolute z-20 md:right-6 md:top-20 top-20 right-0 '>
                                        <div className="rounded-sm h-full max-w-[400px] bg-slate-700 flex flex-col gap-y-7">
                                            {products?.map((product: StoreItemProps) => {
                                                return (product.quantity !== 0 && (
                                                    <div key={product.id} className='p-5 md:p-6 flex justify-center flex-col items-center h-[90%] w-[90%] m-auto'>
                                                        <div className=""><img className='max-w-full h-full object-cover rounded-sm' src='https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp' alt="" /></div>
                                                        <div className='text-xs'>{product?.title}</div>

                                                        <div className="">{product.quantity}</div>
                                                    </div >
                                                ))

                                            })}
                                            {/* <ShoppingCart /> */}
                                            <div className="total">

                                                Total price :   $
                                                {
                                                    products?.reduce((acc: number, curItem: StoreItemProps) => {
                                                        const value = products.find((item: StoreItemProps) => curItem.id === item.id)
                                                        const dollarValue = Math.trunc(acc + ((value?.price || 0) * curItem.quantity))
                                                        // PaymentPrice = dollarValue
                                                        // setPaymentPrice(dollarValue)

                                                        return dollarValue
                                                    }, 0)
                                                }
                                            </div>
                                            <div className="">
                                                USD Coin :
                                                {
                                                    products?.reduce((acc: number, curItem: StoreItemProps) => {
                                                        const value = products.find((item: any) => curItem.id === item.id)
                                                        const dollarValue = Math.trunc(acc + ((value?.price || 0) * curItem.quantity))
                                                        const conversionToCoin = dollarValue * 1
                                                        return conversionToCoin
                                                    }, 0)
                                                }
                                            </div>
                                            {/* {<StripeContainer />} */}
                                            <Elements stripe={stripePromise}>
                                                <PaymentForm />
                                            </Elements>
                                            {products && <Button className='bg-red-500' onClick={() => dispatch(clearCart())}>clearCart</Button>}

                                        </div>



                                    </div>
                                }
                                <Button className='text-slate-400 text-3xl relative bg-inherit h-full rounded-full' onClick={() => setBasket(!basket)}>
                                    <SlBasketLoaded />
                                    <div className="absolute left-12 bottom-7 text-[#DA00FE] text-sm font-medium rounded-full bg-white w-4 h-4 flex items-center justify-center">
                                        {/* {quantity} */}
                                        {/* {products?.reduce((acc: number, item: StoreItemProps) => item.quantity + acc, 0)} */}
                                    </div>

                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}