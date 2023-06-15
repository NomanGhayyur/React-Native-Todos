import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";

export interface Todo {
  title: string;
  done: boolean;
  id: string;
}
export interface RouterProps {
  navigation: NavigationProp<any | any[]>;
}

const List = ({ navigation }: RouterProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState("");

  const auth = FIREBASE_AUTH;

  const logOut = async () => {
    try {
      const res = await signOut(auth);
      alert("Logout Success");
    } catch (error: any) {
      console.log(error);
      alert("failed: " + error.message);
    }
  };

  useEffect(() => {
    const todoRef = collection(FIRESTORE_DB, "todos");

    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        console.log("UPDATED");

        const todos: Todo[] = [];
        snapshot.docs.forEach((doc) => {
          todos.push({
            id: doc.id,
            ...doc.data(),
          } as Todo);
        });
        setTodos(todos);
      },
    });
    return () => subscriber();
  }, []);

  const addTodo = async () => {
    const doc = await addDoc(collection(FIRESTORE_DB, "todos"), {
      title: todo,
      done: false,
    });
    setTodo("");
  };

  const renderTodo = ({ item }: { item: Todo }) => {
    const ref = doc(FIRESTORE_DB, `todos/${item.id}`);
    const toggleDone = async () => {
      updateDoc(ref, { done: !item.done });
    };
    const deleteItem = async () => {
      deleteDoc(ref);
    };

    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={toggleDone} style={styles.todo}>
          {item.done && (
            <Ionicons name="md-checkmark-circle" size={32} color="green" />
          )}
          {!item.done && <Entypo name="circle" size={30} color="black" />}
          <Text style={styles.todoText}>{item.title}</Text>
        </TouchableOpacity>
        <Ionicons
          name="trash-bin-outline"
          color="red"
          size={30}
          onPress={deleteItem}
        />
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Ionicons
            name="person-circle-outline"
            color="black"
            size={30}
            onPress={() => navigation.navigate("Details")}
          />
          <Button onPress={() => logOut()} title="Logout" />
        </View>
        <View style={styles.form}>
          <TextInput
            placeholder="Title here.."
            onChangeText={(text: string) => setTodo(text)}
            value={todo}
            style={styles.input}
          />
          <Button
            onPress={() => addTodo()}
            title="Add Todo"
            disabled={todo === ""}
          />
        </View>
        {todos.length > 0 && (
          <View>
            <FlatList
              data={todos}
              renderItem={renderTodo}
              keyExtractor={(todo: Todo) => todo.id}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  topContainer: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  form: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 4,
  },
  userEmail: {
    flex: 1,
    paddingHorizontal: 4,
    fontSize: 20,
  },
  todoText: {
    flex: 1,
    paddingHorizontal: 4,
  },
  todo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
