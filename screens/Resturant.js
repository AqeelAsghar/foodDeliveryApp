import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  ScrollView,
  StyleSheet,
  SafeAreaView
} from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { COLORS, SIZES, FONTS, icons, images } from '../constants'

// ************************************************************************************
// Resturent Screen that display the eveything into the screen 
// route, anvigation prop
const Resturant = ({ route, navigation }) => {
  // scrollX =  animated.Value(0)
  const scrollX = new Animated.Value(0);
  const [restaurant, setRestaurant]  = useState(null)
  const [currentLocation, setCurrentLocation] = useState({})
  const [orderItems, setOrderItems] = useState([])

  // useEffect is get app props 
  useEffect(() => {
    // desturcture item, currenLocation from route.params 
    let { item, currentLocation } = route.params;
    // setRestaurant(item)
    setRestaurant(item)
    // setCurrentLocation(currentLocation)
    setCurrentLocation(currentLocation)
    // console.log(currentLocation)
    console.log(currentLocation)
  }, [])

  // function editOrder with prop (action,menuId,price)
  function editOrder(action, menuId, price) {
      //let orderList = orderitems.slice 
        let orderList = orderItems.slice()
    // let item = orderList.filter(a.menuId == menuId)
        let item = orderList.filter(a => a.menuId == menuId)

    //if  action is +
    if (action == "+") {
          // if item.length > 0 
      if (item.length > 0) {
              // let newQty = item[0].qty + 1
                  let newQty = item[0].qty + 1
             // item[0].qty = newQty
                  item[0].qty = newQty
            //  item[0].total = item[0].qty * price
                item[0].total = item[0].qty * price
        //  else 
      } else {
        // const newItem = new object 
        const newItem = {
                    // menuId is menuId 
                    menuId: menuId,
                    // qty is 1 
                    qty: 1,
                    // price is price 
                    price: price,
                    // total is price 
                    total: price
        }
          // orderList push newItem
                orderList.push(newItem)
            }
              // setOrderItems(orderList)
      setOrderItems(orderList)
      // else means its - action 
    } else {
      // if item.lenght > 0 
      if (item.length > 0) {
              // if item[0].qty > 0 means it alread into the card 
        if (item[0]?.qty > 0) {
                  // let newQty = item[0].qty - 1 
                    let newQty = item[0].qty - 1
                  // item[0].qty = newQty
                    item[0].qty = newQty
                  // item[0].total = newQty * price
                    item[0].total = newQty * price
                }
            }
              // setOrderItems(orderList)
            setOrderItems(orderList)
        }
    }

  // ************************************************************************************************
  // function to getOrderQty with prop menuId
  function getOrderQty(menuId) {
      //  let orderItem = orderItems.filter(a.menuId == menuId)
        let orderItem = orderItems.filter(a => a.menuId == menuId)
        // if orderItem.lenght > 0 
          if (orderItem.length > 0) {
          // return orderItem[0].qty
            return orderItem[0].qty
          }
        //  return 0 
        return 0
 }
  // ***************************************************************************************
  // function getBasketItemCount 
  function getBasketItemCount() { 
    // orderItems.reduce function with take 2 paramerts a,b => a + b.qty || 0 and bydefault its zero
    let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0)
    // return itemCount 
    return itemCount
  }
  // ***************************************************************************************
  // function sumOrder 
  function sumOrder() {
    // orderItems.reduce function with take 2 paramerts a,b => a + b.total || 0 and bydefault its zero
    let total = orderItems.reduce((a, b) => a + (b.total || 0), 0)
    //return  total.toFixed(2)
    return total.toFixed(2)
  }

  
  //  ****************************************************************************************
    // function to display the Header
  function renderHeader() {
    return (
      // View that hold the whole header  
      <View
        style={{
          // flexDirection is row 
          flexDirection: 'row',
          // justifyContent space-between 
          justifyContent: 'space-between',
          // marginHorizontal is 36
          marginHorizontal: SIZES.padding * 3,
          // marginVertical is 12 
          marginVertical: SIZES.padding,
          // height of that view is 50 
          height: 50,
        }}
      >
        {/* within this view wrap eveything into the TouchableOpacity to make it touchable  */}
        <TouchableOpacity
          style={{
            // justifyContent & alignItems center to centerlize it 
            justifyContent:"center",
            alignItems: 'center',
          }}
          // onPress console navigation to Home.js screen 
         onPress={() => navigation.goBack()}
        >
          {/* Image that display the location */}
          <Image
            // source icons.location 
            source={icons.back}
            // resizeMode is contain
            resizeMode="contain"
            style={{
              // height & width is 25 
              height: 25,
              width: 25,
              // tintColor is black 
              tintColor: COLORS.black
            }}
          />
        </TouchableOpacity>
        {/* view to display the Location  */}
        <View
          style={{
            // backgroundColor is lightGray3
            backgroundColor: COLORS.lightGray3,
            // width is 50% of screen width 
            width: SIZES.width / 2,
            // borderRadius is 24 
            borderRadius: SIZES.radius,
            // justifyContent & alignItems center to centerlize it 
            justifyContent:"center",
            alignItems: 'center',
          }}
        >
          {/* Text restaurant.Name with font style h4  */}
          <Text style={{ ...FONTS.h4 }}>{restaurant?.name}</Text>
        </View>
        {/* wrap eveything into the TouchableOpcaity to make it touchable */}
        <TouchableOpacity
          style={{
            // justifyContent & alignItems center to centerlize it 
            justifyContent:"center",
            alignItems: 'center',
          }}
          // onPress console basket 
         onPress={() => console.log('list')}
        >
          <Image
            // source = icons.list 
            source={icons.list}
            // resizeMode is contain
            resizeMode="contain"
            style={{
              // height and width is 25 
              height: 25,
              width: 25,
              // tintColor is black 
              tintColor: COLORS.black
            }}
          />
        </TouchableOpacity>

      </View>
    )
  }
  // ************************************************************************************************
    // function to display the Food Info  
  function renderFoodInfo() {
    return (
      // return Animated.ScrollView because we use animated dots on the bottom 
      <Animated.ScrollView
        // type is horizontal
        horizontal
        // pagingEnabled is true 
        pagingEnabled
        // scrollEventThrottle is 16 
        scrollEventThrottle={16}
        // snapToAlignment is center
        snapToAlignment='center'
        // showsHorizontailScrollIndicator is false 
        showsHorizontalScrollIndicator={false} 
        // onScroll to move dots with onScroll 
        // Animated.event function with array of 
        onScroll={Animated.event([
        // nativeEvent Object which have contentOffset and into it x: scrollX
          { nativeEvent: { contentOffset: { x: scrollX } } }
          // useNativeDriver : false
        ], { useNativeDriver: false })}
      >
        {
          // restuarant.menu.map(item,index )
          restaurant?.menu.map((item, index) => (
            // View that hold the Menu 
            <View
              // key is menu-index
              key={`menu-${index}`}
              // stylle with alignItems: center 
              style={{ alignItems: 'center'}}
            >
              {/* *************************************************** */}
              {/* View that hold the height * 0.35 */}
              <View style={{ height: SIZES.height * 0.35 }}>
                {/* image */}
                <Image
                  // source is item.photo
                  source={item.photo}
                  // resizeMode is cover 
                  resizeMode='cover'
                  style={{
                    // width is screen.width 
                    width: SIZES.width,
                    // height is 100%
                    height: '100%'
                  }}
                />
                {/* ******************************************************** */}
                {/* quantity */}
                <View
                  style={{
                    // flexDirection is row 
                    flexDirection: 'row',
                    // position is absolute 
                    position: 'absolute',
                    // bottom is -20 
                    bottom: -20,
                    // width is screen.Width 
                    width: SIZES.width,
                    // height is 50 
                    height: 50,
                    // justifyContent is center 
                    justifyContent: 'center',
                  }}
                >
                  {/* ********************************************************************** */}
                  {/* - button  */}
                  {/* wrap eveything into the  TouchableOpacity to make it touchable */}
                  <TouchableOpacity
                    style={{
                      // alignItems, justifyContent center to centerlize it 
                      alignItems: 'center',
                      justifyContent: 'center',
                      // width is 50 
                      width: 50,
                      // backgroundColor is white 
                      backgroundColor: COLORS.white,
                      // borderTopLeftRadius, borderBottomLeftRadius is 25 
                      borderTopLeftRadius: 25,
                      borderBottomLeftRadius: 25,
                    }}
                    // OnPress call editOrder function with action is -, item.menuId, item.price 
                    onPress={() => editOrder("-", item.menuId, item.price)}
                  >
                    {/* Text - with style is h3  */}
                    <Text style={{...FONTS.h3}}>-</Text>
                  </TouchableOpacity>
                  {/* ********************************************************************** */}
                  {/* pirce section */}
                  <View
                    style={{
                      // backgroungColor is white 
                      backgroundColor: COLORS.white,
                      // justifyContent, alignItems center to centerlize it 
                      justifyContent: "center",
                      alignItems: "center",
                      // width is 50 
                      width: 50,
                   }}
                  >
                    {/* Text what call gegtOrderQty function by item.munuId  */}
                    <Text style={{ ...FONTS.h3 }}>{getOrderQty(item.menuId)}</Text>
                  </View>
                  {/* ********************************************************************** */}
                  {/* + button  */}
                  {/* wrap eveything into the  TouchableOpacity to make it touchable */}
                  <TouchableOpacity
                    style={{
                      // alignItems, justifyContent center to centerlize it 
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor is white
                      backgroundColor: COLORS.white,
                      // width is 50 
                      width: 50,
                      // borderTopLeftRadius, borderBottomLeftRadius is 25 
                      borderTopRightRadius: 25,
                      borderBottomRightRadius: 25,
                    }}
                    // OnPress call editOrder function with action is +, item.menuId, item.price 
                    onPress={() => editOrder("+", item.menuId, item.price)}
                  >
                    {/* Text + with style is h3  */}
                    <Text style={{ ...FONTS.h3 }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* ************************************************************************* */}
              {/* header and calories section  */}
              <View
                style={{
                  // width is screen width 
                  width: SIZES.width,
                      // alignItems, justifyContent center to centerlize it 
                  alignItems: 'center',
                  justifyContent: 'center',
                  // paddingHorizontal is 24 
                  paddingHorizontal: SIZES.padding * 2,
                  // marginTop is 15 
                  marginTop: 15
               }}
              >
                {/* text item name.price with font h2, marginVertical is 10 , textAlign is center  */}
                <Text style={{ ...FONTS.h2, marginVertical: 10, textAlign: 'center' }}>{item.name} - ${item.price.toFixed(2)}</Text>
                {/* text item name.description with font body3, textAlign is center  */}
                <Text style={{...FONTS.body3, textAlign:'center'}}>{item.description}</Text>
              </View>
              {/* **************************************************** */}
              {/* calories section  */}
              <View
                style={{
                  // flexDirection is row 
                  flexDirection: 'row',
                  // alignItems is center 
                  alignItems: 'center',
                  // marginTop is 12 
                  marginTop: SIZES.padding
              }}
              >
                {/* Image */}
                <Image
                  // source is icons,fire 
                  source={icons.fire}
                  // resizeMode is contain 
                  resizeMode='contain'
                  style={{
                    // width,height is 25 
                    width: 25,
                    height: 25,
                    // marginRight is 8 
                    marginRight: SIZES.base
                  }}
                />
                {/* Text is item.calories cal with font body3, color daarkgray */}
                <Text style={{...FONTS.body3, color: COLORS.darkgray}}>{item.calories.toFixed(2)} cal</Text>
              </View>
            </View>
          ))
        }
        {/* end of Animated.ScrollView  */}
      </Animated.ScrollView>
    )
  }
// ***************************************************************************************************
  // function to display the renderDots 
  function renderDots() {
    // make variable dotPosition Animated.divide (scrollX, ScreenWidth )
    const dotPosition = Animated.divide(scrollX, SIZES.width)
    return (
      // View with height is 30 
      <View style={{height:30}}>
        <View
          style={{
            // flexDirection is row 
            flexDirection: 'row',
            // justifyContent, alignItems is center to centerlize it 
            alignItems: 'center',
            justifyContent: 'center',
            // hight is 12 
            height: SIZES.padding
        }}
        >
          {
            // render dots according to the restaurant.menu items 
            // restaurant.menu.map(item,index )
            restaurant?.menu.map((item, index) => {
              // opcaity is dotPosition.interpolate
              const opacity = dotPosition.interpolate({
                // inputRange is index-1, index, index+1
                inputRange: [index - 1, index, index + 1],
                // outputRange is 0.3,1,0.3
                outputRange: [0.3, 1, 0.3],
                // extrapolate is clamp
                extrapolate: 'clamp'
              })
              // dotSize is dotPosition.interpolate
              const dotSize = dotPosition.interpolate({
                // inputRange is index-1, index, index+1
                inputRange: [index - 1, index, index + 1],
                // outputRange is 80% of 8px ,10, 80% of 8px 
                outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                // extrapolate is clamp
                extrapolate: 'clamp'
              })
              // dotSize is dotPosition.interpolate
              const dotColor = dotPosition.interpolate({
                // inputRange is index-1, index, index+1
                inputRange: [index - 1, index, index + 1],
                // outputRange is darkgray, primary, darkgray
                outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
                // extrapolate is clamp
                extrapolate: 'clamp'
              })
              return (
                // Animated.View 
                <Animated.View
                  // key is dot-index 
                  key={`dot-${index}`}
                  // opacity is opacityObject 
                  opacity={opacity}
                  style={{
                    // borderRadius is 24 
                    borderRadius: SIZES.radius,
                    // marginHorizontal is 6 
                    marginHorizontal: 6,
                    // width, height is dotSize 
                    width: dotSize,
                    height: dotSize,
                    // backgroundColor is dotColor
                    backgroundColor: dotColor
                  }}
                />
              )
            })
          }
          </View>
      </View>
    )
  }
  // ************************************************************************************************
  // function to renderOrders 
  function renderOrders() {
    return (
      // onRenderOrders we call a renderDots function to make it look good and make dots constant cannot change 
      // accoding to Menu Text 
      <View    
      >
        {
          renderDots()
        }
        {/* View that display the renderOrders */}
      <View
          style={{
          // height is 22% of height 
            height: SIZES.height * 0.22,
            // backgroundColor is white 
            backgroundColor: COLORS.white,
          // borderTopLeftRadius, borderTopRIghtRadius is 48
          borderTopLeftRadius: SIZES.radius * 2,
          borderTopRightRadius: SIZES.radius * 2
        }}
        >
          {/* View to display the item into and sunOrder  */}
        <View
            style={{
            // flexDirection is row
              flexDirection: "row",
              // justifyContent is space-between 
              justifyContent: 'space-between',
            // marginTop is 12 
              marginTop: SIZES.padding,
            // paddingVertical, paddingHorizontal is 24 
            paddingVertical: SIZES.padding * 2,
            paddingHorizontal: SIZES.padding * 2
        }}
          >
            {/* Text is getBasketItemCount function + item into a Card with font h3  */}
            <Text style={{ ...FONTS.h3 }}> {getBasketItemCount()} Item into a Card</Text>
            {/* Text is sumOrder function  with font h3  */}
          <Text style={{ ...FONTS.h3 }}> ${sumOrder()}</Text>
          </View>
          {/* **************************************************** */}
          {/* location a card payment secction  */}
        <View
            style={{
            // flexDirection is row 
              flexDirection: "row",
              // justifyContent is space-between
              justifyContent: 'space-between',
            // paddingVertical, paddingHorizontal is 24 
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding * 2
        }}
          >
            {/* Wrap it into the touchable opcaity to make it touchable  */}
            <TouchableOpacity
              style={{
                // flexDirection is row 
               flexDirection: 'row'
             }}
            >
              <Image
                // souce is icons.location
                source={icons.location}
                // resizeMode is contain 
                resizeMode='contain'
                style={{
                  // width and height is 25 
                  width: 25,
                  height: 25
                }}
              />
              {/* Text is location is font h4, marginLeft is 08  */}
              <Text style={{...FONTS.h4, marginLeft: SIZES.base}}> Location</Text>
            </TouchableOpacity>
            {/* View to display the card details  */}
            <View
              style={{
                // flexDirection is row 
               flexDirection: 'row'
             }}
            >
              <Image
                // souce is icons.master_card 
                source={icons.master_card}
                // resizeMode is contain 
                resizeMode='contain'
                style={{
                  // width,height is 25 
                  width: 25,
                  height: 25
                }}
              />
              {/* Text with dummyText with font is body3 and margin left is 08 */}
              <Text style={{...FONTS.body3, marginLeft: SIZES.base}}> 1234567</Text>
            </View>
        </View>
        
          {/* Order Button Section  */}
          {/* wrap it into the ToucbaleOpacity to maka it toucable  */}
          <TouchableOpacity
            style={{
              // backgroundColor is primary 
              backgroundColor: COLORS.primary,
              // justifyContent,alignItems is center to centerlize it 
              justifyContent: 'center',
              alignItems: 'center',
              // marginTop is 12 
              marginTop: SIZES.padding,
              // paddingVertical is 12 
              paddingVertical: SIZES.padding,
              // marginHorizontal is 24 
              marginHorizontal: SIZES.padding * 2,
              // borderRadius is 24 
              borderRadius: SIZES.radius,
            }}
            // Onpress navigation.navigate into the orderDelivery screen 
            onPress={() => navigation.navigate('orderDelivery', {
              // restaurant is restaurant 
              restaurant: restaurant,
              // currentLocation is currentLocation 
              currentLocation: currentLocation,
            })}
          >
            {/* Text order with font h2 color is white  */}
              <Text style={{...FONTS.h2, color: COLORS.white}}>Order</Text>
            </TouchableOpacity>
        </View>
        {
          // if its IPHONEX then 
          isIphoneX() && 
          // make a view with stykes 
          <View
              style={{
                // position is absolute 
                position: 'absolute',
                // bottom is -34 
                bottom: -34,
                // left, right is 0 
                left: 0,
                right: 0,
                // height is 34 
                height: 34,
                // backgroundColor is white 
                backgroundColor: COLORS.white
           }}
            >
              </View>
       }

      </View>
    )
  }

  return (
    //wrap whole Resturant SafeAreaView into it  
    <SafeAreaView style={{
      // flex is 1 
      flex: 1,
      // backgroundColor is lightGray4 
      backgroundColor: COLORS.lightGray4
    }}>
      {/* **************************************************************** */}
      {/* renderHeader function to display the Header  */}
      {renderHeader()}
      {/* **************************************************************** */}
      {/* renderFoodInfo function to display the FoodInfo  */}
      {renderFoodInfo()}
      {/* **************************************************************** */}
      {/* renderOrders function to display the Orders  */}
      {renderOrders()}
    </SafeAreaView>
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

export default Resturant