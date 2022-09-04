import React, { useContext, useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { UserContext } from '../store/context/user-context';
import { fetchUserEvents } from '../util/http';
import { subDays } from 'date-fns';

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
}

const AthleteCalendarScreen = () => {
    const userCtx = useContext(UserContext);
    const token = userCtx.token;
    const [items, setItems] = useState({});   // populates everyday
    const [events, setEvents] = useState({}); // card data
    const [marked, setMarked] = useState({}); // makes calendar dates
    const [minDate, setMinDate] = useState(new Date(new Date().valueOf() - 86400000));

    const workout = {key: 'workout', color: 'green'}; // Cardio, lifting, scrimmage?
    const competition = {key: 'competition', color: 'red'};  // Meet, game
    const activity = {key: 'activity', color: 'blue'};   // Pictures, miscellaneous

    useEffect(() => {
        async function getEvents() {
            const dbEvents = await fetchUserEvents(userCtx.userId, token);
            const eventsObj = {};
            const markedObj = {};

            for (const key in dbEvents.data) {
                const time = '';
                const eventType = dbEvents.data[key].type;

                if(dbEvents.data[key].startTime) {
                    time = dbEvents.data[key].startTime;
                    if(dbEvents.data[key].endTime) {
                        time = time +" - "+ dbEvents.data[key].endTime;
                    }
                }
                else {
                    time = 'On Own';
                }
                const eventDate = dbEvents.data[key].date;
                const eventArr = {
                    id: key,
                    day: dbEvents.data[key].date,
                    teamName: dbEvents.data[key].teamName,
                    location: dbEvents.data[key].location,
                    time: "Time: "+time,
                    teamName: dbEvents.data[key].teamName,
                    location: dbEvents.data[key].location,
                    type: dbEvents.data[key].type,
                    notes: dbEvents.data[key].notes
                };

                const setDot = {};
                if(eventType==='Cardio' || eventType==='Lifting' || eventType==='Scrimmage' || eventType==='Practice') {
                    setDot = workout; 
                }
                else if(eventType==='Meet' || eventType==='Game' || eventType==='Match') {
                    setDot = competition;
                }
                else{
                    setDot = activity;
                }

                // if(eventsObj[eventDate]){
                //     eventsObj[eventDate] = [...eventsObj[eventDate], eventArr];
                //     markedObj[eventDate]['dots'] = [...markedObj[eventDate]['dots'], setDot];
                // }
                // else {
                //     eventsObj[eventDate] = eventArr;
                //     markedObj[eventDate] = {dots: [setDot]};
                // }
            }
            // setItems(eventsObj);
            setMarked(markedObj);
        }
    
        getEvents();
    }, [userCtx.userId]);

    const loadItems = (day) => {

        setTimeout(() => {
            for (let i = -15; i < 50; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);

                if (!items[strTime]) {
                    items[strTime] = [];

                    items[strTime].push({
                        teamName: 'Testing',
                        height: 30,
                        day: strTime
                    });
                }
                // else {
                //     items[strTime] = events[strTime];
                // }
            }
            const newItems = {};
            Object.keys(items).forEach(key => {
                newItems[key] = items[key];
            });

            setItems(newItems);
        }, 1000);
    }

    const renderItem = (item) => {
        console.log(item);
        return (
            <TouchableOpacity style={styles.item}>
                <View>
                    <Text>{item.teamName}</Text>
                    <Text>{item.location}</Text>
                    <Text>{item.time}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                markingType={'multi-dot'}
                markedDates={marked}
                selected={subDays(new Date(), 5)}
                todayTextColor= 'darkgreen'
                refreshControl={null}
                hideKnob={false}
                showClosingKnob={true}
                refreshing={false}
                renderItem={renderItem}
                // renderEmptyDate={() => { return <View />; }}
                theme={{
                    agendaDayTextColor: 'darkgreen',
                    agendaDayNumColor: 'green',
                    agendaTodayColor: 'green',
                    agendaKnobColor: 'darkgreen',
                    dotColor: '#ffffff',
                    indicatorColor: '#ffffff',
                    todayTextColor: 'orange',
                    dayTextColor: 'green',
                }}
            />
            <StatusBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flex: 1,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'darkgreen',
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
});

export default AthleteCalendarScreen;