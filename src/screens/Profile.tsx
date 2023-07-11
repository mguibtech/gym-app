import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast } from "native-base";
import * as ImagePiker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';



import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

const PHOTO_SIZE = 33

export function Profile() {

  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('https://github.com/mguibtech.png')

  const toast = useToast();

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true)
    try {
      const photoSeleted = await ImagePiker.launchImageLibraryAsync({
        mediaTypes: ImagePiker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      });

      if (photoSeleted.canceled) {
        return;
      }

      if(photoSeleted.assets[0].uri){
        const photoInfo = await FileSystem.getInfoAsync(photoSeleted.assets[0].uri)
        
        if(photoInfo.exists && (photoInfo.size /1204 /1024) > 5 ){
          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 5MB',
            placement: 'top',
            bgColor:'red.500'
          })
        }
        console.log(photoInfo)
        setUserPhoto(photoSeleted.assets[0].uri)
      }

    } catch (error) {
      console.log(error)
    }finally{
      setPhotoIsLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader
        title="Perfil"
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {
            photoIsLoading ?
              <Skeleton
                w={PHOTO_SIZE}
                h={PHOTO_SIZE}
                rounded='full'
                startColor='gray.400'
                endColor='gray.600'
              />
              :
              <UserPhoto
                source={{ uri: userPhoto }}
                alt="Foto do usuário"
                size={PHOTO_SIZE}
              />
          }

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color='green.500'
              fontWeight='bold'
              fontSize='md'
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input
            placeholder="Nome"
            bg='gray.600'
          />
          <Input
            placeholder="E-mail"
            bg='gray.600'
            isDisabled
          />
        </Center>

        <VStack px={10} mt={8} mb={9}>
          <Heading color='gray.200' fontSize='md' mb={2} fontFamily='heading'>
            Alterar senha
          </Heading>

          <Input
            bg='gray.600'
            placeholder="Senha antiga"
            secureTextEntry
          />
          <Input
            bg='gray.600'
            placeholder="Nova senha"
            secureTextEntry
          />
          <Input
            bg='gray.600'
            placeholder="Confirme a nova senha"
            secureTextEntry
          />
          <Button
            title="Atualizar"
          />
        </VStack>

      </ScrollView>
    </VStack>
  )
}