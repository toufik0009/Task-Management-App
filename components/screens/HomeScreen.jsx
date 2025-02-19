import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { toggleTaskCompletion, deleteTask } from "../redux/taskSlice";
import { Button, Checkbox, Card, IconButton } from "react-native-paper";
import { router } from "expo-router";
import { MaterialIcons, AntDesign, Feather } from "@expo/vector-icons";

export default function HomeScreen() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();


  const getCardColor = (priority) => {
    switch (priority) {
      case "Low":
        return "#D1ECF1";
      case "Medium":
        return "#FFF3CD";
      case "High":
        return "#F8D7DA";
      default:
        return "#FFFFFF";
    }
  };


  return (
    <View style={styles.container}>
      {/* Add Task Button */}
      <Button
        onPress={() => router.push("/(main)/addTask")}
        mode="contained"
        style={styles.addButton}
        buttonColor="#0c1e4f"
        contentStyle={styles.addButtonContent}>
        <AntDesign name="pluscircleo" size={18} color="white" style={styles.iconSpacing} />
        <Text style={styles.addButtonText}>Add Task</Text>
      </Button>

      {tasks.length === 0 ? (
        <Text style={styles.noTaskText}>No tasks available. Add a new task!</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={[styles.card, { backgroundColor: getCardColor(item.priority) }]}>
              <Card.Title
                title={item.title}
                subtitle={`Priority: ${item.priority}`}
                titleStyle={styles.cardTitle}
                subtitleStyle={styles.cardSubtitle}
                left={() => (
                  <Checkbox.Android
                    status={item.completed ? "checked" : "unchecked"}
                    onPress={() => dispatch(toggleTaskCompletion(item.id))}
                    color={item.completed ? "green" : "gray"}
                  />
                )}
              />
              <Card.Content>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </Card.Content>
              <Card.Actions style={styles.cardActions}>
                <IconButton
                  icon={() => <Feather name="edit" size={20} color={item.completed ? "#ccc" : "#007AFF"} />}
                  onPress={() => router.push({ pathname: "/(main)/editTask", params: { id: item.id } })}
                  disabled={item.completed}
                />
                <IconButton
                  icon={() => <MaterialIcons name="delete" size={22} color={item.completed ? "#ccc" : "red"} />}
                  onPress={() => dispatch(deleteTask(item.id))}
                  disabled={item.completed}
                />

              </Card.Actions>
            </Card>
          )}
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  addButton: {
    marginBottom: 15,
    borderRadius: 8,
  },
  addButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  iconSpacing: {
    marginRight: 8,
  },
  addButtonText: {
    fontSize: 16,
    color: "white",
    marginRight: 8,
  },
  noTaskText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    color: "#777",
  },
  card: {
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cardSubtitle: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#555",
  },
  cardDescription: {
    fontSize: 15,
    color: "#333",
    marginBottom: 10,
  },
  cardActions: {
    justifyContent: "space-between",
  },
});
