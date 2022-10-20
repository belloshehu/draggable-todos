import React from 'react';
import {useState} from 'react'
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './models';
import {DragDropContext, DropResult} from 'react-beautiful-dnd'

const  App: React.FC = ()=>{
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) =>{
    e.preventDefault()
    if(todo){
      setTodos([...todos, {id: Date.now().toString(), todo, isDone: false}])
      setTodo('')
    }
  }

  const handOnDragEnd = (result: DropResult) =>{
    console.log(result)
    let items: Todo[]; 
    let draggedItem: Todo;

    const {source, destination} = result

    if(!destination) return;
    if(source.droppableId === destination.droppableId && source.index === destination.index)
      return

    if(source?.droppableId === 'TodosActive'){
      draggedItem = todos[source.index]
      todos.splice(source.index, 1)
    }else{
      draggedItem = completedTodos[source.index]
      completedTodos.splice(source.index, 1)      
    }
    
    if(destination?.droppableId === 'TodosActive'){
      draggedItem = {...draggedItem, isDone: false}
      todos.splice(destination.index, 0, draggedItem)
    }else{
      draggedItem = {...draggedItem, isDone: true}
      completedTodos.splice(destination.index, 0, draggedItem)      
    }
  }

  return (
      <DragDropContext onDragEnd={handOnDragEnd}>
        <div className="App">
        <span className="heading">Taskify</span>
          <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
          <TodoList 
            todos={todos} 
            setTodos={setTodos}
            completedTodos={completedTodos}
            setCompletedTodos={setCompletedTodos}
            />
        </div>
      </DragDropContext>
  );
}

export default App;
