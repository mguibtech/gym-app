import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { VStack, Text } from "native-base";

export function History(){
    return(
        <VStack flex={1}>
            <ScreenHeader title='Histórico de Exercícios'/>

            <HistoryCard/>
            <HistoryCard/>
            <HistoryCard/>
            <HistoryCard/>

        </VStack>
    )
}