import { createContext, useState, useEffect } from 'react'

export const authContext = createContext()

// creamos un contexto que envolvera a toda la aplicacion verificando el token 

const AuthContextProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        auth: false,
        token: null
    })

    const IsData = localStorage.getItem('token')

    useEffect(() => {
        if(IsData) {
            setAuth({
                auth: true,
                token: JSON.parse(IsData)
            })
        }
    }, [])

    return (
        <authContext.Provider value={{auth, setAuth}}>
            {children}
        </authContext.Provider>
    )
}

export default AuthContextProvider