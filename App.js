import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductList from './Screens/ProductList';
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from '@apollo/client';
import {onError} from "@apollo/client/link/error"
import ProductDetails from './Screens/ProductDetails';
import { CartProvider } from './Components/CartContext';
import { Cart } from './Screens/Cart';
import { CartIcon } from './Components/CartIcon';

const Stack = createNativeStackNavigator();
const errorLink = onError(({graphqlErrors, networkError}) => {
  if(graphqlErrors){
    graphqlErrors.map(({message, location, path})=>{
      alert(`Graphql Errors ${message}`);
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({uri: "https://ecommerce-assign.hasura.app/v1/graphql",
    headers:{
    'x-hasura-admin-secret':'d6Co7qXtCy9pTlYNRLnMziA9qWnRg9tXDzIiqHR93IkQV3AdaE8h2IsZNC6K1ePD'
    }
  }),
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})


function App() {
  return (
    <>
    <View style={styles.header}>
      <SafeAreaView style={styles.container}>
        <Text style={{ color: 'white', marginTop: 25, textAlign: 'center', fontSize: 25, fontWeight: 'bold', fontStyle: 'normal' }}>
Apnakart
        </Text>
      </SafeAreaView>
    </View>
    <ApolloProvider client={client}>
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Products' component={ProductList} 
          options={({ navigation }) => ({
            title: 'Products',
            headerTitleStyle: styles.headerTitle,
             headerRight: () => <CartIcon navigation={navigation}/>
          })}/>
          <Stack.Screen name='ProductDetails' component={ProductDetails} 
          options={({ navigation }) => ({
            title: 'Product details',
            headerTitleStyle: styles.headerTitle,
             headerRight: () => <CartIcon navigation={navigation}/>,
          })} />
          <Stack.Screen name='Cart' component={Cart} 
          options={({ navigation }) => ({
            title: 'My cart',
            headerTitleStyle: styles.headerTitle,
            headerRight: () => <CartIcon navigation={navigation}/>,
          })} />
        </Stack.Navigator> 
      </NavigationContainer>
    </CartProvider>
    </ApolloProvider>
    </>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    padding: 10,
    fontWeight: "bold",
    color: "#965656",
  },
  container: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
    height: 100,
    backgroundColor: 'orange',
    // marginb: 30,
    justifyContent: 'center',
  },
  header: {
    backgroundColor: 'white',
    width: '100%',
    height: 70,
  },
});

export default App;
