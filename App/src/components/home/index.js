import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Lista from '../lista';
import Frame from '../frame';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Lista')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

function Home() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Lista">
        <Drawer.Screen name="Frame" component={Frame} />
        <Drawer.Screen name="Lista" component={Lista} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
export default Home;