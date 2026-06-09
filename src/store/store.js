import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./user.slice";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";

const persistedCondig = {
    key: "pf-root",
    storage: storage.default ?? storage
}

const combinedReducer = combineReducers({
    user: userReducer
})

const persistedReducer = persistReducer(persistedCondig, combinedReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ["persist/PERSIST"]
        }
    })
})

export const persistor = persistStore(store);

