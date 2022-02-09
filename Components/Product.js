import React from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";


export function Product({name, price, image, onPress}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
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
              <Button
                type="clear"
            title="Add to Cart" onPress={productPress}
              /> 
          </View>
          </View>
        </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    alignContent: 'center',
    backgroundColor: 'white',
    width: 250,
    alignSelf: 'center',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 10,
  },
  thumb: {
    height: 100,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
});
