import React from "react";
import { View, Text, Button, TextInput } from "react-native";

function loginComponent(props: any) {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
			<TextInput 
				placeholder="Enter your username"
				value={username}
				onChangeText={setUsername}
				style={{ width: '80%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10,
					backgroundColor: '#fff', paddingHorizontal: 10, borderRadius: 5
				 }}
			/>
			<TextInput
				placeholder="Enter your password"
				secureTextEntry
				value={password}
				onChangeText={setPassword}
				style={{ width: '80%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10,
					backgroundColor: '#fff', paddingHorizontal: 10, borderRadius: 5
				 }}
			/>
			<Button
				title="Go to Home page"
				onPress={
					() => props.navigation.navigate('Todo List', {
						username: username,
						password: password
					})
				}
			/>
		</View>
	)
}

export default loginComponent;