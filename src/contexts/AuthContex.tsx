import { UserDTO } from "@dtos/UserDTO";
import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "@services/api";
import { storageUserSave, storageUserGet, storageUserRemove } from '@storage/storageUser'

export type AuthContexDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
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

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })

      if (data.user) {
        setUser(data.user)
        storageUserSave(data.user);
      }
    } catch (error) {
      throw error;
    }
  }


  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);
      await storageUserRemove()

    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function loadeUserData() {
    try {
      const userLogged = await storageUserGet();

      if (userLogged) {
        setUser(userLogged)
        setIsLoadingUserStorageData(false)
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
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}