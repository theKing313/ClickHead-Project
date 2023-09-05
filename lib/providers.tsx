'use client'

/* Core */
import { Provider } from 'react-redux'

/* Instruments */
import { reduxStore, persist } from './redux/store'
//
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(reduxStore)
export const Providers = (props: React.PropsWithChildren) => {
  return (
    <Provider store={reduxStore}>
      {props.children}
      <PersistGate loading={null} persistor={persistor}>

      </PersistGate>
    </Provider>
  )
}
