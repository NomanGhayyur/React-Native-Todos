import React, { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { View, Text, StyleSheet } from "react-native";

const Details = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>User Details </Text>
      <Text style={styles.infoText}>Email: {user?.email} </Text>
      <Text style={styles.infoText}>Verified: {user?.emailVerified} </Text>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  infoText: {
    flex: 1,
    paddingHorizontal: 4,
  },
});
