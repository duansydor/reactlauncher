import React, { useState, useEffect } from "react";
import { View, FlatList, Text, Image, StyleSheet } from "react-native";
import { BASE_ANIME_URL } from "../../Utils/Variables";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button } from "tamagui";


const CategoryPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [results, setResults] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const categoryID = route.params;
  useEffect(() => {
    console.log(typeof currentPage)
    fetchData();
  }, [currentPage]); // Fetch data whenever currentPage changes

  const fetchData = async () => {
    
    try {
      const response = await fetch(
        `${BASE_ANIME_URL}/genre/${categoryID}?page=${currentPage}`
      );
      const data = await response.json();
      if (data != undefined) {
        setCurrentPage(parseInt(data.currentPage));
        setHasNextPage(data.hasNextPage);

        const newResultsFiltered = data.results.filter((newItem) => {
          return !results.some(
            (existingItem) => existingItem.id === newItem.id
          );
        });
        // Update results only if it's the first page
        if (currentPage === 1) {
          setResults(newResultsFiltered);
        } else {
          // Concatenate new results with existing ones
          setResults([...results, ...newResultsFiltered]);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setRefreshing(false); // End refreshing
    }
  };

  const loadMoreData = () => {
    if (hasNextPage) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item} >
            <Image style={styles.image} source={{ uri: item.image }} />
            <View style={styles.details}>
              <Button
               theme={"surface1"}
               variant="outlined"
               
               onPress={()=>{
                navigation.navigate("AnimePage",item)
               }}
               >
                
          
                <Text>{item.title} - {item.released}</Text>
                </Button>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <Button
            onPress={loadMoreData}
            disabled={!hasNextPage}
          >
          Load More
          </Button>
        )}
        refreshing={refreshing}
        onRefresh={fetchData} // Set onRefresh to fetchData
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent:"flex-start",
    alignItems:"flex-start"
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default CategoryPage;
