import { useContext } from "react";

import { AuthContext } from '@contexts/AuthContex';

export function useAuth(){
  const contex = useContext(AuthContext);

 return contex;
}