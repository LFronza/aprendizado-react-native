import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const TodoList = () => {
    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [itemsToDelete, setItemsToDelete] = useState([]);

    const adicionarTarefa = () => {
        if (newTodo.trim()) {
            setTodos([...todos, { text: newTodo, completed: false }]);
            setNewTodo('');
        }
    };

    const alterarTarefa = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        setTodos(updatedTodos);
    };

    const removerTarefa = (index) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
    };

    const selecionarParaExcluir = (index) => {
        if (itemsToDelete.includes(index)) {
            setItemsToDelete(itemsToDelete.filter((i) => i !== index));
        } else {
            setItemsToDelete([...itemsToDelete, index]);
        }
    };

    const excluirTarefasSelecionadas = () => {
        const updatedTodos = todos.filter((_, index) => !itemsToDelete.includes(index));
        setTodos(updatedTodos);
        setIsDeleting(false);
        setItemsToDelete([]);
    };

    const cancelarExclusao = () => {
        setIsDeleting(false);
        setItemsToDelete([]);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.deleteButton} onPress={() => setIsDeleting(!isDeleting)}>
                <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                value={newTodo}
                onChangeText={(text) => setNewTodo(text)}
                placeholder="Adicionar uma nova tarefa"
                placeholderTextColor="#999"
            />
            <Button title="Adicionar Tarefa" onPress={adicionarTarefa} color="#2196F3" />
            <FlatList
                data={todos}
                renderItem={({ item, index }) => (
                    <View style={styles.todoItem}>
                        <Text style={[styles.todoText, item.completed && styles.completedTodo]}>
                            {item.text}
                        </Text>
                        {isDeleting ? (
                            <TouchableOpacity
                                style={[
                                    styles.deleteItemButton,
                                    itemsToDelete.includes(index) && styles.deleteItemButtonSelected,
                                ]}
                                onPress={() => selecionarParaExcluir(index)}
                            >
                                <Text style={styles.deleteItemButtonText}>
                                    {itemsToDelete.includes(index) ? '✓' : ''}
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={[
                                    styles.checkboxButton,
                                    item.completed && styles.checkboxButtonSelected,
                                ]}
                                onPress={() => alterarTarefa(index)}
                            >
                                <Text style={styles.checkboxButtonText}>
                                    {item.completed ? '✓' : ''}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            {isDeleting && (
                <View style={styles.deleteActionsContainer}>
                    <Button title="Cancelar" onPress={cancelarExclusao} color="#9E9E9E" />
                    <Button title="Feito" onPress={excluirTarefasSelecionadas} color="#2196F3" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#BDBDBD',
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 16,
        fontSize: 16,
        backgroundColor: '#F5F5F5',
    },
    todoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        backgroundColor: '#F5F5F5',
        padding: 8,
        borderRadius: 4,
    },
    todoText: {
        flex: 1,
        fontSize: 16,
        marginRight: 8,
    },
    completedTodo: {
        textDecorationLine: 'line-through',
        color: '#9E9E9E',
    },
    deleteButton: {
        backgroundColor: '#F44336',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        marginBottom: 16,
        alignSelf: 'flex-end',
    },
    deleteButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteItemButton: {
        backgroundColor: '#BDBDBD',
        borderRadius: 16,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    deleteItemButtonSelected: {
        backgroundColor: '#F44336',
    },
    deleteItemButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteActionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    checkboxButton: {
        backgroundColor: '#BDBDBD',
        borderRadius: 16,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    checkboxButtonSelected: {
        backgroundColor: '#2196F3',
    },
    checkboxButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TodoList;
