import React from "react";
import { View, Text, Button, TextInput, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from "react-native";
const localImage = require('../../../assets/images/background.png'); 
import constants from '../../utils/constants/contant';
const { width, height } = Dimensions.get('window');

function LoginComponent(props: any) {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');

	return (
		<View style={styles.container}>
			{/* <ImageBackground
				source={localImage}
				resizeMode="cover"
				style={styles.backgroundImage}
			> */}
				<Text style={styles.text}>Welcome to the App {}</Text>

				<View style={styles.card}>
					<TextInput
						placeholder="Enter your username"
						value={username}
						onChangeText={setUsername}
						style={styles.input}
					/>
					<TextInput
						placeholder="Enter your password"
						secureTextEntry
						value={password}
						onChangeText={setPassword}
						style={styles.input}
					/>
					<TouchableOpacity
						style={styles.loginButton}
						onPress={() =>
							props.navigation.navigate('Todo List', {
								username,
								password,
							})
						}
					>
						<Text style={styles.loginText}>Login</Text>
					</TouchableOpacity>
				</View>
			{/* </ImageBackground> */}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
		
	},
	card: {
		height: height * 0.3,
		width: width * 0.8,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20,
	},
	input: {
		width: width * 0.8,
		height: height * 0.06,
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 10,
		backgroundColor: '#fff',
		paddingHorizontal: 10,
		borderRadius: 10,
	},
	button: {
		marginTop: 10,
	},
	loginButton: {
		backgroundColor: '#7B3BF0',
		borderRadius: 10,
		padding: 10,
		marginTop: 10,
		width: width * 0.8,
		height: height * 0.06,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loginText: {
		color: '#FD8BFA',
		fontSize: 16,
		fontWeight: 'bold',
	},
	backgroundImage: {
		width: width,
		height: height,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
		color: constants.textColor,
	},
});

export default LoginComponent;