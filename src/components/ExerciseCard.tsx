import { HStack, Image } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

type Props = TouchableOpacityProps & {

}

export function ExerciseCard({ ...rest} : Props){
    return(
        <TouchableOpacity {...rest}>
            <HStack>
                <Image
                    
                />
            </HStack>
        </TouchableOpacity>
    )
}