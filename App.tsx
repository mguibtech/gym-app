import { Text, View, StatusBar } from 'react-native';
import { NativeBaseProvider, Box } from 'native-base'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { THEME } from './src/theme';
import { Loading } from '@components/Loading';
import { SignIn } from '@screens/Signing';
import { SignUp } from '@screens/SignUp';
import { Routes } from '@routes/index';
import { Home } from '@screens/Home';
import { Profile } from '@screens/Profile';
import { AuthContextProvider } from '@contexts/AuthContex';

export default function App() {

  const [fonstsLoad] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        {fonstsLoad ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}

