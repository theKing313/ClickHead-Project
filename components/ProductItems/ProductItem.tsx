'use client'
import { Button } from "@/components/ui/button"
import { useDispatch } from '@/lib/redux/store'
import React, { useEffect, useState } from 'react'
import { addToCart, decreaseCartQuantity, getUserPayment } from '@/lib/redux/slices/productSlice/productSlice'
import { useSelector } from '@/lib/redux/store'
type StoreItemProps = {
    id: number
    title: string
    price: number
}
export default function ProductItem({ id, title, price }: StoreItemProps) {
    const dispatch = useDispatch()
    const cartItems: any = useSelector((state) => state.product.productsCarts)
    const quantity: any = useSelector((state) => state.product.cartQuantity)
    const getQuen = cartItems.find((item: StoreItemProps) => item.id === id)?.quantity || 0

    return (
        <div key={id} className={`${id}`}>
            { }
            <div className="w-full h-full p-1 md:p-9 flex flex-col gap-y-7">
                <img
                    alt="gallery"
                    className="block h-full w-full rounded-lg object-cover object-center"
                    src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp" />
                <div >{title} </div>
                <div className="">${price}</div>
                {getQuen != 0 ?
                    <div
                        className='w-full flex justify-around items-center'
                    >
                        <Button onClick={() => {
                            dispatch(decreaseCartQuantity({ id: id, title: title, price: price, quantity: quantity }))
                        }}>-</Button>
                        <div className="">Add to cart</div><Button onClick={() => {
                            dispatch(addToCart({ id: id, title: title, price: price, quantity: quantity }))
                        }}>+</Button> </div>
                    : <Button variant="outline" onClick={() => { dispatch(addToCart({ id: id, title: title, price: price, quantity: quantity })) }}>Add to carte</Button>
                }

            </div>
        </div>
    )


}