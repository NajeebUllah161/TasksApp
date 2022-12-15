import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/action";
import Loader from "../components/Loader";

const Register = ({ navigation, route }) => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const { loadingRegister, messageRegister, errorRegister, successRegister } = useSelector(state => state.auth)

    const registerHandler = () => {
        dispatch(register(email, password, password2));
    };

    useEffect(() => {

        if (successRegister) {
            Alert.alert(messageRegister)
            dispatch({ type: 'clearRegisterMessage' });
            navigation.navigate("login")
        }
        if (errorRegister) {
            Alert.alert(errorRegister);
            dispatch({ type: 'clearRegisterError' });
        }
    }, [messageRegister, errorRegister, successRegister]);


    return loadingRegister ? (
        <Loader />
    ) : (
        <View
            style={{
                flex: 1,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text style={{ fontSize: 20, margin: 20 }}>Register</Text>
            <View style={{ width: "70%" }}>
                <TextInput
                    style={Styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    secureTextEntry
                    style={Styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    secureTextEntry
                    style={Styles.input}
                    placeholder="Confirm Password"
                    value={password2}
                    onChangeText={setPassword2}
                />
            </View>

            <Button
                disabled={!email || !password || !password2}
                style={Styles.btn}
                onPress={registerHandler}
            >
                <Text style={{ color: "#fff" }}>Register</Text>
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
                <Text
                    style={{
                        color: "#900",
                        height: 30,
                        margin: 20,
                    }}
                >
                    Have an Account, Login
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Register;

const Styles = StyleSheet.create({
    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#b5b5b5",
        padding: 10,
        paddingLeft: 15,
        borderRadius: 5,
        marginVertical: 15,
        fontSize: 15,
    },

    btn: {
        backgroundColor: "#900",
        padding: 5,
        width: "70%",
    },
});
