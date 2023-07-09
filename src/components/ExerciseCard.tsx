import { HStack, Heading, Image, Text, VStack, Icon } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Entypo } from '@expo/vector-icons'

type Props = TouchableOpacityProps & {

}

export function ExerciseCard({ ...rest }: Props) {
    return (
        <TouchableOpacity {...rest}>
            <HStack bg='gray.500' alignItems='center' p={2} pr={4} rounded='md' mb={3}>
                <Image
                    source={{ uri: 'https://static.wixstatic.com/media/2edbed_84ce8d8c0cb9412faae76c279e24863f~mv2.jpeg/v1/fit/w_320%2Ch_474%2Cal_c%2Cq_80,enc_auto/file.jpeg' }}
                    alt='Imagem do exercicio'
                    w={16}
                    h={16}
                    rounded='md'
                    marginRight={4}
                    resizeMode='center'
                />

                <VStack flex={1}>
                    <Heading fontSize='lg' color='white'>
                        Remada Unilateral
                    </Heading>

                    <Text fontSize='sm' color='gray.200' mt={1} numberOfLines={2}>
                        3 séries de 12 repetições lor
                    </Text>
                </VStack>
                <Icon 
                    as={Entypo}
                    name='chevron-thin-right'
                    color='gray.300'
                />
            </HStack>
        </TouchableOpacity>
    )
}