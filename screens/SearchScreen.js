import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (searchText.trim() === "") return;

    setLoading(true);
    setHasSearched(true);
    try {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${searchText}`
      );
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderMovie = ({ item }) => {
    const { show } = item;
    return (
      <TouchableOpacity
        style={styles.movieCard}
        onPress={() => navigation.navigate("Details", { movie: show })}
      >
        <Image
          source={{ uri: show.image?.original }}
          style={styles.thumbnail}
        />
        <Text style={styles.title}>{show.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for movies..."
          placeholderTextColor="#ccc"
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            handleSearch();
          }}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#e50914" style={styles.loader} />
      ) : hasSearched && movies.length === 0 ? (
        <Text style={styles.noResultsText}>
          No results found. Try searching for something else.
        </Text>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.show.id.toString()}
          renderItem={renderMovie}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    paddingTop: 10,
  },
  searchBarContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#333",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    marginRight: 10,
  },
  list: {
    paddingHorizontal: 10,
  },
  movieCard: {
    flex: 1,
    margin: 5,
    height: 330,
    alignItems: "center",
    justifyContent: "center",
  },
  thumbnail: {
    width: "100%",
    height: "80%",
    borderRadius: 8,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 5,
  },
  loader: {
    marginTop: 20,
  },
  noResultsText: {
    color: "#ccc",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default SearchScreen;
