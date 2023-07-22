import { HStack, Heading, Text, VStack, Icon } from "native-base";
import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

import userAvatarDefault from '@assets/userPhotoDefault.png';

import { UserPhoto } from "./UserPhoto";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";


export function HomeHeader() {

    const {user, signOut} = useAuth();

    return (
        <HStack background='gray.600' pt={16} pb={5} px={8} alignItems='center'>
            <UserPhoto
                source={ 
                    user.avatar 
                    ?  { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } 
                    : userAvatarDefault}
                alt="Imagem do usuário"
                mr={4}
                size={16}
            />
            <VStack flex={1}>
                <Text color='gray.100' fontSize='md'>
                    Olá
                </Text>

                <Heading color='gray.100' fontSize='md' fontFamily='heading'>
                    {user.name}
                </Heading>
            </VStack>

            <TouchableOpacity onPress={signOut}>
                <Icon
                    as={MaterialIcons}
                    name="logout"
                    size={7}
                    color='gray.200'
                />
            </TouchableOpacity>
        </HStack>
    )
}