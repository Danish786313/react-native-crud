import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from '../drawerNavigator/drawerNavigator';

const Stack = createNativeStackNavigator();

export const AboutStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: '#e10e38',
				},
				
				headerTitleStyle: {
					fontWeight: 'bold',
				},
			}}>


			<Stack.Screen name="Todo List" component={DrawerNavigator}
				options={{
					title: "Todo List"
				}}
			/>

		</Stack.Navigator>
	);
}

export default AboutStack;