import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from 'react-router-dom'
import "./index.css"
import App from "./App"

import authReducer from "./reducers/auth/Auth"
import invoiceReducer from './reducers/invoices/Invoices'
//import clientReducer from "./reducers/clients/clients"
//import productReducer from './reducers/products/products'

import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { PersistGate } from "redux-persist/integration/react"

import { disableReactDevTools } from '@fvilers/disable-react-devtools'

const persistConfig = { key: "root", storage, version: 1 }
const rootReducer = combineReducers({ authReducer, invoiceReducer })
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    devTools: false
})

if(process.env.NODE_ENV === 'production') disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
