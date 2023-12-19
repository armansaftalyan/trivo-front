import {createContext, useEffect, useState} from "react"
import {RenderMenu, RenderRoutes} from "../structure/RenderNavigation.js";
import instance from "../utils/axiosInstance";
import { useLocation, useNavigate} from 'react-router-dom'

export const AuthContext = createContext();


export const AuthWrapper = () => {
    const location = useLocation();
    const routeName = location.pathname;
    const navigate = useNavigate();
    const [user, setUser] = useState({user: {}, isAuthenticated: false})
    const afterLoginRegister = (data) => {
        setUser({user: data, isAuthenticated: true})
        if(data.token){
            localStorage.setItem('token',data.token)
        }
        navigate("/")
    }
    const logout = () => {
        try {
            instance.post('logout')
            setUser({user: {}, isAuthenticated: false})
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem('token') && !user.isAuthenticated) {
                try {
                    const response = await instance.get('getMe');
                    console.log(response.data)
                    if(response){
                        afterLoginRegister(response.data);
                    }
                    if ((routeName === '/register' || routeName === '/login')) {
                        navigate("/")
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        }
        fetchData();
    }, []);

    return (

        <AuthContext.Provider value={{user, afterLoginRegister, logout}}>
            <>
                <RenderMenu/>
                <RenderRoutes/>
            </>

        </AuthContext.Provider>

    )

}