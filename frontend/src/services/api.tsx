import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// レスポンスの共通エラーハンドリング
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "";

    if (!error.response) {
      message = "ネットワークエラーです。インターネット接続を確認してください。";
    } else if (error.response.status >= 500) {
      message = "サーバーで問題が発生しました。しばらくしてから再度お試しください。";
    } else if (error.response.data?.message) {
      message = error.response.data.message;
    } else {
      message = "予期しないエラーが発生しました。";
    }

    alert(message); 
    error.message = message;

    return Promise.reject(error);
  }
);

export default axiosInstance;