import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const DetailsScreen = ({ route }) => {
  const { movie } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.box}>
        {movie.image && (
          <Image
            source={{ uri: movie.image.original }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        <Text style={styles.title}>{movie.name}</Text>

        <Text style={styles.summary}>
          {movie.summary.replace(/<[^>]+>/g, "")}
        </Text>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailTitle}>Genres:</Text>
          <Text style={styles.detailText}>{movie.genres.join(", ")}</Text>

          <Text style={styles.detailTitle}>Rating:</Text>
          <Text style={styles.detailText}>
            {movie.rating.average ? movie.rating.average : "N/A"}
          </Text>

          <Text style={styles.detailTitle}>Premiered:</Text>
          <Text style={styles.detailText}>
            {movie.premiered ? movie.premiered : "N/A"}
          </Text>

          <Text style={styles.detailTitle}>Ended:</Text>
          {movie.ended ? (
            <Text style={styles.detailText}>{movie.ended}</Text>
          ) : (
            <Text style={styles.detailText}>Currently Airing</Text>
          )}

          <Text style={styles.detailTitle}>Type:</Text>
          <Text style={styles.detailText}>
            {movie.type ? movie.type : "N/A"}
          </Text>

          <Text style={styles.detailTitle}>Status:</Text>
          <Text style={styles.detailText}>
            {movie.status ? movie.status : "N/A"}
          </Text>

          {movie.schedule && (
            <View>
              <Text style={styles.detailTitle}>Schedule:</Text>
              <Text style={styles.detailText}>
                {movie.schedule.days.join(", ")} at {movie.schedule.time}
              </Text>
            </View>
          )}

          {movie.network && (
            <View>
              <Text style={styles.detailTitle}>Network:</Text>
              <Text style={styles.detailText}>{movie.network.name}</Text>
              <Text style={styles.detailTitle}>Country:</Text>
              {movie.network.country && (
                <Text style={styles.detailText}>
                  {movie.network.country.name}
                </Text>
              )}
            </View>
          )}

          <Text style={styles.detailTitle}>Runtime:</Text>
          <Text style={styles.detailText}>
            {movie.runtime ? movie.runtime : "N/A"}
          </Text>

          <Text style={styles.detailTitle}>Language:</Text>
          <Text style={styles.detailText}>
            {movie.language ? movie.language : "N/A"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  box: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  image: {
    width: "100%",
    height: 350,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
    textAlign: "center",
  },
  summary: {
    fontSize: 16,
    lineHeight: 24,
    color: "#CCCCCC",
    marginBottom: 16,
    textAlign: "justify",
  },
  detailsContainer: {
    marginTop: 16,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#AAAAAA",
    marginBottom: 4,
  },
  detailText: {
    fontSize: 16,
    color: "#DDDDDD",
    marginBottom: 12,
  },
});

export default DetailsScreen;
