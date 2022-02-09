import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();
import { useQuery} from '@apollo/client';
import { LOAD_PRODUCTBYID } from "../Services/Queries";

export function CartProvider(props) {
  const [items, setItems] = useState([]);
  const [productId, setProductId] = useState(1);
  const {error, loading, data} = useQuery(LOAD_PRODUCTBYID, {
    variables: {id: productId},
  });
const [product, setProduct] = useState({
    id: '100', name: ''
})

useEffect(() => {
    //console.log(data)
    if(data){
    setProduct(data.product[0])
    }
}, [data])


  function addItemToCart() {
        //console.log(data)
    setProductId(cartProductId);
    
    console.log(product);
    setItems((prevItems) => {
      const item = prevItems.find((item) => item.id == cartProductId);
      if (!item) {
        return [
          ...prevItems,
          {
            cartProductId,
            qty: 1,
            product,
//            totalPrice: item.price,
          },
        ];
      } else {
        return prevItems.map((item) => {
          if (item.id == cartProductId) {
            item.qty++;
//            item.totalPrice += item.price;
          }
          return item;
        });
      }
    });
  }

  function getItemsCount() {
    return items.reduce((sum, item) => sum + item.qty, 0);
  }

//   function getTotalPrice() {
//     return items.reduce((sum, item) => sum + item.totalPrice, 0);
//   }

    const [cartProductId, setCartProductId] = useState(100);
//    console.log(cartProductId);

  function getProductId(id){
      setCartProductId(id);
  }

//   useEffect(() => {
//     addItemToCart();
// }, [getProductId])




//console.log(cartProductId);

  return (
    <CartContext.Provider
      value={{ items, setItems, getItemsCount, addItemToCart, getProductId}}
    >
      {props.children}
    </CartContext.Provider>
  );
}
