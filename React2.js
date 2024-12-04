import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Update with your backend URL

export default function App() {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [boardingPoints, setBoardingPoints] = useState([]);
  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState("");
  const [seats, setSeats] = useState(1);
  const [userId] = useState(1); // Example User ID

  // Fetch buses based on destination and date
  const fetchBuses = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/buses`, {
        params: { destination, date },
      });
      setBuses(response.data);
    } catch (error) {
      Alert.alert("Error", "Unable to fetch buses.");
      console.error(error);
    }
  };

  // Fetch boarding points for a selected bus
  const fetchBoardingPoints = async (busId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/boarding_points/${busId}`);
      setBoardingPoints(response.data);
    } catch (error) {
      Alert.alert("Error", "Unable to fetch boarding points.");
      console.error(error);
    }
  };

  // Book a ticket
  const bookTicket = async () => {
    if (!selectedBus || !selectedBoardingPoint) {
      Alert.alert("Error", "Please select a bus and boarding point.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/book_ticket`, {
        user_id: userId,
        bus_id: selectedBus.bus_id,
        boarding_id: selectedBoardingPoint,
        seats_booked: seats,
      });
      Alert.alert("Success", "Ticket booked successfully!");
    } catch (error) {
      Alert.alert("Error", "Unable to book ticket.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cross-Platform Ticket Booking</Text>

      {/* Search Section */}
      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={destination}
        onChangeText={setDestination}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <Button title="Search Buses" onPress={fetchBuses} />

      {/* Bus List */}
      <FlatList
        data={buses}
        keyExtractor={(item) => item.bus_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.bus_name}</Text>
            <Text>Route: {item.route}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>Departure: {new Date(item.departure_time).toLocaleString()}</Text>
            <Button
              title="Select Bus"
              onPress={() => {
                setSelectedBus(item);
                fetchBoardingPoints(item.bus_id);
              }}
            />
          </View>
        )}
      />

      {/* Boarding Points */}
      {boardingPoints.length > 0 && (
        <>
          <Text style={styles.subHeading}>Select Boarding Point</Text>
          <FlatList
            data={boardingPoints}
            keyExtractor={(item) => item.boarding_id.toString()}
            renderItem={({ item }) => (
              <Button
                title={item.location}
                onPress={() => setSelectedBoardingPoint(item.boarding_id)}
              />
            )}
          />
        </>
      )}

      {/* Booking Section */}
      {selectedBus && selectedBoardingPoint && (
        <View style={styles.bookingSection}>
          <TextInput
            style={styles.input}
            placeholder="Seats"
            keyboardType="numeric"
            value={seats.toString()}
            onChangeText={(text) => setSeats(Number(text))}
          />
          <Button title="Book Ticket" onPress={bookTicket} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bookingSection: {
    marginTop: 20,
  },
});
