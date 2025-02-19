import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";
import { TextInput, Button, RadioButton } from "react-native-paper";
import uuid from "react-native-uuid";
import { router } from "expo-router";

export default function AddTaskScreen() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");
    const dispatch = useDispatch();

    const handleAddTask = () => {
        if (title.trim()) {
            dispatch(addTask({ id: uuid.v4(), title, description, priority, completed: false }));
            router.back();
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <TextInput 
                    label="Title" 
                    value={title} 
                    onChangeText={setTitle} 
                    mode="outlined"
                    style={styles.input}
                />
                <TextInput 
                    label="Description" 
                    value={description} 
                    onChangeText={setDescription} 
                    multiline 
                    mode="outlined"
                    style={[styles.input, styles.descriptionInput]}
                />

                {/* Priority Selection */}
                <View style={styles.priorityContainer}>
                    <Text style={styles.priorityTitle}>Priority</Text>
                    <RadioButton.Group onValueChange={setPriority} value={priority}>
                        {["Low", "Medium", "High"].map((level) => (
                            <TouchableOpacity 
                                key={level} 
                                onPress={() => setPriority(level)} 
                                style={styles.radioOption}>
                                <RadioButton value={level} />
                                <Text>{level}</Text>
                            </TouchableOpacity>
                        ))}
                    </RadioButton.Group>
                </View>

                <Button onPress={handleAddTask} mode="contained" style={styles.saveButton} buttonColor="#0c1e4f">
                    Add Task
                </Button>
            </View>
        </ScrollView>
    );
}

// Styles
const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
    },
    container: {
        flex: 1,
        justifyContent: "center",
    },
    input: {
        marginBottom: 15,
    },
    descriptionInput: {
        minHeight: 80, 
        textAlignVertical: "top",
    },
    priorityContainer: {
        marginVertical: 10,
    },
    priorityTitle: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: "bold",
    },
    radioOption: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
    },
    saveButton: {
        marginTop: 20,
        borderRadius: 8,
    },
});
