import { Stack } from 'expo-router';
import { Provider } from "react-redux";
import { store } from '../components/redux/store';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <StatusBar barStyle={"dark-content"} />
      <Stack>
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
