import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContextProvider, { UserContext } from './src/store/context/user-context';

// Ignore
import MessagingScreen          from './src/screens/Ignore/MessagingScreen';
import ChatRoomScreen           from './src/screens/Ignore/ChatRoomScreen';
import AthleteCardioScreen      from './src/screens/Athlete/AthleteCardioScreen';
import AthleteLiftingScreen     from './src/screens/Athlete/AthleteLiftingScreen';
import CoachCardioScreen        from './src/screens/Coach/CoachCardioScreen';
import CoachLiftingScreen       from './src/screens/Coach/CoachLiftingScreen';
import SoloTimerScreen          from './src/screens/Ignore/SoloTimerScreen';


import CoachTeamRosterScreen    from './src/screens/Coach/CoachTeamRosterScreen';
import TrainingLogScreen        from './src/screens/Athlete/TrainingLogScreen';

// Login Stack
import LoginScreen              from './src/screens/LoginScreen';
import SignUpScreen             from './src/screens/SignUpScreen';

// Settings Stack
import ProfileScreen            from './src/screens/ProfileScreen';
import SettingsScreen           from './src/screens/SettingsScreen';
import EquipmentScreen          from './src/screens/EquipmentScreen';

// Calendar Stack
import EditCalendarScreen       from './src/screens/Coach/EditCalendarScreen';
import AddCalendarScreen        from './src/screens/Coach/AddCalendarScreen';
import CalendarScreen           from './src/screens/CalendarScreen';
import StopwatchSetupScreen     from './src/screens/StopwatchSetupScreen';
import XCTimerScreen            from './src/screens/StopwatchScreen';

// Admin Screens
import OrganizationScreen       from './src/screens/Coach/OrganizationScreen';
import CreateOrganizationScreen from './src/screens/Coach/CreateOrganizationScreen';
import CreateTeamScreen         from './src/screens/Coach/CreateTeamScreen';
import AddCoachScreen           from './src/screens/Coach/AddCoachScreen';

import TeamProfileScreen        from './src/screens/TeamProfileScreen';

const TabNav = createBottomTabNavigator();
const StackNav = createStackNavigator();

function LoginStack() {
  return (
    <StackNav.Navigator
      screenOptions={{
        headerTintColor: 'green',
      }}>
      <StackNav.Screen name="Login" component={LoginScreen} />
      <StackNav.Screen name="SignUp" component={SignUpScreen} />
    </StackNav.Navigator>
  );
}

function SettingsStack() {
  return (
    <StackNav.Navigator
      screenOptions={{
        headerTintColor: 'green',
      }}>
      <StackNav.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{title: "Settings" }}
      />
      <StackNav.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{title: "Profile" }}
      />
      <StackNav.Screen 
        name="Equip" 
        component={EquipmentScreen} 
        options={({ navigation }) => ({
          title: 'Equipment',
          // headerRight: () => (
          // <TouchableOpacity 
          //   onPress={() => {navigation.navigate("AddEquip")}}
          //   style={({ pressed }) => pressed && {opacity: 0.7}}
          // >
          //   <View style={{padding: 5, marginHorizontal: 10}}>
          //     <Ionicons name="add-circle-sharp" size={24} color="green" />
          //   </View>
          // </TouchableOpacity>
          // ),
        })}
      />
      {/* <StackNav.Screen 
        name="AddEquip" 
        component={AddEquipmentScreen} 
        options={{title: "Add Equipment" }}
      /> */}
    </StackNav.Navigator>
  );
}

function OrganizationStack() {
  return (
    <StackNav.Navigator
      screenOptions={{
        headerTintColor: 'green',
      }}>
      <StackNav.Screen 
        name="Organization" 
        component={OrganizationScreen} 
        options={{ title: 'Organizations' }}
      />
      <StackNav.Screen 
        name="CreateOrg" 
        component={CreateOrganizationScreen} 
        options={{title: "Create Organization" }}
      />
      <StackNav.Screen 
        name="CreateTeam" 
        component={CreateTeamScreen} 
        options={{title: "Create Team" }}
      />
      <StackNav.Screen 
        name="AddCoach" 
        component={AddCoachScreen} 
        options={{title: "Add Coach" }}
      />
    </StackNav.Navigator>
  );
}

function MessagingStack() {
  return (
    <StackNav.Navigator
      screenOptions={{
        headerTintColor: 'green',
      }}>
      <StackNav.Screen 
        name="Messages" 
        component={MessagingScreen} 
        options={{ title: 'Messages' }}
      />
      <StackNav.Screen 
        name="ChatRoom" 
        component={ChatRoomScreen} 
        options={{ title: "TODO" }}
      />
    </StackNav.Navigator>
  );
}

function CalendarStack() {
  return (
    <StackNav.Navigator
      screenOptions={{
        headerTintColor: 'green',
      }}>
      <StackNav.Screen 
        name="Calendar" 
        component={CalendarScreen}
        options={{ title: 'Agenda' }}
      />
      <StackNav.Screen 
        name="AddEvent" 
        component={AddCalendarScreen} 
        options={{ title: "Add Event" }}
      />
      <StackNav.Screen 
        name="EditEvent" 
        component={EditCalendarScreen} 
        options={{ title: "Edit Event" }}
      />
      <StackNav.Screen 
        name="CoachCardio" 
        component={CoachCardioScreen} 
        options={{ title: "Cardio Training" }}
      />
      <StackNav.Screen 
        name="CoachLifting" 
        component={CoachLiftingScreen} 
        options={{ title: "Weight Training" }}
      />
    </StackNav.Navigator>
  );
}

function RecordStack() {
  return (
    <StackNav.Navigator
      screenOptions={{
        headerTintColor: 'green',
      }}>
      <StackNav.Screen 
        name="RecordCardio" 
        component={StopwatchSetupScreen} 
        options={{ title: 'Record Setup' }}
      />
      <StackNav.Screen 
        name="SoloTimer" 
        component={SoloTimerScreen} 
        options={{ title: "Stopwatch" }}
      />
      <StackNav.Screen 
        name="XCTimer" 
        component={XCTimerScreen} 
        options={{ title: "Stopwatch" }}
      />
    </StackNav.Navigator>
  );
}


function AthleteContainerStack() {
  return (
    <StackNav.Navigator
      screenOptions={{
        headerTintColor: 'green',
      }}>
      <StackNav.Screen 
        name="AthleteTab" 
        component={AthleteTab}
        options={{ headerShown: false }} 
      />
      <StackNav.Screen 
        name="RecordStack" 
        component={RecordStack}
        options={{ headerShown: false }} 
      />
      <StackNav.Screen 
        name="SettingsStack" 
        component={SettingsStack}
        options={{ headerShown: false }} 
      />
    </StackNav.Navigator>
  );
}

function CoachContainerStack() {
  return (
    <StackNav.Navigator
      screenOptions={{
        headerTintColor: 'green',
      }}>
      <StackNav.Screen 
        name="CoachTab" 
        component={CoachTab}
        options={{ headerShown: false }} 
      />
      <StackNav.Screen 
        name="OrganizationStack" 
        component={OrganizationStack}
        options={{ headerShown: false }} 
      />
      {/* <StackNav.Screen 
        name="EventStack" 
        component={EventStack}
        options={{ headerShown: false }} 
      /> */}
    </StackNav.Navigator>
  );
}

function AthleteTab() {
  return (
    <TabNav.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Cardio') {
            iconName = focused ? 'beer' : 'beer-outline';
          } else if (route.name === 'Timer') {
            iconName = focused ? 'stopwatch' : 'stopwatch-outline';
          } else if (route.name === 'Lifting') {
            iconName = focused ? 'barbell' : 'barbell-outline';
          } else if (route.name === 'Roster') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings-sharp' : 'settings-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'green',
        inactiveTintColor: 'black',
      }}
    >
      <TabNav.Screen name="Home" component={CalendarStack} />
      <TabNav.Screen name="Timer" component={RecordStack} />
      <TabNav.Screen name="Lifting" component={MessagingStack} />
      <TabNav.Screen name="Roster" component={TeamProfileScreen} />
      <TabNav.Screen name="Settings" component={SettingsStack} />
    </TabNav.Navigator>
  );
}

function CoachTab() {
  return (
    <TabNav.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Create') {
            iconName = focused ? 'create' : 'create-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbox' : 'chatbox-outline';
          } else if (route.name === 'Roster') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings-sharp' : 'settings-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'green',
        inactiveTintColor: 'black',
        showLabel: false
      }}
    >
      <TabNav.Screen name="Home" component={CalendarStack} />
      <TabNav.Screen name="Create" component={TrainingLogScreen} />
      <TabNav.Screen name="Chat" component={MessagingStack} />
      <TabNav.Screen name="Roster" component={TeamProfileScreen} />
      <TabNav.Screen name="Settings" component={SettingsStack} />
    </TabNav.Navigator>
  );
}

function Navigation () {
    const [isLoading, setIsLoading] = useState(true);
    const userCtx = useContext(UserContext);

    useEffect(() => {
      async function fetchLocalToken() {
        // try {
        //   await SplashScreen.preventAutoHideAsync();
        // } catch (e) {
        //   console.warn(e);
        // }
        const localToken = await AsyncStorage.getItem('authToken');
        const userId = await AsyncStorage.getItem('userID');
        const orgId = await AsyncStorage.getItem('lastOrgId');
        const teamId = await AsyncStorage.getItem('lastTeamId');

        console.log("Last Org: "+orgId);
        if(orgId) {
          const organization = {
            id: orgId,
            name: await AsyncStorage.getItem('lastOrgName')
          };
          userCtx.switchOrganization(organization);
        }
        console.log("Last Team: "+teamId);
        if(teamId) {
          const team = {
            id: teamId,
            name: await AsyncStorage.getItem('lastTeamName')
          };
          userCtx.switchTeam(team);
        }

        if (localToken) {
          const userMode = await AsyncStorage.getItem('lastUserMode');
          const userName = await AsyncStorage.getItem('firstName');
          const authData = { idToken: localToken, localId: userId }
          userCtx.login(authData, userMode, userName);
        }
        // async () => { await SplashScreen.hideAsync(); };
        setIsLoading(false);
      }
      
      fetchLocalToken();
    }, []);

    if (isLoading) {
      return null;
    }

    return (
      <NavigationContainer>
        {userCtx.userId==0 ? (
          <LoginStack />
        ) :
        userCtx.userMode=='Athlete' ?  (
          <AthleteContainerStack />
        ) : (
          <CoachContainerStack />
        )}
      </NavigationContainer>
    );
}

export default function App(){
  return(
    <>
      {/* <StatusBar style="light" /> */}
      <UserContextProvider>
        <Navigation />
      </UserContextProvider>
    </>
  );
};