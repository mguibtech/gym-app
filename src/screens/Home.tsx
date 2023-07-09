import { useState } from 'react'

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { VStack, Text, HStack, FlatList, Heading } from "native-base";
import { ExerciseCard } from '@components/ExerciseCard';

export function Home() {

    const [groupSelected, setGroupSelected] = useState('costa')
    const [groups, setGroups] = useState(['Costa', 'Ombro', 'Peito', 'Perna', 'Bicepes', 'Tricepes'])


    return (
        <VStack flex={1}>
            <HomeHeader />

            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Group
                        name={item}
                        isActive={groupSelected === item}
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
                        4
                    </Text>
                </HStack>

                <ExerciseCard
                    
                />

            </VStack>
        </VStack>
    )
}