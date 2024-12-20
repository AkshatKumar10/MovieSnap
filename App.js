// import { StatusBar } from "expo-status-bar";
// import "./global.css";
// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   ActivityIndicator,
//   Image,
// } from "react-native";
// import axios from "axios";
// import { useEffect, useState } from "react";

// export default function App() {
//   const [shows, setShows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         "https://api.tvmaze.com/search/shows?q=all"
//       );
//       setShows(response.data);
//     } catch (error) {
//       setError("Error fetching data");
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const renderItem = ({ item }) => (
//     <View style={styles.itemContainer}>
//       <Text style={styles.title}>{item.show.name}</Text>
//       {item.show.image && (
//         <Image source={{ uri: item.show.image.medium }} style={styles.image} />
//       )}
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#ffffff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={shows}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.show.id.toString()}
//       />
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#1e3a8a", // Change to your desired background color
//     padding: 10,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#1e3a8a",
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#1e3a8a",
//   },
//   errorText: {
//     color: "white",
//     fontSize: 18,
//   },
//   itemContainer: {
//     marginBottom: 15,
//     backgroundColor: "#3b82f6", // Change to your desired item background color
//     padding: 10,
//     borderRadius: 5,
//   },
//   title: {
//     color: "white",
//     fontSize: 18,
//   },
//   image: {
//     width: 100,
//     height: 150,
//     marginTop: 5,
//   },
// });

// App.js
import React from "react";
import { SafeAreaView } from "react-native";
import AppNavigation from "./navigation/appNavigation";

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <SplashScreen /> */}
      <AppNavigation />
    </SafeAreaView>
  );
};

export default App;
