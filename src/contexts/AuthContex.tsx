import { UserDTO } from "@dtos/UserDTO";
import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "@services/api";
import { storageUserSave, storageUserGet, storageUserRemove } from '@storage/storageUser'
import { storageAuthTokenGet, storageAuthTokenSave, storageAuthTokenRemove } from '@storage/storageAuthToken'

export type AuthContexDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
  isLoadingUserStorageData: boolean;
  signOut: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContexDataProps>({} as AuthContexDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData)
  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string) {
    try{
      setIsLoadingUserStorageData(true);

      await storageUserSave(user);
      await storageAuthTokenSave(token);
    }catch(error){
      throw error
    }finally{
      setIsLoadingUserStorageData(false);
    }
  }


  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })
      console.log(data)

      if (data.user && data.token) {
        await storageUserAndTokenSave(data.user, data.token)
        userAndTokenUpdate(data.user, data.token);
        storageUserSave(data.user)
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);
      
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove()

    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function updateUserProfile(userUpdated: UserDTO) {
    try{
      setUser(userUpdated)
      await storageUserSave(userUpdated)



    }catch(error){
      throw error
    }
  }

  async function loadeUserData() {
    try {
      setIsLoadingUserStorageData(true)

      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();

      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token)
        setUser(userLogged)
      }

    } catch (error) {
      throw error;

    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadeUserData();
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      isLoadingUserStorageData,
      signOut,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  )
}