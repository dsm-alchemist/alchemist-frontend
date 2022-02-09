import axios, { Method } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
    method: Method;
    url: string;
    headers: any,
    data: any,
}

const BASE_URL = "https://dsm-alchemist.kro.kr";
export const ACCESS_TOKEN = "alchemist_access_token";
export const REFRESH_TOKEN = "alchemist_refresh_token";

export const requestWithoutAccesToken = ({ method, url, headers, data }: Props) => {
    return axios({
        method,
        url: BASE_URL + url,
        headers,
        data,
    }).then((res) => {
        return res;
    }).catch((err) => {
        throw new Error(err);
    });
}

export const requestWithAccessToken = ({ method, url, headers, data }: Props) => {
    return axios({
        method,
        url: BASE_URL + url,
        headers: { ...headers, },
        data,
    }).then((res) => {
        return res;
    }).catch((err) => {
        throw new Error(err);
    })
}