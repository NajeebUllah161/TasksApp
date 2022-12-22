import { View, Text, SafeAreaView, Platform, StatusBar, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Task from "../components/Task.js"
import Icon from "react-native-vector-icons/FontAwesome"
import { Dialog, Button } from "react-native-paper"
import { useDispatch, useSelector } from 'react-redux'
import { addTask, getTasks, logout, updateTask } from '../redux/action'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../components/Loader.js'

const Home = ({ navigation }) => {

    const dispatch = useDispatch();
    const { loadingLogout, successLogout, errorLogout, messageLogout } = useSelector(state => state.auth);
    const { loadingGetTasks, dataGetTasks, successGetTasks, messageGetTasks, errorGetTasks, loadingAddTask, successAddTask, dataAddTask, errorAddTask, loadingDelTask, successDelTask, errorDelTask, loadingUpdateTask, successUpdateTask, errorUpdateTask } = useSelector(state => state.tasks);
    const [openDialog, setOpenDialog] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [runOnce, setRunOnce] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [mode, setMode] = useState("addtask");
    const [buttonTxt, setButtonTxt] = useState("ADD");
    const [taskId, setTaskId] = useState(null);

    const hideDialog = () => {
        setOpenDialog(!openDialog)
    }

    const editTaskHandler = (title, description,taskId) => {
        setMode("edittask");
        setButtonTxt("UPDATE");
        setTaskId(taskId);
        setTitle(title);
        setDescription(description)
        setOpenDialog(!openDialog)
    }

    const addOrEditTaskHandler = async () => {
        let token = await getToken();
        token = "Bearer " + token;
        if (mode === "addtask") {
            dispatch(addTask(title, description, token));
        } else {
            dispatch(updateTask(title, description, token, taskId));
        }
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

    const logoutHandler = async () => {
        let token = await AsyncStorage.getItem("token");
        dispatch(logout(token));
    }
    const removeToken = async () => {
        await AsyncStorage.removeItem("token");
        console.log("Token removed");
        navigation.navigate("login")
    }

    const addTaskSetupHandler = () => {
        setMode("addtask");
        setButtonTxt("ADD");
        setOpenDialog(!openDialog)
    }

    const getAllTasks = async () => {
        let token = await getToken();
        token = "Bearer " + token;
        if (token)
            dispatch(getTasks(token));
    }

    useEffect(() => {

        if (!runOnce) {
            setRunOnce(true);
            getAllTasks();
        }

        if (dataGetTasks) {
            console.log(dataGetTasks.data);
            setTasks(dataGetTasks.data);
            dispatch({ type: 'clearGetTasksData' });
        }

        if (errorGetTasks) {
            console.log(messageGetTasks);
            Alert.alert(messageGetTasks);
            dispatch({ type: 'clearGetTasksMessage' });
            dispatch({ type: 'clearGetTasksError' });
        }

        if (dataAddTask) {
            hideDialog();
            Alert.alert("Task Added!");
            dispatch({ type: 'clearAddTaskData' });
            getAllTasks();
        }

        if (errorAddTask) {
            console.log(errorAddTask);
            dispatch({ type: 'clearAddTaskError' });
        }
        if (successDelTask) {
            Alert.alert("Task Deleted!");
            dispatch({ type: 'clearDelTaskSuccess' });
        }

        if (errorDelTask) {
            Alert.alert("Error deleting task!");
            dispatch({ type: 'clearDelTaskError' });
        }
        if (successUpdateTask) {
            hideDialog();
            Alert.alert("Task updated!");
            dispatch({ type: 'clearUpdateTaskSuccess' });
            getAllTasks();
        }

        if (errorUpdateTask) {
            Alert.alert("Error updating task!");
            dispatch({ type: 'clearUpdateTaskError' });
        }

        if (successLogout) {
            dispatch({ type: 'clearSuccessLogout' });
            removeToken();
        }

        if (errorLogout) {
            Alert.alert(errorLogout);
            dispatch({ type: 'clearLogoutMessage' });
        }

    }, [dispatch, successLogout, errorLogout, messageLogout, dataGetTasks, successGetTasks, messageGetTasks, errorGetTasks, successAddTask, dataAddTask, errorAddTask, successDelTask, errorDelTask, successUpdateTask, errorUpdateTask])

    return loadingLogout || loadingGetTasks || loadingAddTask || loadingDelTask || loadingUpdateTask ? (
        <Loader />
    ) : (

        <>
            <View style={{ backgroundColor: "#fff", flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>

                <TouchableOpacity style={styles.logoutBtn} onPress={logoutHandler}>

                    <Icon size={16} color="#900" >Logout</Icon>

                </TouchableOpacity>

                <ScrollView>
                    <SafeAreaView>
                        <Text style={styles.heading}>All Tasks</Text>

                        {tasks && tasks.map((item) => (
                            <Task key={item.id} title={item.title} description={item.description} status={item.completed} taskId={item.id} getAllTasks={getAllTasks} editTaskHandler={editTaskHandler} />
                        ))}


                        <TouchableOpacity style={styles.addBtn} onPress={addTaskSetupHandler}>

                            <Icon size={16} color="#900" >Add Task</Icon>

                        </TouchableOpacity>


                    </SafeAreaView>

                </ScrollView>
            </View>
            <Dialog visible={openDialog} onDismiss={hideDialog} >
                <Dialog.Title>ADD A TASK</Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                    />

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity onPress={hideDialog} >
                            <Text>CANCEL</Text>
                        </TouchableOpacity>
                        <Button
                            onPress={addOrEditTaskHandler}
                            color="#900"
                            disabled={!title || !description || loadingAddTask || loadingUpdateTask}
                        >
                            {buttonTxt}
                        </Button>
                    </View>
                </Dialog.Content>
            </Dialog>

        </>
    )
}

export default Home

const styles = StyleSheet.create({
    heading: {
        fontSize: 28,
        textAlign: "center",
        marginBottom: 20,
        color: "#fff",
        backgroundColor: "#474747",
    },
    addBtn: {
        backgroundColor: "#fff",
        width: 150,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        alignSelf: "center",
        marginVertical: 20,
        elevation: 5,
    },
    logoutBtn: {
        backgroundColor: "#fff",
        width: 100,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        alignSelf: "flex-end",
        marginBottom: 20,
        marginEnd: 16,
        elevation: 5,
    },
    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#b5b5b5",
        padding: 10,
        paddingLeft: 15,
        borderRadius: 5,
        marginVertical: 15,
        fontSize: 15,
    }
})