import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AddNoteScreen from './src/screens/AddNoteScreen';
import ViewNoteScreen from './src/screens/ViewNoteScreen';
import SplashScreen from 'react-native-splash-screen';

export type RootStackParamList = {
  Home: undefined;
  AddNote: undefined;
  ViewNote: { noteId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  // ✅ useEffect must be inside the functional component body
  useEffect(() => {
    console.log('SplashScreen:', SplashScreen); // should NOT be null
    SplashScreen.hide(); // Hide splash after loading
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddNote" component={AddNoteScreen} />
        <Stack.Screen name="ViewNote" component={ViewNoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
