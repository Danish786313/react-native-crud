import React from "react";
import { View, Text, Button, TextInput, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

const { width, height } = Dimensions.get('window');

function loginComponent(props: any) {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');

	return (
		<View style={styles.container}>
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
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#D6D7ED',
		
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
		backgroundColor: '#9395CE',
		borderRadius: 10,
		padding: 10,
		marginTop: 10,
		width: width * 0.8,
		height: height * 0.06,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loginText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
});

export default loginComponent;