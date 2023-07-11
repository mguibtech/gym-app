import { HStack, Heading, Text, VStack, Icon } from "native-base";
import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

import { UserPhoto } from "./UserPhoto";


export function HomeHeader() {
    return (
        <HStack background='gray.600' pt={16} pb={5} px={8} alignItems='center'>
            <UserPhoto
                source={{ uri: 'https://github.com/mguibtech.png' }}
                alt="Imagem do usuário"
                mr={4}
                size={16}
            />
            <VStack flex={1}>
                <Text color='gray.100' fontSize='md'>
                    Olá
                </Text>

                <Heading color='gray.100' fontSize='md' fontFamily='heading'>
                    Guibson
                </Heading>
            </VStack>

            <TouchableOpacity>
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