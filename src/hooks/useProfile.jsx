import { useEffect, useState } from "react";
import fetcher from "../api";

const useProfile = (data)=>{
    const [profile,setProfile]=useState(false)
    const token = localStorage.getItem("accessToken")
    useEffect(() => {
       token && (async () => {
            const result = await fetcher.get("api/user/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(result);
            setProfile(result?.data?.data?.isAdmin)
        })();
    }, []);
    return profile;
}
export default useProfile;