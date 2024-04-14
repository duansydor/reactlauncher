import React from 'react'
import { Button, Text, XStack, YStack } from 'tamagui'

const ProfileScreen = ({navigation, route}) => {
  return (
    <YStack m={"$4"}>
      <XStack>
        <Text></Text>
        <Button 
        bg={"$accentBackground"} 
        color={"$accentColor"}
        >Voltar</Button>
      </XStack>
    </YStack>
  )
}

export default ProfileScreen
