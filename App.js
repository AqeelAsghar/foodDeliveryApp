import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { COLORS, SIZES, FONTS, icons, images } from './constants'
import { OrderDelivery, Resturant } from './screens'
import {Tabs} from './navigation'

// make a theme variable to assign it to the navigationContainer 
const theme = {
  // copy the defaultTheme with spread operator 
  ...DefaultTheme,
  // colors is
  colors: {
    // defaultTheme colors
    ...DefaultTheme.colors,
    // border is transparent 
    border : 'transparent'
  }
}

// Stack variables which is equal to createStackNavigator 
const Stack =  createStackNavigator()

const App = () => {
  return (
    // wrap eveything into the NavigationContainer and give it a theme 
    <NavigationContainer theme={theme}>
      {/* Stack.Navigator  */}
      <Stack.Navigator
        // screenOptions props 
        screenOptions={{
          // headerShown is false 
          headerShown: false,
        }}
      >
        {/* tabs screen  */}
        <Stack.Screen name='tabs' component={Tabs} />
        {/* resturant screen  */}
        <Stack.Screen name='resturant' component={Resturant} />
        {/* orderDelivery screen  */}
        <Stack.Screen name='orderDelivery' component={OrderDelivery} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App