import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import mongoApi from '../api/mongo';
import { UserContext } from '../store/context/user-context';

import UserInput from '../components/UserInput';
import CheckBox from '../components/CheckBox';
import ShadowBox from '../components/ShadowBox';
import OurButton from '../components/OurButton';
import Colors from '../constants/ColorThemes';

function LoginScreen({ navigation }) {
    const userCtx = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);

    function loginHandler() {
        userCtx.login();
    }

    return (
        // This closes mobile keyboard when touching off components
        <TouchableWithoutFeedback 
            onPress={() =>{
                Keyboard.dismiss();
            }}
        >
            <View style={styles.backgroundView}>
                <View style={styles.containerView}>  
                {   // Shadow box is not working on Web but is on IOS and Android 
                /* <ShadowBox style={styles.containerView}> */}
                    <Text style={styles.headerText}>Login to BB Sports</Text>
                    <View style={styles.inputView}>
                        <UserInput
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            autoCorrect={false}
                            blurOnSubmit={true}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <UserInput
                            secureTextEntry
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            autoCapitalize="none"
                            autoCorrect={false}
                            blurOnSubmit={true}
                        />
                    </View>
                    <View style={styles.rowView}>
                        <CheckBox
                            toggle={() => setChecked(!checked)}
                            checked={checked}
                        />
                        <Text style={{paddingRight: 28}}>Remember Me</Text>
                        <TouchableOpacity>
                            <Text style={styles.clickText}>Reset Password</Text>
                        </TouchableOpacity>
                    </View>
                    <OurButton 
                        buttonPressed={() => loginHandler()}
                        buttonText="Login"
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')} >
                        <Text style={styles.clickText2}>Create Account?</Text>
                    </TouchableOpacity>
                {/* </ShadowBox> */}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
// AsyncStorage.removeItem('token')

const styles = StyleSheet.create({
    backgroundView: {
        flex: 1,
        borderWidth: 1,
        alignItems: 'center',
        backgroundColor: Colors.tertiary
    },
    containerView: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.33,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 15,
        marginVertical: 150,
        width: '80%'
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        margin: 15
    },
    inputView: {
        width: 250,
        marginBottom: 20
    },
    inputText: {
        fontSize: 15,
        color: 'gray',
        marginBottom: 2
    },
    inputComp: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: 'black',
        fontSize: 20
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 47,
        paddingBottom: 25
    },
    clickText: {
        fontSize: 15,
        color: 'orange'
    },
    clickText2: {
        fontSize: 15,
        color: 'orange',
        paddingVertical: 25
    }
});

export default LoginScreen;