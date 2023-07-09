import { useState } from 'react'

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { VStack, Text, HStack, FlatList, Heading } from "native-base";
import { ExerciseCard } from '@components/ExerciseCard';

export function Home() {

    const [groupSelected, setGroupSelected] = useState('Costa')
    const [groups, setGroups] = useState(['Costa', 'Ombro', 'peito', 'Perna', 'Bicepes', 'Tricepes'])
    const [exercises, setExercises] = useState(['Puchada Frontal', 'Remada curvada', 'Remada unilateral', 'Remada baixa', 'Tricepes corda', 'Bícepes martelo'])


    return (
        <VStack flex={1}>
            <HomeHeader />

            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Group
                        name={item}
                        isActive={groupSelected.toLocaleLowerCase() === item.toLocaleLowerCase()}
                        onPress={() => setGroupSelected(item)}
                    />
                )}
                horizontal
                showsVerticalScrollIndicator={false}
                _contentContainerStyle={{ px: 8 }}
                my={6}
                maxHeight={10}
            />

            <VStack flex={1} px={8}>
                <HStack justifyContent='space-between' mb={5}>
                    <Heading color='gray.200' fontSize='md' >
                        Exercícios
                    </Heading>

                    <Text color='gray.200' fontSize='sm'>
                        {exercises.length}
                    </Text>
                </HStack>
                
                <FlatList
                    data={exercises}
                    keyExtractor={item => item}
                    renderItem={({item}) => (
                        <ExerciseCard/>
                    )}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{paddingBottom: 20}}
                />


            </VStack>
        </VStack>
    )
}