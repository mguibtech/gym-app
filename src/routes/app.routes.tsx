import { useTheme } from 'native-base'
import { Platform } from 'react-native'
import { createBottomTabNavigator, BottomTabNavigationProp}  from '@react-navigation/bottom-tabs'

import HomeSvg from '@assets/home.svg'
import HistorySvg from '@assets/history.svg'
import ProfileSvg from '@assets/profile.svg'


import { Exercise } from '@screens/Exercise';
import { History } from '@screens/History';
import { Home } from '@screens/Home';
import { Profile } from '@screens/Profile';

type AppRoutes = {
    home: undefined;
    exercise: undefined;
    history: undefined;
    profile: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();



export function AppRoutes(){

    const { sizes, colors } = useTheme()

    const iconSizes =sizes[7]

    return(
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: colors.green[500],
                tabBarInactiveTintColor: colors.gray[200],
                tabBarStyle:{
                    backgroundColor: colors.gray[600],
                    borderTopWidth: 0,
                    height: Platform.OS === 'android' ? 'auto' : 96,
                    paddingBottom: sizes[8],
                    paddingTop: sizes[10]
                }
            }}
        >
            <Screen
                name='home'
                component={Home}
                options={{
                    tabBarIcon:({color}) => (
                        <HomeSvg fill={color} width={iconSizes} height={iconSizes}/>
                    )
                }}
            />
            <Screen
                name='history'
                component={History}
                options={{
                    tabBarIcon:({color}) => (
                        <HistorySvg fill={color} width={iconSizes} height={iconSizes}/>
                    )
                }}
            />
            <Screen
                name='profile'
                component={Profile}
                options={{
                    tabBarIcon:({color}) => (
                        <ProfileSvg fill={color} width={iconSizes} height={iconSizes}/>
                    )
                }}
            />
            <Screen
                name='exercise'
                component={Exercise}
                options={{tabBarButton: () => null}}
            />
        </Navigator>
    )
}