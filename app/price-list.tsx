import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { FlatList, Text } from "react-native";

const GET_PRICE_LIST = gql(`
    query orders{
  orderBooks(orderBookInputs:  {
     size: 6000,
     symbol: "ZECUSDT",
     reasonableBuyPrice: 165,
     reasonableSellPrice: 400
  }){
    bidsSize,
    asksSize,
    bids{
      price,
      units
    },
    asks{
      price,
      units
    }
  }
}`);

export interface GraphQlDataResponse {
    orderBooks: OrderBooks;
}

export interface OrderBooks {
    bidsSize: number;
    asksSize: number;
    bids: Ask[];
    asks: Ask[];
}

export interface Ask {
    price: string;
    units: string;
}

export function PriceList() {
    const { loading, error, data } =
        useQuery<GraphQlDataResponse>(GET_PRICE_LIST);
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error {JSON.stringify(error)}</Text>;

    return (
        <FlatList
            data={data?.orderBooks.bids}
            renderItem={({ item }) => (
                <Text>
                    {item.price} - {item.units}
                </Text>
            )}
            keyExtractor={(item) => item.price.toString()}
        />
    );
}

export default PriceList;
