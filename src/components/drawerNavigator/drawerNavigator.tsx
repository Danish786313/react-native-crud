import { createDrawerNavigator } from '@react-navigation/drawer';
import MyTabs from '../tabNavigator/tabNavigator';
import Profile from '../profile/profile';
import Calculator from '../calculatorComp/calculator';
import Setting from '../setting/setting';
import constants from '../../utils/constants/contant';

const Drawer = createDrawerNavigator();
function DrawerNavigator() {
	return (
		<Drawer.Navigator screenOptions={{
			headerStyle: {
				backgroundColor: constants.buttonColor,
			},
		}}>

			<Drawer.Screen name="Home" component={MyTabs} />

			<Drawer.Screen name="Profile" component={Profile} />
			<Drawer.Screen name="Calculator" component={Calculator} />
			<Drawer.Screen name="Settings" component={Setting} />
		</Drawer.Navigator>
	);
}

export default DrawerNavigator;