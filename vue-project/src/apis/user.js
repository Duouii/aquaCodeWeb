import httpInstance from "@/utils/http";

export const getCaptchaAPI = () => {
    return httpInstance({
        url: '/user/captcha'
    })
}