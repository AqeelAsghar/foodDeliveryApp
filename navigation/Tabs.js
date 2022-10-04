import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native'

// destructure the createBottomTabNavigator, BottomTabBar from react-navigation/bottom-tabs

import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs'
// import Home from screens 
import { Home } from '../screens'
// import Search, Favourite, User from index 
import { Search, Favourite, User } from './index'
// import COLORS and icons from constants
import { COLORS, SIZES, FONTS, icons, images } from '../constants'
// import Svg and Path from react-native-svg
import SVG, { Path } from 'react-native-svg'
// import isIphoneX from react-native-iphone-x-helper
import { isIphoneX } from 'react-native-iphone-x-helper'

// make a Tab variable and assign it to the createBottomTabNavigator
const Tab = createBottomTabNavigator()

// ************************************************************************************************
// function to display the hover functionality on bottom tabs
// TabBarCustomButtom with accessibilityLabel, accessibilityState, children, onPress
const TabBarCustomButtom = ({ accessibilityLabel, accessibilityState, children, onPress }) => {
        // check the accessibilityState.selected then assign it to varible isSelected
    let isSelected = accessibilityState.selected
    // if isSelected exist then return this 
    if (isSelected) {
        return (
            // View that is taking flex:1 and alignItems is center
            <View style={{ flex: 1, alignItems: 'center' }}> 
                <View style={{
                    // flexDirection is row 
                    flexDirection: 'row',
                    // position is absolute 
                    position: 'absolute',
                    // from top its zero 
                    top: 0
                }}>
                    {/* View that take flex:1 and backgroundColor is white */}
                    <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
                    {/* SVG  */}
                    <SVG
                        // height is 75
                        height={75}
                        // width is 61 
                        width={61}
                        // viewBox is 0,0, 75,61
                        viewBox='0 0 75 61'
                    >
                        {/* Path  */}
                        <Path
                            // d is this 
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            // fill with white color 
                            fill={COLORS.white}
                         />
                    </SVG>
                    {/* View style is flex:1 backgroundColor is white  */}
                    <View style={{flex:1, backgroundColor:COLORS.white}}></View>
                </View>
                {/* wrap eveything into touchableOpacity to make it touchable  */}
                <TouchableOpacity
                    style={{
                        // from top its -22.5 
                        top: '-55%',
                        // justifyContent, alignItems: 'center' to centerlize items 
                        alignItems: 'center',
                        justifyContent: 'center',
                        // width and height is 50 
                        height: 50,
                        width: 50,
                        // borderRadius is 20 
                        borderRadius: 20,
                        // backgroundColor is white 
                        backgroundColor: COLORS.white,
                        // style is shadow
                        // ...styles.shadow
                    }}
                    // Onpress its equal to onPress prop
                    onPress={onPress}
                >
                    {/* display the children  */}
                    {children}
                </TouchableOpacity>
            </View>
        )
    } else {
        // and if it is not accessibilityState than return this 
        return (
            // wrap everything into a touchableOpacity to make it touchable 
            <TouchableOpacity
                style={{
                        // flex: 1 
                        flex: 1,
                        // justifyContent , alignItems is center to centerlize it 
                        alignItems: 'center',
                        justifyContent: 'center',
                        // width and height is 50 
                        height: 50,
                        width: 50,
                        // backgroundColor is white
                        backgroundColor: COLORS.white,
                        // ...styles.shadow
                }}
                // and activeOpacity is 1 
                activeOpacity={1}
                // onPress it is equal to onPress prop
                    onPress={onPress}
            >
                {/* and display the children  */}
                    {children}
                </TouchableOpacity>
        )
    }
}

// ***********************************************************************************************************
// function to take all space 
const CustomTabBar = (props) => {
    // check if itsIphoneX
    if (isIphoneX()) {
        return (
            <View>
                <View
                    style={{
                        // position is absolute
                        position: 'absolute',
                        // bottom,left,right: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        // height is 30 
                        height: 30,
                        // backgroundColor is white
                        backgroundColor: COLORS.white
                    
                 }}
                >
                    {/* BottmTabBar component is props.props */}
                 <BottomTabBar {...props.props} />
                </View>
            </View>
        )
    } else {
        // if its is not IphoneX then return the simple BottomTabBar component
        return (
            // BottmTabBar component is props.props
          <BottomTabBar {...props.props} />
        )
    }
}

// Tabs that display the tabs 
const Tabs = () => {
    return (
        // wrap everything into the Tab.Navigator 
        <Tab.Navigator
            // screenOptions to style Tab.Navigator
            screenOptions={{
            //   headerShown: false
                headerShown: false,
                // tabBarShowLabel: false
                tabBarShowLabel: false,
            //tabBarStyle: 
                tabBarStyle: [{
                //   position: 'absolute',
                    position: 'absolute',
                    // from right,left,bottom it take 0 space 
                  bottom: 0,
                  right: 0,
                    left: 0,
                //   backgroundColor is tansparent
                    backgroundColor: 'transparent',
                //   elevation is 0
                  elevation: 0
              }]
            }}
            // tabBar is props and give this props into the CustomTabBar component
          tabBar={(props) => (
              <CustomTabBar props={props} />
            )}
        >
            {/* Tab.Screen display Home screen */}
            <Tab.Screen name='Home' component={Home}
                // Tab.Screen options is 
                options={{
                //   TabBarIcon is function with focused prop
                  tabBarIcon: ({ focused }) => (
                        <Image
                            // source is icons.more 
                            source={icons.cutlery}
                            // resizeMode is contain
                          resizeMode='contain'
                            style={{
                            //   width & height is 25 
                              width: 25,
                                height: 25,
                            //   tintColor if it is focused then white otherwise secondary
                              tintColor: focused ? COLORS.primary : COLORS.lightGray3
                          }}
                      />
                    ),
                    // tabBarButton is function with props as an argument
                    tabBarButton: (props) => (
                    //   show the TabBarCustomButton and give it a props 
                      <TabBarCustomButtom
                       {...props}
                      />
                  )
              }}
            />
            {/* Tab.Screen display Home Scan */}
          <Tab.Screen name='Search' component={Search}
                options={{
                //   TabBarIcon is function with focused prop
                  tabBarIcon: ({ focused }) => (
                        <Image
                            // source is icons.search 
                            source={icons.search}
                            // resizeMode is contain
                          resizeMode='contain'
                            style={{
                            //   width & height is 25 
                              width: 25,
                              height: 25,
                            //   tintColor if it is focused then white otherwise secondary
                              tintColor: focused ? COLORS.primary : COLORS.lightGray3
                          }}
                      />
                    ),
                    // tabBarButton is function with props as an argument
                    tabBarButton: (props) => (
                    //   show the TabBarCustomButton and give it a props 
                      <TabBarCustomButtom
                       {...props}
                      />
                  )
              }}
            />
            {/* Tab.Screen display Home user */}
          <Tab.Screen name='Favourite' component={Favourite}
                options={{
                //   TabBarIcon is function with focused prop
                  tabBarIcon: ({ focused }) => (
                        <Image
                            // source is icons.like 
                            source={icons.like}
                            // resizeMode is contain
                          resizeMode='contain'
                            style={{
                            //   width & height is 25 
                              width: 25,
                              height: 25,
                            //   tintColor if it is focused then white otherwise secondary
                              tintColor: focused ? COLORS.primary : COLORS.lightGray3
                          }}
                      />
                    ),
                    // tabBarButton is function with props as an argument
                    tabBarButton: (props) => (
                    //   show the TabBarCustomButton and give it a props 
                      <TabBarCustomButtom
                       {...props}
                      />
                  )
                }} />
            {/* Tab.Screen display Home user */}
          <Tab.Screen name='User' component={User}
                options={{
                //   TabBarIcon is function with focused prop
                  tabBarIcon: ({ focused }) => (
                        <Image
                            // source is icons.user 
                            source={icons.user}
                            // resizeMode is contain
                          resizeMode='contain'
                            style={{
                            //   width & height is 25 
                              width: 25,
                                height: 25,
                            //   tintColor if it is focused then white otherwise secondary
                              tintColor: focused ? COLORS.primary : COLORS.lightGray3
                          }}
                      />
                    ),
                    // tabBarButton is function with props as an argument
                    tabBarButton: (props) => (
                    //   show the TabBarCustomButton and give it a props 
                      <TabBarCustomButtom
                       {...props}
                      />
                  )
              }}
          />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    }
})

export default Tabs