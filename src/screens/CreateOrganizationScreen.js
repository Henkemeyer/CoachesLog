import React, { useContext, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View } from 'react-native';
import UserInput from '../components/UserInput';
import ShadowBox from '../components/ShadowBox';
import OurButton from '../components/OurButton';
import { UserContext } from '../store/context/user-context';
import { postOrganization } from '../util/http';

function CreateOrganizationScreen({ navigation }) {
    const userCtx = useContext(UserContext);
    const token = userCtx.token;
    const [orgName, setOrgName] = useState('');
    const [organizationId, setOrgId] = useState('');
    const [level, setLevel] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [nameError, setNameError] = useState('');
    const [isValid, setIsValid] = useState(false);

    const confirmInputAgent = () => {
        setIsValid(true);
        setNameError('');
        if(orgName.length < 2) {
            setNameError('*You must enter an Org Name');
            setIsValid(false);
        }
        if(isValid) {
            createOrgHandler();
        }
    };

    function createOrgHandler() {
        try {
            const orgData = {
                name: orgName,
                level: level,
                location: location,
                description: description
            }
            
            const coachData = {
                admin: 'Y',
                organizationId: '',
                title: title,
                uid: userCtx.userId
            }
            
            postOrganization(orgData, coachData, token)
        } catch (error) {
            Alert.alert('Org Creation Failed!', 'Failed to create organization. Please try again later')
        }
        navigation.goBack();
    }

    return (
        <TouchableWithoutFeedback
            onPress={() =>{
                Keyboard.dismiss();
            }}
        >
            <ScrollView>
                <View style={styles.backgroundView}>
                    <ShadowBox style={styles.containerView}>
                        <Text style={styles.headerText}>Sign up a new Organization</Text>
                        <View style={styles.inputView}>
                            <UserInput
                                label="Name"
                                value={orgName}
                                onChangeText={setOrgName}
                                autoCorrect={false}
                            />
                        </View>
                        { nameError ? <Text style={styles.errorText}>{nameError}</Text> : null }

                        <View style={styles.inputView}>
                            <UserInput
                                label="Org Level"
                                value={level}
                                onChangeText={setLevel}
                                autoCorrect={false}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <UserInput
                                label="Location"
                                value={location}
                                onChangeText={setLocation}
                                autoCorrect={false}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <UserInput
                                label="Your Title"
                                value={title}
                                onChangeText={setTitle}
                            />
                        </View>

                        <View style={styles.inputView}>
                            <UserInput
                                label="Description"
                                value={description}
                                onChangeText={setDescription}
                                multiline
                                numberOfLines={6}
                            />
                        </View>

                        <OurButton
                            buttonPressed={confirmInputAgent}
                            buttonText="Create Org"
                            style={styles.confirmButton}
                        />
                    </ShadowBox>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    backgroundView: {
        flex: 1,
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: '#ededed'
    },
    containerView: {
        flexWrap: 'nowrap',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginVertical: 65,
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
    confirmButton: {
        marginBottom: 15,
        width: '75%'
    },
    clickText: {
        fontSize: 15,
        color: 'orange',
        marginBottom: 30
    },
    errorText: {
        color: 'red',
        fontSize: 15,
        marginBottom: 15
    }
});

export default CreateOrganizationScreen;