import { router, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff", 
          elevation: 5, 
          shadowOpacity: 0.3, 
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontSize: 22,
          fontWeight: "bold",
          textAlign: "center",
          flex: 1,
        },
        headerTitleAlign: "center", 
        headerBackTitleVisible: false, 
        headerLeft: ({ canGoBack }) =>
          canGoBack ? (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 15 }}>
              <MaterialIcons name="arrow-back-ios" size={24} color="#000" />
            </TouchableOpacity>
          ) : null,
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Task List",
        }}
      />
      <Stack.Screen
        name="addTask"
        options={{
          title: "Add Task",
        }}
      />
      <Stack.Screen
        name="editTask"
        options={{
          title: "Edit Task",
        }}
      />
    </Stack>
  );
}
