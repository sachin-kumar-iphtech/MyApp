import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

export default function App() {
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const USERS_PER_PAGE = 8;

  // ✅ Fetch Data (GET)
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();

      // fake more data to show multiple pages
      const extendedData = [...data, ...data, ...data, ...data]; // 40 users
      setUsers(extendedData);
      setFilteredData(extendedData);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Add new user (POST)
  // const addUser = async () => {
  //   if (!name || !email) {
  //     Alert.alert("Validation", "Please enter both name and email");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     const res = await fetch("https://jsonplaceholder.typicode.com/users", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ name, email }),
  //     });
  //     const newUser = await res.json();
  //     setUsers((prev) => [newUser, ...prev]);
  //     setFilteredData((prev) => [newUser, ...prev]);
  //     setName("");
  //     setEmail("");
  //   } catch (error) {
  //     Alert.alert("Error", "Failed to add user");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // ✅ Search functionality
  const handleSearch = (text) => {
    setSearch(text);
    if (text === "") {
      setFilteredData(users);
      setPage(1);
    } else {
      const result = users.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(result);
      setPage(1);
    }
  };

  // ✅ Pagination Logic
  const totalPages = Math.ceil(filteredData.length / USERS_PER_PAGE);
  const startIndex = (page - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const goToPrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Fetch API Example with Pagination</Text>

      {/* Add User
      <TextInput
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TouchableOpacity onPress={addUser} style={styles.button}>
        <Text style={styles.buttonText}>Add User</Text>
      </TouchableOpacity> */}

      {/* Search */}
      <TextInput
        placeholder="Search user..."
        value={search}
        onChangeText={handleSearch}
        style={styles.searchBox}
      />

      {/* Loading */}
      {loading ? (
        <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />
      ) : (
        <>
          <FlatList
            data={currentPageData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.email}>{item.email}</Text>
              </View>
            )}
          />

          {/* Pagination Controls */}
          <View style={styles.pagination}>
            <TouchableOpacity
              style={[styles.pageButton, page === 1 && { backgroundColor: "gray" }]}
              onPress={goToPrevPage}
              disabled={page === 1}
            >
              <Text style={styles.pageText}>Previous</Text>
            </TouchableOpacity>

            <Text style={styles.pageNumber}>
              Page {page} of {totalPages}
            </Text>

            <TouchableOpacity
              style={[
                styles.pageButton,
                page === totalPages && { backgroundColor: "gray" },
              ]}
              onPress={goToNextPage}
              disabled={page === totalPages}
            >
              <Text style={styles.pageText}>Next</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  heading: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  searchBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
  },
  name: { fontSize: 16, fontWeight: "bold" },
  email: { fontSize: 14, color: "gray" },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  pageButton: {
    backgroundColor: "blue",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  pageText: { color: "#fff", fontWeight: "bold" },
  pageNumber: { fontSize: 16, fontWeight: "bold" },
});
