import axios from "axios";

const getLocation = async (id) => {
    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_IP_INFO_API}/${id}`);
        return data?.city;
    } catch (e) {
        return undefined;
    }
}

export const getLocationCity = async () => {
    try {
        const { data } = await axios.get(process.env.NEXT_PUBLIC_IP_API);
        if (data?.ip) {
            return { city: getLocation(data.ip) || "Unknown"};
        }
        return { city: "Unknown" };
    } catch (e) {
        return { city: "Unknown" };
    }
}