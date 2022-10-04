import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Touchable
} from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { COLORS, SIZES, FONTS, icons, images, GOOGLE_API_KEY} from '../constants'

const OrderDelivery = ({ route, navigation }) => {
    // mapView useRef
    const mapView = useRef()
    const [restaurant, setRestaurant] = useState(null)
    const [streetName, setStreetName] = useState("")
    const [fromLocation, setFromLocation] = useState(null)
    const [toLocation, setToLocation] = useState(null)
    const [region, setRegion] = useState(null)
  
    const [duration, setDuration] = useState(0)
    const [isReady, setIsReady] = useState(false)
    const [angle, setAngle] = useState(0)

    // useEffect to get all parametres from previous screen 
  useEffect(() => {
      // destructure the restaurant, currenLocation from route.params
        let { restaurant, currentLocation } = route.params;
    console.log(restaurant, currentLocation)
    // let fromLoc is currentLocation.gps 
    let fromLoc = currentLocation.gps
    //let toLoc is restaurant.location 
    let toLoc = restaurant.location
    // let street - currentLocation.streetName 
        let street = currentLocation.streetName

    // let mapRegion 
    let mapRegion = {
          // latitude is fromLoc.latitude + toLoc.latitude / 2 
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
          // longitude is fromLoc.longitude + toLoc.longitude / 2 
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
          // latitudeDelta is fromLoc.latitude - toLoc.latitude * 2 
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
          // longitudeDelta is fromLoc.longitude - toLoc.longitude * 2 
            longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2
        }
        // setRestaurant is restaurant 
    setRestaurant(restaurant)
    // setStreetName is street
    setStreetName(street)
    // setFromLocation is fromLoc
    setFromLocation(fromLoc)
    // setToLocation is toLoc 
    setToLocation(toLoc)
    // setRegion is mapRegion
        setRegion(mapRegion)

    }, [])
  
  //  ********************************************************************************
  // function that display the angle for the car 
  function calculateAngle(coordinates) {
        let startLat = coordinates[0]["latitude"]
        let startLng = coordinates[0]["longitude"]
        let endLat = coordinates[1]["latitude"]
        let endLng = coordinates[1]["longitude"]
        let dx = endLat - startLat
        let dy = endLng - startLng
 
    // formula to calculate the angle 
        return Math.atan2(dy, dx) * 180 / Math.PI
  }
// ******************************************************
  // function to zoomIN 
  function zoomIn() {
    // let newRegion is 
    let newRegion = {
      // latitude is region.latitude 
      latitude: region.latitude,
      // longitude is region.longitude
      longitude: region.longitude,
      // latitudeDelta is region.latitudeDelta / 2
      latitudeDelta: region.latitudeDelta / 2,
      // longitudeDelta is region.longitudeDelta / 2
      longitudeDelta: region.longitudeDelta /2
    }
    // setRegion(newRegion)
    setRegion(newRegion)
    //use mapView Ref Hook access it using current and animateToRegion property and set newRegion, 200 nano second delay
    mapView.current.animateToRegion(newRegion, 200)
}
// ******************************************************
  // function to zoomIN 
  function zoomOut() {
    // let newRegion is 
    let newRegion = {
      // latitude is region.latitude 
      latitude: region.latitude,
      // longitude is region.longitude
      longitude: region.longitude,
      // latitudeDelta is region.latitudeDelta * 2
      latitudeDelta: region.latitudeDelta * 2,
      // longitudeDelta is region.longitudeDelta * 2
      longitudeDelta: region.longitudeDelta *2
    }
    // setRegion(newRegion)
    setRegion(newRegion)
    //use mapView Ref Hook access it using current and animateToRegion property and set newRegion, 200 nano second delay
    mapView.current.animateToRegion(newRegion, 200)
  }

// ******************************************************
  // function to renderMap int the screen
  function renderMap() { 
    // **********************************************************
    // make destinationMarker variable that display the destination into the map 
    const destinationMarker = () => (
      // Wrap eveything into the Marker 
      <Marker
        // coordinate is toLocation 
       coordinate={toLocation}
      >
        {/* Map to display the destination  */}
        <View
          style={{
            // height and width is 40 
            height: 40,
            width: 40,
            // borderRadius is 20 
            borderRadius: 20,
            // alignItems and justifyContent is center to centerlize it
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor is white 
            backgroundColor: COLORS.white
         }}
        >
          {/* View to display the pin  */}
          <View
            style={{
              // height and width is 30 
              height: 30,
              width: 30,
              // borderRadius is 15 
              borderRadius: 15,
            // alignItems and justifyContent is center to centerlize it
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor is primary 
              backgroundColor: COLORS.primary
           }}
          >
            <Image
              // source is icons.pin
              source={icons.pin}
              style={{
                // width and height is 25 
                width: 25,
                height: 25,
                // tintColor is white 
                tintColor: COLORS.white
              }}
            />
            </View>
        </View>
      </Marker>
    )
    // **********************************************************
    // make renderCarIcon variable that display the car into the map 
    const renderCarIcon = () => (
      // Wrap eveything into the Marker 
      <Marker
        // coorinate is fromLocation 
        coordinate={fromLocation}
        // anchor is x:0.5, y:0.5
        anchor={{ x: 0.5, y: 0.5 }}
        // flat is true 
        flat={true}
        // rotation is angle state 
        rotation={angle}
      >
        <Image
          // source is icons.car 
          source={icons.car}
          style={{
            // width,height  is 40
            width: 40,
            height: 40
          }}
        />
      </Marker>
    )

    return (
      // View with style flex:1
      <View style={{ flex: 1 }}>
        {/* Wrap Eveything into the MapView  */}
        <MapView
          // make a ref of MapView and store it into the mapView state 
          ref={mapView}
          // Provider is PROVIDER_GOOGLE
          provider={PROVIDER_GOOGLE}
          // initialRegion is region
          initialRegion={region}
          // style is flex:1
          style={{ flex: 1 }}
        >
          {/* wrap eveything into the MapViewDirections  */}
          <MapViewDirections
            // origin is fromLocation 
            origin={fromLocation}
            // destination is toLocation 
            destination={toLocation}
            // ApiKey is GOOLE_API_KEy
            apikey={GOOGLE_API_KEY}
            // strokeWidth is 5 
            strokeWidth={5}
            // strokeColor is primary 
            strokeColor={COLORS.primary}
            // optimizeWayPoints is true 
            optimizeWaypoints={true}
            // onReady =  result 
            onReady={result => {
              // setDuration is result.duration 
              setDuration(result.duration)
              
              // if(its not ready )
              if (!isReady) {
                // Fit route into the map 
                // mapView ref access it with .current.fitToCoorinates(result.coordinates)
                mapView.current.fitToCoordinates(result.coordinates, {
                  // edgePadding is 
                  edgePadding: {
                    // right is screen width / 20 
                    right: (SIZES.width / 20),
                    // bottom is screenHeight / 4
                    bottom: (SIZES.height / 4),
                    // left is screen width / 20 
                    left: (SIZES.width / 20),
                    // top is screenHeight / 8
                    top: (SIZES.height / 8)
                  }
                })
                // Reposition the car
                let nexLoc = {
                  // latitude is result.coodinates[0]['latitude']
                  latitude: result.coordinates[0]['latitude'],
                  // longitude is result.coodinates[0]['longitude']
                  longitude: result.coordinates[0]['longitude']
                }
                // if result.coordinates.lenght is geater than equal to 2 
                if (result.coordinates.length >= 2) {
                  // calculateAngle(result.coodinates )
                  let angle = calculateAngle(result.coordinates)
                  // set angle into the setAngle UseState 
                  setAngle(angle)
                }

                // setFromLocartion to (nexLoc)
                setFromLocation(nexLoc)
                // setIsReady(true)
                setIsReady(true)
              }
            }}
            
          />
          {/* ************************************************************ */}
          {/* destinationMarker to display the pinIcon on to Loaction   */}
          {destinationMarker()}
          {/* ************************************************************ */}
          {/* renderCarIcon to display the carIcon on from Loaction  */}
            {renderCarIcon()}
        </MapView>
      </View>
    )
  }

  // *************************************************************************
  // function that display the renderDestinationHeader into a screen 
  function renderDestinationHeader() {
    return (
      // View that hold the Header 
      <View
        style={{
          // position is absolute 
          position: 'absolute',
          // top is 50 
          top: 50,
          // left, right is 0 
          left: 0,
          right: 0,
          // height is 50 
          height: 50,
          // justifyContent, alignItems center to centerlize it 
          alignItems:'center',
          justifyContent: 'center'
        }}
      >
        <View
          style={{
            // flexDirection is row 
            flexDirection: 'row',
            // alignItems is center 
            alignItems: 'center',
            // width is 90%
            width: SIZES.width * 0.9,
            // backgroundCOlor is white 
            backgroundColor: COLORS.white,
            // paddingVertical is 12 
            paddingVertical: SIZES.padding,
            // paddingHorizontal is 24 
            paddingHorizontal: SIZES.padding * 2,
            // borderRadius is 24 
            borderRadius: SIZES.radius
            
         }}
        >
          <Image 
            // source is icons.red_pin
             source={icons.red_pin}
            style={{
              // width,height is 30
              width: 30,
              height: 30,
              // marginRight is 12
              marginRight: SIZES.padding
           }}
          />
          {/* View that display the StreetName with flex:1 */}
          <View style={{ flex: 1 }}>
            {/* Text is streetName with font is body3  */}
            <Text style={{...FONTS.body3}}>{streetName}</Text>
          </View>
            {/* Text is duration with font is body3  */}
          <Text style={{...FONTS.body3}}>{Math.ceil(duration)} mints</Text>
        </View>

      </View>
    )
  }

  // ********************************************************************
  // function renderDeliveryInfo into the screen 
  function renderDeliveryInfo() {
    return (
      // View that hold all cards 
      <View
        style={{
          // position is absolute 
          position: 'absolute',
          // bottom is 50 
          bottom: 50,
          // left,right is 0
          left: 0,
          right: 0,
          // justifyContent, alignItems is center to centerlize it 
          justifyContent: 'center',
          alignItems: 'center'
       }}
      >
        {/* View that display the card  */}
        <View
          style={{
            // width is 90% of screen width 
            width: SIZES.width * 0.9,
            // paddingVertical is 12 
            paddingVertical: SIZES.padding,
            // padddingHorizontal is 24 
            paddingHorizontal: SIZES.padding * 2,
            // borderRadius is 24 
            borderRadius: SIZES.radius,
            // backgroundCOlor is white 
            backgroundColor: COLORS.white
         }}
        >
          <View style={{
            // flexDirection is row 
            flexDirection: 'row',
            // alignItems is center 
            alignItems: 'center'
          }}>
            {/* Avatar */}
            <Image 
              // soure is restaurant.curier.avatar
              source={restaurant?.courier.avatar}
              style={{
                // width and height is 50 
                width:50,
                height: 50,
                // borderRadius is 25 
                borderRadius:25
              }}
            />
            <View style={{
              // flex is 1 
              flex: 1,
              // marginLeft is 12 
              marginLeft: SIZES.padding
            }}>
              {/* Name and rating  */}
              <View style={{
                // flexDirection is row 
                flexDirection: 'row',
                // justifyContent is space between 
                justifyContent: 'space-between'
              }}>
                {/* Text is restaurant.courier.name with font body4  */}
                <Text style={{ ...FONTS.body4 }}>{restaurant?.courier.name}</Text>
                {/* View to diplay the start and rating with flexDirection is row  */}
                <View style={{flexDirection: 'row'}}>
                  <Image
                    // source is start
                    source={icons.star}
                    style={{
                      // width and height is 18 
                      width: 18,
                      height: 18,
                      // tintColor is primary 
                      tintColor: COLORS.primary,
                      // marginRight is padding 
                      marginRight: SIZES.padding
                    }}
                  />
                  {/* Text restaurant.rating with font body3  */}
                  <Text style={{...FONTS.body3}}>{restaurant?.rating}</Text>
                </View>
              </View>
              {/* Text restaurant.name with color is darkgray and font body4  */}
              <Text style={{ color: COLORS.darkgray, ...FONTS.body4}}>{restaurant?.name}</Text>
              </View>
          </View>
          {/* ****************************************************************************** */}
          {/* Buttons section  */}
          <View
            style={{
              // flexDirection is row 
              flexDirection: 'row',
              // justifyContent is space-between 
              justifyContent: 'space-between',
              // marginTop is 12 
              marginTop: SIZES.padding
           }}
          >
            {/* wrap eveything into the touchableOpcacity to make it touchable  */}
            <TouchableOpacity
              style={{
              // height is 50 
                height: 50,
                // flex:1 
                flex: 1,
                // marginRight is 10 
                marginRight: 10,
                // backgroundColor is primary 
                backgroundColor: COLORS.primary,
                // justiftcontent,alignItems is center to centerlize 
                justifyContent: 'center',
                alignItems: 'center',
                // borderradius is 10 
                borderRadius: 10

              }}
              // Onpress navigate.navigate to home screen
              onPress={() => navigation.navigate('Home')}
            >
              {/* text is call with font h4, color is white  */}
              <Text style={{...FONTS.h4, color: COLORS.white}}>Call</Text>
            </TouchableOpacity>
            {/* wrap eveything into the touchableOpcacity to make it touchable  */}
            <TouchableOpacity
              style={{
              // height is 50 
                height: 50,
                // flex:1 
                flex: 1,
                // backgroundColor is secondary
                backgroundColor: COLORS.secondary,
                // justiftcontent,alignItems is center to centerlize 
                justifyContent: 'center',
                alignItems: 'center',
                // borderradius is 10 
                borderRadius: 10

              }}
              // Onpress navigate.goBack to go into previous screen
            onPress={() => navigation.goBack()}
            >
              {/* text is Cancel with font h4, color is white  */}
              <Text style={{...FONTS.h4, color: COLORS.white}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  // ****************************************************************************
  // functioin that display the ZoomIn, ZoomOut into the screen 
  function renderButtons(){
    return (
      // View that display the whole eveything 
      <View
        style={{
          // position is absolute 
          position: 'absolute',
          // bottom is 35% of screen height 
          bottom: SIZES.height * 0.35,
          // right is padding * 2
          right: SIZES.padding * 2,
          // width is 60 
          width: 60,
          // height is 130 
          height: 130,
          // justifyContent is space between 
          justifyContent: 'space-between'
       }}
      >
        {/* Zoom In */}
        <TouchableOpacity
          style={{
            // width, height is 60 
           width:60,
            height: 60,
          //  borderradius is 30 
            borderRadius: 30,
          //  backgroundColor is white 
            backgroundColor: COLORS.white,
          //  justifyContent, alignItems center to centerlize it 
            justifyContent: 'center',
           alignItems: 'center'
          }}
          // Onpress call the zoomIn function 
          onPress={() => zoomIn()}
        >
          {/* Text + with font h4  */}
          <Text style={{...FONTS.h4}}>+</Text>
        </TouchableOpacity>

        {/* Zoom Out */}
        <TouchableOpacity
          style={{
            // width, height is 60 
           width:60,
            height: 60,
          //  borderradius is 30 
            borderRadius: 30,
          //  backgroundColor is white 
            backgroundColor: COLORS.white,
          //  justifyContent, alignItems center to centerlize it 
            justifyContent: 'center',
           alignItems: 'center'
          }}
          // Onpress call the zoomIn function 
          onPress={() => zoomOut()}
        >
          {/* Text - with font h4  */}
          <Text style={{...FONTS.h4}}>-</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    // Main View with style flex 1 
    <View style={{ flex: 1 }}>
      {/* ************************************************************ */}
      {/* renderMap to display the map  */}
      {renderMap()}
      {/* ************************************************************ */}
      {/* renderDestinationHeader to display the Destination Header  */}
      {renderDestinationHeader()}
      {/* ************************************************************ */}
      {/* renderDeliveryInfo to display the Devlivery Info   */}
      {renderDeliveryInfo()}
      {/* ************************************************************ */}
      {/* renderButtons to display the ZoomIN ZoomOut buttons   */}
      {renderButtons()}
    </View>
  )
}

export default OrderDelivery