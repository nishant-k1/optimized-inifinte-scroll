// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import cardsReducer from "../features/cardsSlice";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, cardsReducer);

// Configure the store
export const store = configureStore({
  reducer: {
    cards: persistedReducer,
  },
});

export const persistor = persistStore(store);
