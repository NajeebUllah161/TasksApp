import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';

const Login = ({ navigation }) => {
  const { loadingLogin, userLogin, successLogin, errorLogin } = useSelector(state => state.auth);
  const [appIsReady, setAppIsReady] = useState(false);

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = () => {
    dispatch(login(email, password));
  };

  useEffect(() => {
    checkToken();
    prepare();
    if (userLogin) {
      Alert.alert("Login", "Successfully Logged In")
      saveToken(userLogin.token);
      console.log("TOKEN : ", userLogin.token);
      navigation.navigate("home");
      dispatch({ type: 'clearUserData' });
    }
    if (errorLogin) {
      Alert.alert("Error", errorLogin);
      dispatch({ type: 'clearError' });
    }


  }, [dispatch, userLogin, successLogin, errorLogin, alert]);

  const prepare = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (e) {
      console.warn(e);
    } finally {
      setAppIsReady(true);
    }
  }

  const saveToken = async (token) => {
    try {
      await AsyncStorage.setItem("token", token);
    } catch (e) {
      console.log(e);
    }
  }

  const checkToken = async () => {
    try {
      var token = await AsyncStorage.getItem("token");
      if (token !== null) {
        navigation.navigate("home");
      }
    } catch (e) {
      console.log(e);
    }
  }

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return loadingLogin ? (
    <Loader />
  ) : (
    <View
      onla={onLayoutRootView}
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{ fontSize: 20, margin: 20 }}>WELCOME</Text>
      <View style={{ width: '70%' }}>
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
      </View>

      <Button
        disabled={!email || !password}
        style={Styles.btn}
        onPress={loginHandler}>
        <Text style={{ color: '#fff' }}>Login</Text>
      </Button>

      <Text
        style={{
          marginTop: 20,
        }}>
        Or
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('register')}>
        <Text
          style={{
            color: '#900',
            height: 30,
            margin: 20,
          }}>
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const Styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#b5b5b5',
    padding: 10,
    paddingLeft: 15,
    borderRadius: 5,
    marginVertical: 15,
    fontSize: 15,
  },

  btn: {
    backgroundColor: '#900',
    padding: 5,
    width: '70%',
  },
});
