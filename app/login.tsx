import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useState } from "react"
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native"
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loginScreen = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [passowrd, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !passowrd) {
            alert('please fill all the fields');
            return;
        }

        try {
            await AsyncStorage.setItem('user-token', 'fujel-123');
            await AsyncStorage.setItem('user-name', 'fujel patel');
            // We use "replace" instead of "push" so the user can't go back to Login by pressing Back button
            router.replace('/(tabs)');
        } catch (error) {
            console.error('error in login', error);
        }

    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                    <Ionicons name="planet" size={60} color="#8ae1ee" />
                </View>
                <Text style={styles.appName}>App</Text>
                <Text style={styles.tagLine}>Welcome Back, Explorer</Text>
            </View>

            {/* Form section */}
            <View style={styles.formContainer}>
                {/* email input */}
                <View style={styles.inputWrapper}>
                    <Ionicons name='mail-outline' size={20} color={'#666'} style={styles.inputIcon} />
                    <TextInput
                        placeholder='Enter your Email'
                        placeholderTextColor={'#666'}
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        autoCapitalize='none'
                        keyboardType='email-address'
                    />
                </View>

                {/* password input */}
                <View style={styles.inputWrapper}>
                    <Ionicons name='lock-closed-outline' size={20} color={'#666'} style={styles.inputIcon} />
                    <TextInput
                        placeholder='Enter your passowrd'
                        placeholderTextColor={'#666'}
                        value={passowrd}
                        onChangeText={setPassword}
                        style={styles.input}
                        secureTextEntry // Hides the password
                    />
                </View>

                {/* Login Button */}
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginText}>Sign In</Text>
                </TouchableOpacity>

                {/* forgot password */}
                <TouchableOpacity style={styles.forgotButton} onPress={handleLogin}>
                    <Text style={styles.forgotText}>Forgot Password</Text>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account?</Text>
                <TouchableOpacity>
                    <Text style={styles.signupText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default loginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        justifyContent: 'center',
        padding: 20
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50
    },
    logoCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#1a1a1a',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#333',
        // Glow Effect
        shadowColor: '#8ae1ee',
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        elevation: 10
    },
    appName: {
        color: '#ffffffff',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    tagLine: {
        color: '#888',
        fontSize: 16
    },
    formContainer: { width: '100%' },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1e1e1e',
        borderRadius: 12,
        marginBottom: 15,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#333',
        height: 55,
    },
    input: {
        flex: 1,
        color: 'white',
        fontSize: 16,
        height: '100%'
    },
    inputIcon: { marginRight: 10, },
    loginButton: {
        backgroundColor: '#8ae1ee',
        height: 55,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#8ae1ee',
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 5
    },
    loginText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold'
    },
    forgotButton: {
        alignItems: 'center',
        marginTop: 20
    },
    forgotText: { color: '#666' },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50
    },
    footerText: {
        color: '#888',
        marginRight: 5
    },
    signupText: {
        color: '#8ae1ee',
        fontWeight: 'bold',
    }
})