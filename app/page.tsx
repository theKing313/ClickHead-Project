"use client";
/* Instruments */
import {
  useSelector,
  useDispatch,
} from '@/lib/redux/store'
import { getAllProducts } from '@/lib/redux/slices/productSlice/productSlice';
import Product from '../components/ProductItems/Product';
import Header from '../components/Header';
import { useEffect, useState } from 'react';

export default function IndexPage() {
  const status: any = useSelector((state) => state.product.status)


  return (
    <>
      {/* status === 'idle' */}
      {status !== 'loading' &&
        <>
          <Header />
          <main className='py-5'>
            {<Product />}
            <div>

              {/* {JSON.stringify(products)} */}

            </div>
          </main>
        </>

      }

    </>

  )
}

// export const metadata = {
//   title: 'Redux Toolkit',
// }
