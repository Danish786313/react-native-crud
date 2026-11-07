import React, { useEffect, useState } from "react";
import {
    View, 
    Alert, 
    Text, 
    Modal, 
    TextInput, 
    Button, 
    Switch, 
    FlatList,
    ActivityIndicator,
    ImageBackground,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from "react-native";
import { supabase } from '../../supabase_config';
import styles  from './AppCompStyle';
import MyTabs from '../tabNavigator/tabNavigator';
const localImage = require('../../../assets/images/background.png'); 
const { width, height } = Dimensions.get('window');


type Todo = {
  id: number;
  name: string;
  isCompleted: boolean;
};

function AppContent(props: any) {

  // state variables
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
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={localImage}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >

          <Text style={styles.heading}>
            {props.route?.params?.username || 'Your'} Todos
          </Text>

          {/* Edit Todo Modal */}
          <Modal
            visible={showEditModal}
            transparent={true}
            animationType="slide"
          >
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

                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%'
                }}>
                  <View style={{ flex: 1, marginRight: 5 }}>
                    <Button
                      title="Update"
                      onPress={() => {
                        updateTodo(editTodoId, editTodo);
                        setShowEditModal(false);
                      }}
                      disabled={!editTodo.trim()}
                    />
                  </View>

                  <View style={{ flex: 1, marginLeft: 5 }}>
                    <Button
                      title="Cancel"
                      color="red"
                      onPress={() => setShowEditModal(false)}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal>

          {/* Add Todo Section */}
          <View style={styles.addTodoContainer}>

            <TextInput
              placeholder="Enter a new todo..."
              value={newTodo}
              onChangeText={setNewTodo}
              style={styles.input}
              placeholderTextColor="#888"
            />

            <View style={styles.buttonContainer}>
              {loading ? (
                <ActivityIndicator
                  size="large"
                  color="#7B3BF0"
                />
              ) : (
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={addTodo}
                >
                  <Text style={styles.loginText}>
                    Add Todo
                  </Text>
                </TouchableOpacity>
              )}
            </View>

          </View>

          {/* Todo List */}
          <FlatList
            data={todos}
            keyExtractor={item => String(item.id)}
            scrollEnabled={false}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.todoItem}>

                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: item.isCompleted
                        ? '#4CAF50'
                        : '#FF5722',
                    }}
                  >
                    {item.isCompleted ? 'Completed' : 'Pending'}
                  </Text>

                  <Text style={styles.todoText}>
                    {item.name}
                  </Text>
                </View>

                <View style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  gap: 10,
                  alignItems: 'center',
                }}>
                  <Switch
                    value={item.isCompleted}
                    onValueChange={() =>
                      updateToggle(item.id, item.name)
                    }
                    trackColor={{
                      false: '#767577',
                      true: '#4CAF50'
                    }}
                    thumbColor={
                      item.isCompleted
                        ? '#ffffff'
                        : '#f4f3f4'
                    }
                  />

                  <Button
                    title="Edit"
                    onPress={() =>
                      openEditModal(item.id, item.name)
                    }
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
              <Text style={styles.emptyText}>
                No todos added yet.
              </Text>
            }
          />

        </ScrollView>
      </ImageBackground>
    </View>
  );
}


export default AppContent;// export default AppContent;