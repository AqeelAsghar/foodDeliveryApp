import React, { useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList
} from 'react-native'
import {COLORS, SIZES, FONTS, icons, images} from "../constants"

const Home = ({ navigation}) => {
//  ****************************************************************************************
// Dummy Data
    const initialCurrentLocation = {
        streetName: "Lahore",
        gps: {
            latitude: 1.5496614931250685,
            longitude: 110.36381866919922
        }
    }

    const categoryData = [
        {
            id: 1,
            name: "Rice",
            icon: icons.rice_bowl,
        },
        {
            id: 2,
            name: "Noodles",
            icon: icons.noodle,
        },
        {
            id: 3,
            name: "Hot Dogs",
            icon: icons.hotdog,
        },
        {
            id: 4,
            name: "Salads",
            icon: icons.salad,
        },
        {
            id: 5,
            name: "Burgers",
            icon: icons.hamburger,
        },
        {
            id: 6,
            name: "Pizza",
            icon: icons.pizza,
        },
        {
            id: 7,
            name: "Snacks",
            icon: icons.fries,
        },
        {
            id: 8,
            name: "Sushi",
            icon: icons.sushi,
        },
        {
            id: 9,
            name: "Desserts",
            icon: icons.donut,
        },
        {
            id: 10,
            name: "Drinks",
            icon: icons.drink,
        },

    ]

    // price rating
    const affordable = 1
    const fairPrice = 2
    const expensive = 3

    const restaurantData = [
        {
            id: 1,
            name: "Burger",
            rating: 4.8,
            categories: [5, 7],
            priceRating: affordable,
            photo: images.burger_restaurant_1,
            duration: "30 - 45 min",
            location: {
                latitude: 1.5347282806345879,
                longitude: 110.35632207358996,
            },
            courier: {
                avatar: images.avatar_1,
                name: "Amy"
            },
            menu: [
                {
                    menuId: 1,
                    name: "Crispy Chicken Burger",
                    photo: images.crispy_chicken_burger,
                    description: "Burger with crispy chicken, cheese and lettuce",
                    calories: 200,
                    price: 10
                },
                {
                    menuId: 2,
                    name: "Crispy Chicken Burger with Honey Mustard",
                    photo: images.honey_mustard_chicken_burger,
                    description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                    calories: 250,
                    price: 15
                },
                {
                    menuId: 3,
                    name: "Crispy Baked French Fries",
                    photo: images.baked_fries,
                    description: "Crispy Baked French Fries",
                    calories: 194,
                    price: 8
                }
            ]
        },
        {
            id: 2,
            name: "Pizza",
            rating: 4.8,
            categories: [2, 4, 6],
            priceRating: expensive,
            photo: images.pizza_restaurant,
            duration: "15 - 20 min",
            location: {
                latitude: 1.556306570595712,
                longitude: 110.35504616746915,
            },
            courier: {
                avatar: images.avatar_2,
                name: "Jackson"
            },
            menu: [
                {
                    menuId: 4,
                    name: "Hawaiian Pizza",
                    photo: images.hawaiian_pizza,
                    description: "Canadian bacon, homemade pizza crust, pizza sauce",
                    calories: 250,
                    price: 15
                },
                {
                    menuId: 5,
                    name: "Tomato & Basil Pizza",
                    photo: images.pizza,
                    description: "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
                    calories: 250,
                    price: 20
                },
                {
                    menuId: 6,
                    name: "Tomato Pasta",
                    photo: images.tomato_pasta,
                    description: "Pasta with fresh tomatoes",
                    calories: 100,
                    price: 10
                },
                {
                    menuId: 7,
                    name: "Mediterranean Chopped Salad ",
                    photo: images.salad,
                    description: "Finely chopped lettuce, tomatoes, cucumbers",
                    calories: 100,
                    price: 10
                }
            ]
        },
        {
            id: 3,
            name: "Hotdogs",
            rating: 4.8,
            categories: [3],
            priceRating: expensive,
            photo: images.hot_dog_restaurant,
            duration: "20 - 25 min",
            location: {
                latitude: 1.5238753474714375,
                longitude: 110.34261833833622,
            },
            courier: {
                avatar: images.avatar_3,
                name: "James"
            },
            menu: [
                {
                    menuId: 8,
                    name: "Chicago Style Hot Dog",
                    photo: images.chicago_hot_dog,
                    description: "Fresh tomatoes, all beef hot dogs",
                    calories: 100,
                    price: 20
                }
            ]
        },
        {
            id: 4,
            name: "Sushi",
            rating: 4.8,
            categories: [8],
            priceRating: expensive,
            photo: images.japanese_restaurant,
            duration: "10 - 15 min",
            location: {
                latitude: 1.5578068150528928,
                longitude: 110.35482523764315,
            },
            courier: {
                avatar: images.avatar_4,
                name: "Ahmad"
            },
            menu: [
                {
                    menuId: 9,
                    name: "Sushi sets",
                    photo: images.sushi,
                    description: "Fresh salmon, sushi rice, fresh juicy avocado",
                    calories: 100,
                    price: 50
                }
            ]
        },
        {
            id: 5,
            name: "Cuisine",
            rating: 4.8,
            categories: [1, 2],
            priceRating: affordable,
            photo: images.noodle_shop,
            duration: "15 - 20 min",
            location: {
                latitude: 1.558050496260768,
                longitude: 110.34743759630511,
            },
            courier: {
                avatar: images.avatar_4,
                name: "Muthu"
            },
            menu: [
                {
                    menuId: 10,
                    name: "Kolo Mee",
                    photo: images.kolo_mee,
                    description: "Noodles with char siu",
                    calories: 200,
                    price: 5
                },
                {
                    menuId: 11,
                    name: "Sarawak Laksa",
                    photo: images.sarawak_laksa,
                    description: "Vermicelli noodles, cooked prawns",
                    calories: 300,
                    price: 8
                },
                {
                    menuId: 12,
                    name: "Nasi Lemak",
                    photo: images.nasi_lemak,
                    description: "A traditional Malay rice dish",
                    calories: 300,
                    price: 8
                },
                {
                    menuId: 13,
                    name: "Nasi Briyani with Mutton",
                    photo: images.nasi_briyani_mutton,
                    description: "A traditional Indian rice dish with mutton",
                    calories: 300,
                    price: 8
                },

            ]
        },
        {

            id: 6,
            name: "Dessets",
            rating: 4.9,
            categories: [9, 10],
            priceRating: affordable,
            photo: images.kek_lapis_shop,
            duration: "35 - 40 min",
            location: {
                latitude: 1.5573478487252896,
                longitude: 110.35568783282145,
            },
            courier: {
                avatar: images.avatar_1,
                name: "Jessie"
            },
            menu: [
                {
                    menuId: 12,
                    name: "Teh C Peng",
                    photo: images.teh_c_peng,
                    description: "Three Layer Teh C Peng",
                    calories: 100,
                    price: 2
                },
                {
                    menuId: 13,
                    name: "ABC Ice Kacang",
                    photo: images.ice_kacang,
                    description: "Shaved Ice with red beans",
                    calories: 100,
                    price: 3
                },
                {
                    menuId: 14,
                    name: "Kek Lapis",
                    photo: images.kek_lapis,
                    description: "Layer cakes",
                    calories: 300,
                    price: 20
                }
            ]

        }


    ]
  
// ****************************************************************************************
  const [categories, setCategories] = useState(categoryData)
  // categories[0].name
    const [selectedCategory, setSelectedCategory] = useState()
    const [restaurants, setRestaurants] = useState(restaurantData)
    const [currentLocation, setCurrentLocation] = useState(initialCurrentLocation)
//  ****************************************************************************************
  function onSelectCategory(category) {
    // filters restaurants by category
    let restaurantList = restaurantData.filter(c => c.categories.includes(category.id));
    setRestaurants(restaurantList)

    setSelectedCategory(category)
  }
//  ****************************************************************************************
  function getCategoryById(categoryId) {
    // filters category by categoryId
    let category = categories.filter(c => c.id === categoryId)
    // category.length > 0 
    if (category.length > 0) { 
      return (
        // return category[0].name 
        category[0].name
      )
    }
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
          // onPress console location 
         onPress={() => console.log('location')}
        >
          {/* Image that display the location */}
          <Image
            // source icons.location 
            source={icons.location}
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
          {/* Text streetName with font style h4  */}
          <Text style={{ ...FONTS.h4 }}>{currentLocation.streetName}</Text>
        </View>
        {/* wrap eveything into the TouchableOpcaity to make it touchable */}
        <TouchableOpacity
          style={{
            // justifyContent & alignItems center to centerlize it 
            justifyContent:"center",
            alignItems: 'center',
          }}
          // onPress console basket 
         onPress={() => console.log('basket')}
        >
          <Image
            // source = icons.basket 
            source={icons.basket}
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

  //  ****************************************************************************************
  // function to display the main Categories 
  function renderMainCategories() {
    // renderItem function with item as a prop
    const renderItem = ({ item }) => {
      return (
        // touchableOpcity to make the flatList touchable 
        <TouchableOpacity
          style={{
            // padding is 24 
            padding: SIZES.padding * 2,
            // marginHorizontal is 12
            marginHorizontal: SIZES.padding,
            // paddingBottom is 24 
            paddingBottom: SIZES.padding * 2,
            // backgroundColor : id selectedCategory.id == item item then primary otherwise white 
            backgroundColor: selectedCategory?.id == item.id ? COLORS.primary : COLORS.white,
            // borderRadius is 48
            borderRadius: SIZES.radius * 2,
            // justifyContent and alignItems center to centerlize it 
            alignItems: 'center',
            justifyContent: 'center',
          }}
          // onPress 
          onPress={() => {
            // console item 
            console.log(item)
            // selectCategory(item) 
            onSelectCategory(item)
          }}
        >
          {/* View to display the main items  */}
          <View
            style={{
              // height is 100 
              height: 100,
              // width is 40 
              width: 40,
            // justifyContent and alignItems center to centerlize it 
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* View to display the icons  */}
            <View
              style={{
            // backgroundColor : id selectedCategory.id == item item then white otherwise lightGray3 
                backgroundColor: selectedCategory?.id == item.id ? COLORS.white : COLORS.lightGray3,
                // width is 65 
                width: 65,
                // height is 80
                height: 80,
            // justifyContent and alignItems center to centerlize it 
                alignItems: 'center',
                justifyContent: 'center',
                // borderRadius is 24
                borderRadius: SIZES.radius
            }}
            >
              <Image
                // source is item.icon
                source={item.icon}
                // resizeMode is contain
                  resizeMode='contain'
                style={{
                    // width & height is 40 
                    width: 40,
                    height: 40,
                  }}
                />
            </View>
            {/* View to display the text  */}
            <View
              style={{
                // marginTop is 8
                marginTop: SIZES.base,
                // height is 25 
                height: 25,
                // flexWrap is wrap 
                flexWrap: 'wrap',
            // justifyContent and alignItems center to centerlize it 
                alignItems: 'center',
                justifyContent: 'center',
             }}
            >
             {/* Text is item.name with color selectedCategory.id == item item then white otherwise black  */}
              <Text style={{color: selectedCategory?.id == item.id ? COLORS.white : COLORS.black, ...FONTS.body3}}>{item.name}</Text>
            </View>
            
          </View>
        </TouchableOpacity>
      )
    }

    return (
      // Main view that hold all cards 
      <View style={{
        // padding from all sides is 24 
        padding: SIZES.padding * 2
      }}>
        {/* Text is Main with font h1  */}
        <Text style={{ ...FONTS.h1 }}>Main</Text>
        {/* Text is Categories with font h1  */}
        <Text style={{ ...FONTS.h1 }}>Categories</Text>
        
        {/* FlatList to display the Main Categories  */}
        <FlatList
          // data is categories 
          data={categories}
          // keyExtractor is item.id 
          keyExtractor={item => `${item.id}`}
          // renderItem is renderItem function 
          renderItem={renderItem}
          // type is horizontal
          horizontal
          // showHorizontalScrollIndicator is false 
          showsHorizontalScrollIndicator={false}
          // contentCotainerStyle to give style to FlatList
          contentContainerStyle={{
            // paddingVertical is 24
            paddingVertical: SIZES.padding * 2,
          }}
        />
      </View>
    )
  }

  //  ********************************************************************************
  // function to display the RestaurantList 
  function renderRestaurantList() {
    // renderItem with item as a prop
    const renderItem = ({ item }) => {
      return (
        // wrap eveything into TouchableOpacity to make it touchable  
        <TouchableOpacity
          style={{
            // paddingBottom is 30 
             paddingBottom: 30,
          }}
          //  OnPress navigate to resturant screen with item,currentLocation
          onPress={() => navigation.navigate('resturant', {
            item,
            currentLocation
          })}
        >
          {/* ******************************** */}
          {/* image section to display the img */}
          <View
            style={{
              // borderRadius is 24 
              borderRadius: SIZES.radius,
              // height is 66% width of screen
              height: SIZES.width / 1.75,
           }}
          >
            <Image
              // source is item.photo
              source={item.photo}
              // resizeMode is cover 
              resizeMode='cover'
              style={{
                // width and height is 100%
                width: '100%',
                height: '100%',
                // borderRadius is 24 
                borderRadius: SIZES.radius,
              }}
            />
            {/* ******************************** */}
            {/* duration section  */}
            <View
              style={{
                // position is absolute 
                position: 'absolute',
                // bottom,left its zero 
                bottom: 0,
                left: 0,
                // backgroundColor is white 
                backgroundColor: COLORS.white,
                // width is 100
                width: 100,
                // height is 50 
                height: 50,
                // justifyContent and alignitems center to centerlize it 
                justifyContent: 'center',
                alignItems: 'center',
                // borderTopRightRadius, borderBottomLeftRadius is 24 
                borderTopRightRadius: SIZES.radius,
                borderBottomLeftRadius: SIZES.radius,
              }}
            >
              {/* Text item.duration with font body3  */}
              <Text style={{...FONTS.body3}}>{item.duration}</Text>
            </View>
          </View>
          {/* ******************************** */}
          {/* name section  */}
          <View
            style={{
              // marginVertical is 8
                marginVertical: SIZES.base
             }}
          >
            {/* Text is name with font is h2  */}
              <Text style={{...FONTS.h2}}>{item.name}</Text>
          </View>
          {/* ******************************** */}
          {/* rating category section  */}
          <View
            // flexDirection is row 
           flexDirection='row'
          >
            {/* image to display star */}
            <Image
              // source is icons.star
              source={icons.star}
              // resizeMode is contain
              resizeMode='contain'
              style={{
                // width and height is 20 
                width: 20,
                height: 20,
                // tintColor is primary 
                tintColor: COLORS.primary
              }}
            />
            {/* Text item.rating with font h4 marginLeft is 08 */}
            <Text style={{ ...FONTS.h4, marginLeft: SIZES.base }}>{item.rating}</Text>
            {/* View to display the category  */}
            <View
              style={{
                // flexDirection is row 
                flexDirection: 'row',
                // marginLeft is 10 
                marginLeft: 10,
            }}
            >
              {/* item.categories.map(catergoryId) */}
              {item.categories.map((categoryId) => {
                return (
                  // View to display the catergory
                  <View
                    style={{
                      // flexDirection is row 
                      flexDirection: 'row',
                      // marginHorizontal is 08
                      marginHorizontal: SIZES.base,
                    }}
                    // key is categoryId 
                   key={categoryId}
                  >
                    {/* Text is getCategoryById function and pass categoryId to display the category */}
                    <Text style={{ ...FONTS.body3 }}>{getCategoryById(categoryId)}</Text>
                    </View>
                  )
                })}
            </View>
            {/* because 3 catogories  */}
            {/* [1,2,3].map(priceRating) */}
            {
              [1, 2, 3].map((priceRating) => (
                // Text is $
                <Text
                  // key is priceRating 
                  key={priceRating}
                  style={{
                    // font body3 
                    ...FONTS.body3,
                    // color priceRating lessthan equal to item.pricerating ? black otherwise darkgray
                    color: (priceRating <= item.priceRating) ? COLORS.black : COLORS.darkgray
                  }}
                > $ </Text>
              ))
            }
          </View>
        </TouchableOpacity>
      )
    }
    return (
      // FlatList to display the Restaurants List 
      <FlatList
        // data is restaurants 
        data={restaurants}
        // keyExtractor is item.id 
        keyExtractor={item => `${item.id}`}
        // renderItem is renderItem function 
        renderItem={renderItem}
        // showVerticalScrollIndicator is false 
        showsVerticalScrollIndicator={false}
        // contentContainerStyle 
        contentContainerStyle={{
          // paddingHorizontail is 24 
          paddingHorizontal: SIZES.padding * 2,
          // paddingBottom is 30 
          paddingBottom: 30,

        }}
      />
    )
  }

  return (
    // Main Return and wrap it into the SafeAreaView 
    <SafeAreaView style={{
      // flex:1 
      flex: 1,
      // backgroundColor is lightGray4
      backgroundColor: COLORS.lightGray4
    }}>
      {/* ********************************************************************** */}
      {/* function to renderHeader into the Home Screen */}
      {renderHeader()}
      {/* ********************************************************************** */}
      {/* function to renderMainCategories into the Home Screen */}
      {renderMainCategories()}
      {/* ********************************************************************** */}
      {/* function to renderRestaurantList into the Home Screen */}
      {renderRestaurantList()}

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

export default Home