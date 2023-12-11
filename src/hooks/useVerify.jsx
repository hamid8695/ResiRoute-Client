import { useEffect, useState } from "react";
import fetcher from "../api";

const useVerify = () => {
  
    const token = localStorage.getItem("accessToken")
    // useEffect(() => {
    //    token && (async () => {
    //         const result = await fetcher.get("api/user/me", {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         })
    //         setUser(result?.data)
    //     })();
    // }, []);
    return [token];
}
export default useVerify;