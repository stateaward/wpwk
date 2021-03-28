import axios from "axios";
import { API_BASE_URL } from "../config";
import store from "@/store/store"
import router from "../router/router"

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(errors) {

    // 탈퇴한 회원인 경우
    if(errors.response.status === 422) {
      alert("비활성화된 회원입니다 관리자에게 문의해주세요")
      localStorage.removeItem("accessToken");
    }

    // 권한이 없는 경우
    if(errors.response.status === 403) {
      if(errors.response.data === "email") {
        localStorage.removeItem("accessToken");
        alert("이메일을 인증해주세요")
      } else {        
        router.push("/");
      }
    }

    // 세션이 만료된 경우
    else if(errors.response.status === 401 
      && localStorage.getItem('accessToken') != null) {
      store.dispatch("expired") 
    } 
    return Promise.reject(errors);
  }
)


export { instance };