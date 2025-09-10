import { configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import authReducer from "./authSlice"
import eventReducer from "./eventSlice"
import ticketReducer from "./ticketSlice"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], 
}

const persistedAuth = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: {
    auth: persistedAuth,
    event: eventReducer,
    ticket : ticketReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


