import React, { useEffect, useState } from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  Switch,
  Modal
} from 'react-native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from './src/supabase_config';

type Todo = {
  id: number;
  name: string;
  isCompleted: boolean;
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal]=useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    const todoName = newTodo.trim();

    // Validate input
    if (!todoName) {
      Alert.alert('Validation', 'Please enter a todo');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('todolist')
        .insert({
          name: todoName,
          isCompleted: false,
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding todo:', error.message);
        Alert.alert('Error', error.message);
        return;
      }

      if (data) {
        // Add the newly created todo to the state
        setTodos(prevTodos => [...prevTodos, data as Todo]);

        // Clear input
        setNewTodo('');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('todolist').select('*');

      if (error) {
        console.error('Error fetching todos:', error.message);
        Alert.alert('Error', error.message);
        return;
      }

      if (data) {
        setTodos(data as Todo[]);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id: number | null, currentName: string) => {
    console.log('Updating todo with ID:', id, 'Current name:', currentName);
    const newName = currentName;

    if (newName === null || newName.trim() === '') {
      return; // User cancelled or entered an empty name
    }

    try {
      const { data, error } = await supabase
        .from('todolist')
        .update({ name: newName.trim() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating todo:', error.message);
        Alert.alert('Error', error.message);
        return;
      }

      if (data) {
        // Update the todo in the state
        setTodos(prevTodos =>
          prevTodos.map(todo => (todo.id === id ? (data as Todo) : todo)),
        );
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const openEditModal = (id: number, currentName: string) => {
    // For simplicity, we'll just use a prompt here. In a real app, you might want to use a custom modal.
    setEditTodo(currentName);
    setEditTodoId(id);
    setShowEditModal(true);
  }

  const deleteTodo = async (id: number) => {
    try {
      setLoading(true);
      const { error } = await supabase.from('todolist').delete().eq('id', id);

      if (error) {
        console.error('Error deleting todo:', error.message);
        Alert.alert('Error', error.message);
        return;
      }

      // Remove the deleted todo from the state
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Unexpected error:', error);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const updateToggle = async (id: number, currentName: string) => {
    try {
      setLoading(true);
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) {
        Alert.alert('Error', 'Todo not found');
        return;
      }

      const { data, error } = await supabase
        .from('todolist')
        .update({ isCompleted: !todoToUpdate.isCompleted })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error toggling todo:', error.message);
        Alert.alert('Error', error.message);
        return;
      }

      if (data) {
        // Update the todo in the state
        setTodos(prevTodos =>
          prevTodos.map(todo => (todo.id === id ? (data as Todo) : todo)),
        );
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Todo List</Text>

      <Modal visible={showEditModal} transparent={true} animationType="slide">
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.textStyle}>Update Todo</Text>
            <TextInput
              placeholder="Enter a new todo..."
              value={editTodo}
              onChangeText={setEditTodo}
              style={styles.input}
              placeholderTextColor="#888"
            />
            <Button
              title="Close Modal"
              onPress={() => setShowEditModal(false)}
            />
            <Button
                title="Edit"
                onPress={() => updateTodo(editTodoId, editTodo)}
              /> 
          </View>
        </View>
      </Modal>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter a new todo..."
          value={newTodo}
          onChangeText={setNewTodo}
          style={styles.input}
          placeholderTextColor="#888"
        />

        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : (
            <Button
              title="Add Todo"
              onPress={addTodo}
              disabled={!newTodo.trim()}
            />
          )}
        </View>
      </View>

      <FlatList
        data={todos}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: item.isCompleted ? '#4CAF50' : '#FF5722',
                }}
              >
                {item.isCompleted ? 'Completed' : 'Pending'}
              </Text>
              <Text style={styles.todoText}>{item.name}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                marginTop: 10,
                gap: 10,
                display: 'flex',
              }}
            >
              <Switch
                value={item.isCompleted}
                onValueChange={() => updateToggle(item.id, item.name)}
                trackColor={{ false: '#767577', true: '#4CAF50' }}
                thumbColor={item.isCompleted ? '#ffffff' : '#f4f3f4'}
              />
             
              <Button
                title="Edit"
                onPress={() => openEditModal(item.id, item.name)}
              />
              <Button
                title="Delete"
                color="red"
                onPress={() => deleteTodo(item.id)}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No todos added yet.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  button: {
    marginLeft: 2,
    marginRight: 2,
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
    color: '#222',
  },

  inputContainer: {
    paddingHorizontal: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#222',
  },

  buttonContainer: {
    marginTop: 12,
  },

  list: {
    padding: 20,
  },

  todoItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    display: 'flex',
    gap: 20,
  },

  todoText: {
    fontSize: 20,
    color: '#222',
  },

  emptyText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'skyblue',
    padding: 40,
    borderRadius: 20,
    shadowColor: 'black',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
