import axios, { AxiosError, AxiosRequestConfig } from "axios";

const baseURL = "https://dsm-alchemist.kro.kr";

const instance = axios.create({
    baseURL,
    timeout: 100000,
});

instance.interceptors.request.use(
    function (config: AxiosRequestConfig) {
        return config;
    },
    function (error: AxiosError) {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const { config, response } = error;

        if (response.status === 401 && localStorage.getItem("alchemist_refresh_token")) {
            try {
                const res = await axios({
                    method: "put",
                    url: `${baseURL}/refresh`,
                    data: {
                        "refreshToken": localStorage.getItem("alchemist_refresh_token"),
                    },
                });

                const { access_token, refresh_token } = res.data;

                localStorage.setItem("alchemist_refresh_token", refresh_token);
                localStorage.setItem("alchemist_access_token", access_token);
                config.headers.Authorization = `Bearer ${access_token}`;

                return axios(config);
            } catch (err: any) {
                if (err.response.status === 401) {
                    alert("로그인 기간이 만료 되었습니다.");
                    window.location.href = "/signin";
                    localStorage.clear();
                }
            }
        }
        return Promise.reject(error);
    }
)

export default instance;