import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  TextInput,
  View,
  KeyboardAvoidingView,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FIREBASE_AUTH, GOOGLE_AUTH_PROVIDER } from "../../firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  const signUp = async () => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      alert("Check your Email");
      console.log(res);
    } catch (error: any) {
      console.log(error);
      alert("Registration failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
    } catch (error: any) {
      console.log(error);
      alert("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, GOOGLE_AUTH_PROVIDER);
      console.log(res);
    } catch (error: any) {
      console.log(error);
      alert("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.form}>
          <TextInput
            placeholder="example@example.com"
            autoCapitalize="none"
            onChangeText={(text: string) => setEmail(text)}
            value={email}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text: string) => setPassword(text)}
            value={password}
            style={styles.input}
          />
          {loading ? (
            <ActivityIndicator size="large" color="#000fff" />
          ) : (
            <>
              <View style={styles.button}>
                <Button onPress={signIn} title="Login" />
              </View>
              <View style={styles.button}>
                <Button onPress={signUp} title="Create Account" />
              </View>
              <View style={styles.button}>
                <Button onPress={signWithGoogle} title="Sign in with Google" />
              </View>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  form: {
    marginVertical: 20,
    flexDirection: "column",
  },
  input: {
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
  },
  button: {
    marginVertical: 5,
  },
});
