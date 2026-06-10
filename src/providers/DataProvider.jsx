"use client";
import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store/store";
import { Provider } from "react-redux";
import { Modal } from "@/components/Modal";
import { LoadingScreen } from "@/components/LoadingScreen";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [myInfo, setMyInfo] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [globalError, setGlobalError] = useState({});

    const getData = async () => {
        try {
            const [meResponse, reviewsResponse] = await Promise.all([
                axios.get("/api/me"),
                axios.get("/api/reviews")
            ]);
            setMyInfo(meResponse.data);
            setReviews(reviewsResponse.data);
        } catch (e) {
            setMyInfo(null);
        } 
    }

    useEffect(() => {
        getData();
    }, []);

    return <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <DataContext.Provider value={{ myInfo, reviews, setReviews, globalError, setGlobalError }}>
            <PersistGate loading={null} persistor={persistor}>
                <Provider store={store}>
                    {myInfo ? children : <LoadingScreen />}
                    <Modal />
                </Provider>
            </PersistGate>
        </DataContext.Provider>
    </GoogleOAuthProvider>
}

export const useMe = () => {
    const { myInfo } = useContext(DataContext);
    return myInfo;
}

export const useReviews = () => {
    const { reviews, setReviews } = useContext(DataContext);
    return { reviews, setReviews };
}

export const useGlobalError = () => {
    const { globalError, setGlobalError } = useContext(DataContext);
    return { globalError, setGlobalError };
}
