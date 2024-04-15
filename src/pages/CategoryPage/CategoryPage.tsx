import React, { useState, useEffect } from "react";
import { View, FlatList, Text, Button } from "react-native";
import { BASE_ANIME_URL } from "../../Utils/Variables";

const CategoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [results, setResults] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    fetchData();
  }, [currentPage]); // Fetch data whenever currentPage changes

  const fetchData = async () => {
    try {
      setRefreshing(true); // Start refreshing
      const categoryID = "workplace";
      const response = await fetch(
        `${BASE_ANIME_URL}/genre/${categoryID}?page=${currentPage}`
      );
      const data = await response.json();

      setCurrentPage(data.currentPage);
      setHasNextPage(data.hasNextPage);

      // Filter out items that are already present in the results array
      const newResults = data.results.filter((newItem) => {
        return !results.some((existingItem) => existingItem.id === newItem.id);
      });
      
      setResults((prevResults) => [...prevResults, ...newResults]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setRefreshing(false); // End refreshing
    }
  };

  const loadMoreData = () => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <View>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.released}</Text>
            {/* Render other data as needed */}
          </View>
        )}
        ListFooterComponent={() => (
          <Button
            title="Load More"
            onPress={loadMoreData}
            disabled={!hasNextPage}
          />
        )}
      />
    </View>
  );
};

export default CategoryPage;
