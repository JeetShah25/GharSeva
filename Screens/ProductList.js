import React, {useEffect, useState} from 'react';
import { useQuery} from '@apollo/client';
import { LOAD_PRODUCTS } from '../Services/Queries';
import {
    StyleSheet,
    Button,
    Text,
    View,
    SafeAreaView,
    FlatList,
    Image,
    Touchable,
    TouchableOpacity,
  } from "react-native";
import { useNavigation } from '@react-navigation/native';
import cake from "../assets/products/cake-102.jpg"
const ProductList = () => {
    const {error, loading, data} = useQuery(LOAD_PRODUCTS)
    const [products, setProducts] = useState([])
    const navigation = useNavigation();
    useEffect(() => {
        //console.log(data)
        if(data){
        setProducts(data.product)
        }
    }, [data])
    // console.log()
    const FlatListItemSeparator = () => {
      return (
        <View
          style={{
            height: .5,
            width: "100%",
            backgroundColor: "#000",
          }}
        />
      );
    }
 

  return (
    <SafeAreaView style={styles.container}>
        {loading ? (
          <Text>Loading ...</Text>
        ) : (
          <View style={styles.MainContainer}>
          <FlatList
       
        data={ products }
        
        ItemSeparatorComponent = {FlatListItemSeparator}
 
        renderItem={({item}) => 
        
          <TouchableOpacity onPress={() => {
            navigation.navigate('ProductDetails', {
              productId: item.id,
            });
          }} > 
            <View style={{flex:1, flexDirection: 'row'}}>
    
              <Image source = {{uri: require('../assets/products/car-101.jpg')}} style={styles.imageView} />
              <View style={{flex:1, flexDirection: 'col', justifyContent: 'center'}}>
              <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                   {item.name}
                 </Text>
                 <Text>Price: ₹ {item.price}</Text>
                 <View style={styles.bt}>
                   {/* <Button
                     type="clear"
                     title="Add to Cart" />  */}
              </View>
              </View>
            </View>
            </TouchableOpacity>
          }
 
        keyExtractor={(item) => item.id}
        
        />
        </View>
      )}
      </SafeAreaView>

  );
};

const styles = StyleSheet.create({
 
  MainContainer :{
   
      justifyContent: 'center',
      flex:1,
      margin: 5,
   
  },
   
  imageView: {
   
      width: '50%',
      height: 100 ,
      margin: 7,
      borderRadius : 7
   
  },
   
  });

export default ProductList;

