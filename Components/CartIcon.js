
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CartContext } from './CartContext';

export function CartIcon({navigation}) {
  const {getItemsCount} = useContext(CartContext);
  return (
    <View>
    <Icon name="shopping-cart" style={styles.container}
        onPress={() => {
          navigation.navigate('Cart');
        }} >
        <Text style={styles.text}>
        &nbsp;({getItemsCount()})
        </Text>
      </Icon>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 20,
    marginHorizontal: 10,
    backgroundColor: 'orange',
    height: 40,
    width: 75,
    paddingTop: 8,
    paddingBottom: 8,
    paddingStart: 18,
    borderRadius: 12,
  },
  text: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
  },
});
