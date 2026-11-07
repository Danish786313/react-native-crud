import { StyleSheet, Dimensions } from 'react-native';
import constants from '../../utils/constants/contant';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({

    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'transparent',
    },

    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 25,
    },

    addTodoContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
    },

    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#7B3BF0',
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF',
        marginBottom: 15,
    },

    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },

    loginButton: {
        width: '100%',
        backgroundColor: '#7B3BF0',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },

    loginText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    todoItem: {
      backgroundColor: '#fff',
      marginTop: 10,
      borderRadius: 20,
      padding: 10
    },
    todoText: {
      flex:  1
    },
    list: {},
    centeredView: {},
    modalView: {},
    textStyle: {}

});