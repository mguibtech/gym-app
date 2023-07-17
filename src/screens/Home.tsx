import { useState, useEffect, useCallback } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { VStack, Text, HStack, FlatList, Heading, useNativeBase, useToast } from "native-base";

import { api } from '@services/api';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { ExerciseCard } from '@components/ExerciseCard';
import { AppError } from '@utils/AppError';
import { ExerciceDTO } from '@dtos/ExerciseDTO';
import { Loading } from '@components/Loading';

export function Home() {

    const [isLoading, setIsLoading] = useState(true)

    const [groupSelected, setGroupSelected] = useState('atebraço')
    const [groups, setGroups] = useState<string[]>([])
    const [exercises, setExercises] = useState<ExerciceDTO[]>([])

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    const toast = useToast();

    function handleOpenExerciseDetails(exerciseId: string) {
        navigation.navigate('exercise', {exerciseId})
    }

    async function fetchGroups() {
        try {


            const response = await api.get('/groups');
            setGroups(response.data)

        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares.'
            toast.show({
                title: title,
                placement: 'top',
                bgColor: 'red.500'
            })
        }
    }

    async function fetchExercicesByGroup() {
        try {
            setIsLoading(true);

            const response = await api.get(`/exercises/bygroup/${groupSelected}`);
            setExercises(response.data)

        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível carregar os exercícios.'
            toast.show({
                title: title,
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        fetchGroups();

    }, []);

    useFocusEffect(useCallback(() => {
        fetchExercicesByGroup();
    }, [groupSelected]))

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
                minH={10}
            />

            {
                isLoading ? <Loading /> :
                    <VStack flex={1} px={8}>
                        <HStack justifyContent='space-between' mb={5}>
                            <Heading color='gray.200' fontSize='md' fontFamily='heading'>
                                Exercícios
                            </Heading>

                            <Text color='gray.200' fontSize='sm'>
                                {exercises.length}
                            </Text>
                        </HStack>

                        <FlatList
                            data={exercises}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <ExerciseCard
                                    onPress={() => handleOpenExerciseDetails(item.id)} data={item}
                                />
                            )}
                            showsVerticalScrollIndicator={false}
                            _contentContainerStyle={{ paddingBottom: 20 }}
                        />


                    </VStack>
            }
        </VStack>
    )
}