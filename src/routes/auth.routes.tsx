import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SignUp } from '@screens/SignUp';
import { SignIn } from '@screens/Signing';

type AuthRoutes = {
    signIn: undefined;
    signUp: undefined;
}

export type AuthNavigatorRoutesProps =  NativeStackNavigationProp<AuthRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes(){
    return(
        <Navigator 
        screenOptions={{
            headerShown: false,
            animation: 'slide_from_bottom'
        }}>
            <Screen
                name='signIn'
                component={SignIn}
            />
            <Screen
                name='signUp'
                component={SignUp}
            />
        </Navigator>
    )
}