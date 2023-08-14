import { HStack, Text, Heading, VStack, Icon } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

import { api } from '@services/api'
import { useAuth } from '@hooks/useAuth'

import { UserPhoto } from './UserPhoto'
import defaultUserPhoto from '@assets/userPhotoDefault.png'

export function HomeHeader() {
  const { user, signOut } = useAuth()

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        source={
          user.avatar
            ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
            : defaultUserPhoto
        }
        alt="foto do usuario"
        size={16}
        mr={4}
      />

      <VStack flex={1}>
        <Text color={'gray.100'} fontSize="md">
          Olá
        </Text>

        <Heading color={'gray.100'} fontSize="md" fontFamily="heading">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  )
}
