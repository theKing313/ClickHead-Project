import { createSlice, createAsyncThunk, current, type PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

/* Types */
export interface CounterSliceState {
    carts: []
    productsCarts: StoreItemProps[]
    // value: { products: [] }
    status: 'idle' | 'loading' | 'failed'
    totalPriceUser: number,
    cartQuantity: number
}

type StoreItemProps = {
    id: number
    title: string
    price: number
    quantity: number
}

const initialState: CounterSliceState = {
    carts: [],//fetchFromLocalStorage()
    productsCarts: [],//getStoreInLocalStorage()
    status: 'idle',
    totalPriceUser: 0,
    cartQuantity: 0
}



export const getAllProducts = createAsyncThunk("get/product", async (userId, thunkApi) => {
    try {
        const response = await axios.get('https://dummyjson.com/carts')
        if (response.data) {
            localStorage.setItem('product', JSON.stringify(response.data))
            console.log(response.data)
        }
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(`error with createAsyncThunk ) ${error} `)
    }
});
export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        reset: (state) => {
            state.status = 'loading'
        },
        decreaseCartQuantity: (state, action: PayloadAction<any>) => {
            if (state.productsCarts.find((item: any) => item.id === action.payload.id)) {
                const tempCart = state.productsCarts.map(item => {
                    if (item.id === action.payload.id) {
                        let tempQty = item.quantity - 1;
                        let tempTotalPrice = tempQty * item.price;
                        return {
                            ...item, quantity: tempQty, totalPrice: tempTotalPrice
                        }
                    } else {
                        return { ...item }
                    }
                })
                state.productsCarts = tempCart;
                state.productsCarts.filter((item: StoreItemProps) => item.quantity !== 0)
            } else {
                console.log(action.payload)
                action.payload.quantity = 1
                state.productsCarts.push(action.payload)
            }
            state.cartQuantity = state.productsCarts?.reduce((acc, item) => item.quantity + acc, 0)
        },
        addToCart: (state, action: PayloadAction<StoreItemProps>) => {
            if (state.productsCarts.find((item: any) => item.id === action.payload.id)) {
                const tempCart = state.productsCarts.map(item => {
                    if (item.id === action.payload.id) {
                        let tempQty = item.quantity + 1;
                        let tempTotalPrice = tempQty * item.price;
                        return {
                            ...item, quantity: tempQty, totalPrice: tempTotalPrice
                        }
                    } else {
                        return { ...item }
                    }
                })
                state.productsCarts = tempCart;
            } else {
                action.payload.quantity = 1
                state.productsCarts.push(action.payload)
            }
            state.cartQuantity = state.productsCarts?.reduce((acc, item) => item.quantity + acc, 0)

            state.totalPriceUser = state.productsCarts?.reduce((acc: number, curItem: StoreItemProps) => {
                const value = state.productsCarts.find((item: any) => curItem.id === item.id)
                const dollarValue = Math.trunc(acc + ((value?.price || 0) * curItem.quantity))
                return dollarValue
            }, 0)
        },
        clearCart: (state) => {
            state.productsCarts = [];
            state.cartQuantity = 0;
            state.totalPriceUser = 0
        },
        getUserPayment: (state, action: PayloadAction<number>) => {
            state.totalPriceUser = action.payload;
        }

    },
    extraReducers: {
        [getAllProducts.pending.toString()]: (state, action: PayloadAction<[]>) => {
            state.status = 'loading'
        },
        [getAllProducts.fulfilled.toString()]: (state, action: PayloadAction<[]>) => {
            state.status = 'idle'
        }
    }
})


export const { reset, addToCart, clearCart, decreaseCartQuantity, getUserPayment } = productSlice.actions

export default productSlice.reducer
