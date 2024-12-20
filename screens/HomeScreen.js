import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch("https://api.tvmaze.com/search/shows?q=all");
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderFeaturedMovies = () => {
    if (movies.length === 0) return null;

    const featuredMovies = movies.slice(0, 3);

    return (
      <FlatList
        data={featuredMovies}
        keyExtractor={(item) => item.show?.id.toString()}
        renderItem={({ item }) => {
          const featuredMovie = item.show;

          return (
            <TouchableOpacity style={styles.featuredMovie}>
              <Image
                source={{ uri: featuredMovie.image?.original }}
                style={styles.featuredImage}
                resizeMode="contain"
              />
              <View style={styles.featuredInfo}>
                <View style={styles.titleRatingContainer}>
                  <Text style={styles.featuredTitle}>
                    {featuredMovie.name || "Unknown Title"}
                  </Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.featuredRating}>
                      <AntDesign name="star" size={20} color="#FFD700" />{" "}
                      {featuredMovie.rating?.average || "N/A"}
                    </Text>
                  </View>
                </View>
                <Text style={styles.featuredSummary} numberOfLines={2}>
                  {featuredMovie.summary?.replace(/<[^>]+>/g, "") ||
                    "No summary available."}
                </Text>

                <Text style={styles.featuredGenres}>
                  <Entypo name="tag" size={16} color="#ccc" />{" "}
                  {featuredMovie.genres?.join(", ") || "No genres available."}
                </Text>

                <Text style={styles.featuredStatus}>
                  <AntDesign
                    name="checkcircle"
                    size={16}
                    color={featuredMovie.status === "Running" ? "green" : "red"}
                  />{" "}
                  {featuredMovie.status || "Unknown Status"}
                </Text>

                <Text style={styles.featuredNetwork}>
                  <Entypo name="network" size={16} color="#ccc" />{" "}
                  {featuredMovie.network?.name || "No network available."}
                </Text>

                <TouchableOpacity
                  style={styles.playButton}
                  onPress={() =>
                    navigation.navigate("Details", { movie: featuredMovie })
                  }
                >
                  <Text style={styles.playButtonText}>More Details</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    );
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
      <View style={styles.top}>
        <Image
          source={require("../assets/Images/logo1.png")}
          style={styles.image}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          placeholderTextColor="#fff"
          onFocus={() => navigation.navigate("Search")}
        />
      </View>
      <ScrollView>
        {renderFeaturedMovies()}
        <Text style={styles.sectionTitle}>Other Movies</Text>
        <FlatList
          data={movies.slice(3)}
          keyExtractor={(item) => item.show.id.toString()}
          renderItem={renderMovie}
          horizontal
          contentContainerStyle={styles.list}
        />
      </ScrollView>
      <View style={styles.bottom}>
        <TouchableOpacity style={{ marginLeft: 30 }}>
          <Entypo name="home" size={30} color="white" style={styles.icon} />
          <Text style={styles.bottomText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginRight: 70 }}
          onPress={() => navigation.navigate("Search")}
        >
          <AntDesign
            name="search1"
            size={30}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.bottomText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a1a1a" },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 60,
    marginLeft: 10,
  },
  searchBar: {
    backgroundColor: "#333",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    flex: 1,
    marginLeft: 30,
  },
  featuredMovie: {
    marginTop: 5,
    marginHorizontal: 20,
    borderRadius: 10,
    width: 370,
    backgroundColor: "#2a2a2a",
  },
  featuredImage: {
    width: "100%",
    height: 350,
  },
  featuredInfo: {
    padding: 10,
  },
  featuredTitle: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
  },
  featuredSummary: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 10,
  },
  playButton: {
    backgroundColor: "#e50914",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  playButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 5,
  },
  list: {
    paddingHorizontal: 12,
  },
  movieCard: {
    marginRight: 10,
    width: 120,
    alignItems: "center",
  },
  thumbnail: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginBottom: 5,
  },
  title: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  bottomText: {
    color: "white",
    marginLeft: 50,
  },
  bottom: {
    backgroundColor: "#0E0C0A",
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    marginLeft: 50,
    marginTop: 10,
  },
  featuredRating: {
    fontSize: 19,
    marginLeft: 5,
    color: "white",
  },
  featuredGenres: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 5,
  },
  featuredStatus: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 5,
  },
  featuredNetwork: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 10,
  },

  titleRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default HomeScreen;
