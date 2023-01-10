import React, { useEffect } from 'react';
import { ReactNode, useState } from 'react';
import { User } from '../../interfaces/user';
import { Decode } from '../../interfaces/user';
import { Api } from '../../services/api';


interface UserContextValue {
    user: User | undefined | any;
    setUser: (data: User | undefined | any) => void;
    getUser: (decode:object | unknown,token:string) => void
}

interface Props {
    children: ReactNode
}

const UserInitial: UserContextValue = {
    user: 
        {}
    ,
    setUser: data => { },
    getUser: () => {}
    
}

export const UserContex = React.createContext<UserContextValue>(UserInitial)



export const UserProvider = ({ children }: Props) => {
    const [user, setUser] = useState(UserInitial.user)
    
    const getUser = (decode:any,token:string) => {
        
        Api.get(`users/${decode.sub}`,{
            headers:{
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            setUser(res.data)
        })
        .catch((err) => {console.log(err)})
    }
    return (
        <UserContex.Provider value={{user,setUser,getUser}}>
            {children}
        </UserContex.Provider>
    );
};
