import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/AntDesign"
import CheckBox from '@react-native-community/checkbox';
import { useDispatch } from 'react-redux'
import { deleteTask, loadUser, updateTask } from '../redux/action'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Task = ({ title, description, status, taskId, getAllTasks, editTaskHandler }) => {

    const dispatch = useDispatch()
    const [completed, setCompleted] = useState(status);

    const handleEditTask = async () => {
        editTaskHandler(title, description, taskId);
        setCompleted(!completed);

    }

    const deleteHandler = async () => {
        let token = await getToken();
        token = "Bearer " + token;
        dispatch(deleteTask(taskId, token));
        getAllTasks();
    }

    const getToken = async () => {
        try {
            var token = await AsyncStorage.getItem("token");
            if (token !== null) {
                return token;
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View
            style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
            }}
        >
            <View style={{ width: "70%" }}>
                <Text style={{ fontSize: 20, marginVertical: 7, color: "#900" }}>
                    {title}
                </Text>
                <Text style={{ color: "#4a4a4a" }}>{description}</Text>
            </View>

            <TouchableOpacity onPress={handleEditTask}>
                <Image
                    style={{ width: 20, height: 20 }}
                    source={require("../assets/edit.png")}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={deleteHandler}>
                <Image
                    style={{ width: 20, height: 20 }}
                    source={require("../assets/del.png")}
                />
            </TouchableOpacity>
        </View>
    )
}

export default Task