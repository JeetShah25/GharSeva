import {
    StyleSheet,
    Button,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    Image,
  } from "react-native";
import React, {useState, useEffect, useContext} from 'react';
import { useQuery} from '@apollo/client';
import { LOAD_PRODUCTBYID } from '../Services/Queries';
import { CartContext } from "../Components/CartContext";

const ProductDetails = ({route}) => {
    const { productId } = route.params;
    const {error, loading, data} = useQuery(LOAD_PRODUCTBYID, {
        variables: {id: productId},
      });
    const [product, setProduct] = useState({})
    
    useEffect(() => {
        //console.log(data)
        if(data){
        setProduct(data.product[0])
        }
    }, [data])

    //console.log(product)

    // console.log(productId);
  const { addItemToCart, getProductId } = useContext(CartContext);
  function AddToCart() {
      
      getProductId(product.id);
      addItemToCart();
    }
  return (
    <SafeAreaView>
        {loading ? (
          <Text>Loading ...</Text>
        ) : (

      <ScrollView>
        <Image style={styles.image} source={{uri: require('../assets/products/car-101.jpg')}}/>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>₹ {product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Button style={{color: 'orange', backgroundColor: 'red'}} title="Add to Cart" onPress={AddToCart}/>
        </View>
      </ScrollView>)}
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
    
      image: {
        height: 300,
        width: "100%",
      },
      infoContainer: {
        padding: 16,
      },
      name: {
        fontSize: 22,
        fontWeight: "bold",
      },
      price: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
      },
      description: {
        fontSize: 16,
        fontWeight: "400",
        color: "#787878",
        marginBottom: 16,
      },
    
});
