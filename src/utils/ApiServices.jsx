import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/',
});

const refreshToken = localStorage.getItem('refreshToken')

const getAccessToken = async () => {

    // console.log("accessToken refreshed 1")
    const response = axios.post('http://localhost:3000/auth/refreshToken', { refreshToken }, {
        headers: {
            "content-Type": "application/json"
        },
        withCredentials: true,
    })

    const result = await response.data()

    console.log("accessToken refreshed 1")

    console.log(await response, result, 21);
    // setExpDate(res.data.expDate);
    try {
        localStorage.setItem('expDate', res.data.expDate);
    } catch (err) {
        console.log("localStorage error:", err);
    }

    // .catch((err) => {
    //     console.log("refresh token error:", err);
    // });

    return response.data
}

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if ((error.response.status === 403 || error.response.status === 401) && !originalRequest._retry) {
            originalRequest._retry = true;

            const response = await getAccessToken();
            console.log(response, 44)
            // const response = await refreshTokens(accessToken);
            if (response.status === 200) {
                // const newAccessToken = response.data.access_token;
                // api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

export default api;