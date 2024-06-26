import React, { useContext, useEffect, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, 
    TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { fetchAthleteGroup, fetchCoachTeams, fetchRoster, postEvent } from '../../util/http';
import { UserContext } from '../../store/context/user-context';
import UserInput from '../../components/UserInput';
import OurButton from '../../components/OurButton';
import Colors from '../../constants/ColorThemes';
import { Ionicons } from '@expo/vector-icons';

const CoachCardioScreen = ( ) => {
    const userCtx = useContext(UserContext);      // App User Info
    const token = userCtx.token;                  // User Auth Token
    const [teams, setTeams] = useState([]);       // List of Coach's Teams
    const [date, setDate] = useState(new Date()); // Date of workout
    const [mode, setMode] = useState('date');     // Date picker mode
    const [show, setShow] = useState(false);      // Show or Hide Date Picker

    const [startTime, setStartTime] = useState(''); // Time of workout
    const [endTime, setEndTime] = useState('');    // End time of workout
    const [distance, setDist] = useState(0);        // Distance travelled during workout
    const [location, setLoc] = useState('');
    const [notes, setNotes] = useState('');     // Workout notes
    const [athletes, setAthletes] = useState([]);  // List of users groups
    const [testID, setTestID] = useState('');
    const [group, setGroup] = useState('');         // Group used for workout
  
    const onDateChange = (event, selectedDate) => {
        if(event.type != 'dismissed')
        {
            const currentDate = selectedDate;
            setDate(currentDate);
        }
        setShow(false);
    };

    const onTimeChange = (event, selectedTime) => {
        if(event.type != 'dismissed')
        {
            const currentTime = selectedTime;
            setTime(currentTime);
        }
        setShow(false);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };

    useEffect(() => {
        async function getDBTeams() {
            const results = await fetchCoachTeams(userCtx.userId, token);
            setTeams(results);
        }
    
        getDBTeams();
    }, [token]);

    useEffect(() => {
        async function getAthletes() {
            const dbAthletes = await fetchRoster(userCtx.teamId, token);
            const holdAthletesObj = [];

            for (const key in dbAthletes.data) {
                const athObj = {
                    id: dbAthletes.data[key].uid,
                    name: dbAthletes.data[key].fullName,
                    group: dbAthletes.data[key].groupName
                };
                holdAthletesObj.push(athObj);
            }
            setAthletes(holdAthletesObj);
        }
    
        getAthletes();
    }, [userCtx.teamId]);

    function submitHandler() {
        try {
            const eventData = 
                {
                    uid: testID,
                    teamId: userCtx.teamId,
                    teamName: userCtx.teamName,
                    notes: notes,
                    date: date,
                    type: 'Practice',
                    location: location,
                    startTime: startTime,
                    endTime: endTime
                    // duration: time
                }
            postEvent(eventData, token);
        } catch (error) {
            console.log(error);
            Alert.alert('Addition Failed', 'Failed to add event. Please try again later.')
        }
    }

    function clearScreen() {
        setNotes('');
        setDist('');
        setStartTime('');
        setEndTime('');
        setLoc('');
    }

    return (
        <TouchableWithoutFeedback onPress={() =>{ Keyboard.dismiss(); }} >
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.headerText}>Cardio Workouts</Text>
            <SelectDropdown
                data={teams}
                onSelect={(selectedItem, index) => {
                    const teamData = {
                        name: selectedItem.name,
                        id: selectedItem.id
                    };
                    userCtx.switchTeam(teamData);
                    // selectTeamHandler(selectedItem.id);
                }}
                defaultButtonText={userCtx.teamName}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.name
                }}
                rowTextForSelection={(item, index) => {
                    return item.name
                }}
                buttonStyle={styles.selectDropDownButton}
                buttonTextStyle={styles.selectDropDownText}
                renderDropdownIcon={isOpened => {
                    return <Ionicons name={isOpened ? 'chevron-up-circle-sharp' : 'chevron-down-circle-outline'} color={'#FFF'} size={18} />;
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.selectDropDown}
                rowStyle={styles.selectDropDownRow}
                rowTextStyle={styles.selectDropDownText}
            />
            <TouchableOpacity onPress={showDatepicker}>
                <View style={styles.lengthRow}>
                    <Text style={styles.formText}>Date: {format(date, "MMMM do, yyyy")}</Text>
                    <Ionicons name="calendar-outline" size={24} color="darkgreen" style={styles.iconStyle} />
                </View>
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    testID="datePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onDateChange}
                />
            )}
            <UserInput
                label="Start Time:"
                value={startTime}
                onChangeText={setStartTime}
                autoCorrect={false}
            />
            <UserInput
                label="End Time:"
                value={endTime}
                onChangeText={setEndTime}
                autoCorrect={false}
            />
            <UserInput
                label="Location:"
                value={location}
                onChangeText={setLoc}
                autoCorrect={false}
            />
            <UserInput
                label="Notes:"
                value={notes}
                onChangeText={setNotes}
                multiline   // ios starts top left
                textAlignVertical='top'  // Android starts top left
                numberOfLines={6}
                style={styles.notesInput}
            />
            <SelectDropdown
                data={athletes}
                onSelect={(selectedItem, index) => {
                    setTestID(selectedItem.id);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.name
                }}
                rowTextForSelection={(item, index) => {
                    return item.name
                }}
                buttonStyle={styles.selectDropDownButton}
                buttonTextStyle={styles.selectDropDownText}
                renderDropdownIcon={isOpened => {
                    return <Ionicons name={isOpened ? 'chevron-up-circle-sharp' : 'chevron-down-circle-outline'} color={'#FFF'} size={18} />;
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.selectDropDown}
                rowStyle={styles.selectDropDownRow}
                rowTextStyle={styles.selectDropDownText}
            />
        </View>
        <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => clearScreen()}>
                <Ionicons name="trash-outline" size={28} color="red" style={styles.iconStyle} />
            </TouchableOpacity>
            <OurButton 
                buttonPressed={() => submitHandler()}
                buttonText="Submit"
            />
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 30,
        alignItems: 'center'
    },
    headerText: {
        paddingVertical: 25,
        fontSize: 30,
        color: 'darkgreen',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingRight: 15
    },
    selectDropDownButton: {
        width: '80%',
        height: 40,
        backgroundColor: 'darkgreen',
        borderRadius: 8
    },
    selectDropDown: {
        backgroundColor: 'darkgreen',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12
    },
    selectDropDownRow: {
        backgroundColor: 'darkgreen', 
        borderBottomColor: '#C5C5C5'
    },
    selectDropDownText: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    lengthRow: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },
    formText: {
        fontSize: 22,
        textAlign: 'center',
        color: 'darkgreen'
    },
    notesInput: {
        height: 150,
        borderRadius: 8
    },
    iconStyle: {
        paddingHorizontal: 15
    },
    buttonRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 40,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export default CoachCardioScreen;