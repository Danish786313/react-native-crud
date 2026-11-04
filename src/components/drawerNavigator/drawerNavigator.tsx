import { createDrawerNavigator } from '@react-navigation/drawer';
import AppContent from '../dashboard/AppComponents';
import loginComponent from '../login/login';
import MyTabs from '../tabNavigator/tabNavigator';
import Profile from '../profile/profile';

const Drawer = createDrawerNavigator();
function DrawerNavigator() {
	return (
		<Drawer.Navigator>
			{/* <Drawer.Screen name="Home" component={AppContent} /> */}
			<Drawer.Screen name="Home" component={MyTabs} />
			{/* <Drawer.Screen name="Login" component={loginComponent} /> */}
			<Drawer.Screen name="Profile" component={Profile} />
		</Drawer.Navigator>
	);
}

export default DrawerNavigator;// export default AppContent;