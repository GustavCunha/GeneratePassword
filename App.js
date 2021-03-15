import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Slider from '@react-native-community/slider';
import Clipboard from 'expo-clipboard';

let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%&'

export default function App() {

    const [password, setPassword] = useState('');
    const [size, setSize] = useState(5);

	function generatePass(){
        let pass = '';
        for(let i = 0, n = charset.length; i < size; i++){
            pass+= charset.charAt(Math.floor(Math.random() * n));
        }
		setPassword(pass);
	}

	function copyPass(){
		Clipboard.setString(password);
		alert("Senha copiada com sucesso!");
	}

	return (
		<View style={styles.container}>
			<Image 
				source={require('./src/assets/logo.png')}
				style={styles.logo}
			/>
			<Text style={styles.title}>{size} Caracteres</Text>

			<View style={styles.area}>
				<Slider 
					style={{height: 50}}
					minimumValue={5}
					maximumValue={15}
					minimumTrackTintColor="#f00"
					maximumTrackTintColor="#000"
                    value={size}
                    onValueChange={(valor)=> setSize(valor.toFixed(0))}
				/>
			</View>

			<TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={generatePass}>
				<Text style={styles.buttonText}>Gerar Senha</Text>
			</TouchableOpacity>

            {password !== '' && (
                <View style={styles.area}>
                    <Text style={styles.password} onLongPress={copyPass}>{password}</Text>
                </View>
            )}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f3f3ff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo:{
		marginBottom: 60
	},
	title:{
		fontSize: 30,
		fontWeight: 'bold'
	},
	area:{
		marginVertical: 15,
		backgroundColor: '#FFF',
		width: '80%',
		borderRadius: 8
	},
	button:{
		backgroundColor: '#FFA200',
		width: '80%',
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
		marginBottom: 25
	},
	buttonText:{
		fontSize: 20,
		color: '#FFF',
		fontWeight: 'bold'
	},
	password:{
		padding: 10,
		textAlign: 'center',
		fontSize: 20
	}
});
