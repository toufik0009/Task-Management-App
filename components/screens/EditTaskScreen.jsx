import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../redux/taskSlice";
import { TextInput, Button, RadioButton } from "react-native-paper";
import { useLocalSearchParams, router } from "expo-router";

export default function EditTaskScreen() {
    const { id } = useLocalSearchParams(); 
    const dispatch = useDispatch();

    const task = useSelector((state) => state.tasks.tasks.find((t) => t.id === id));

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setPriority(task.priority);
        }
    }, [task]);

    const handleUpdateTask = () => {
        if (title.trim()) {
            dispatch(editTask({ id, title, description, priority }));
            router.back();
        }
    };

    if (!task) {
        return (
            <View style={styles.notFoundContainer}>
                <Text style={styles.notFoundText}>Task not found</Text>
                <Button onPress={() => router.back()}>Go Back</Button>
            </View>
        );
    }

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
                                style={styles.radioOption}
                            >
                                <RadioButton value={level} />
                                <Text>{level}</Text>
                            </TouchableOpacity>
                        ))}
                    </RadioButton.Group>
                </View>

                <Button onPress={handleUpdateTask} mode="contained" style={styles.saveButton} buttonColor="#0c1e4f">
                    Save Changes
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
        // paddingVertical:4
    },
    notFoundContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    notFoundText: {
        fontSize: 18,
        marginBottom: 10,
    },
});
