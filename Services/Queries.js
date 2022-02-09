import {gql} from '@apollo/client'
export const LOAD_PRODUCTS = gql`
    query{
        product{
          id
          name
          price
          image
        }
      }      
`

export const LOAD_PRODUCTBYID = gql`
    query product_id($id: Int!)
            {
            product(where: {id: {_eq: $id}}) {
                id
                name
                price
                image
                description
            }
    }     
`