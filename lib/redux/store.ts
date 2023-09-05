/* Core */
// 'use client'
import {
  persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
// 
import { configureStore, combineReducers, type ThunkAction, type Action } from '@reduxjs/toolkit'
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from 'react-redux'
import productSlice from './slices/productSlice/productSlice'
/* Instruments */
// import { reducer } from './rootReducer'
// import { middleware } from './middleware'



const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  // blacklist: ['carts', 'productsCarts', 'status', 'totalPriceUser', 'cartQuantity'],
}
const rootReducer = combineReducers({
  // auth: persistReducer(authPersistConfig,authReducer),
  product: productSlice,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export const persist = persistStore(reduxStore)
//  default reduxStore


export const useDispatch = () => useReduxDispatch<ReduxDispatch>()
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector

/* Types */
export type ReduxStore = typeof reduxStore
export type ReduxState = ReturnType<typeof reduxStore.getState>
export type ReduxDispatch = typeof reduxStore.dispatch
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>
