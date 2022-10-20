import React from 'react'
import './styles.css'
import { Todo } from '../models'
import SingleTodo from './SingleTodo.'
import {Droppable} from 'react-beautiful-dnd'

interface Props{
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    completedTodos:Todo[],
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({todos, setTodos, completedTodos, setCompletedTodos}) => {
  return (
    <div className='container'>
      <Droppable  droppableId='TodosActive' >
        {
          (provided, snapshot)=>(
            <div className={`todos ${snapshot.isDraggingOver? 'dragged-over-active': ''}`}
              ref={provided.innerRef} 
              {...provided.droppableProps}
            >
              <span className='todos__heading'>Active Tasks ({todos.length})</span>
              {
                todos.map((todo, index) => 
                  <SingleTodo 
                    index={index} 
                    todo={todo} 
                    todos={todos} 
                    setTodos={setTodos}
                  />)
              }
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
      <Droppable droppableId='TodosRemove'>
        {
          (provided, snapshot)=>(
            <div 
              className={`todos remove ${snapshot.isDraggingOver? 'dragged-over-remove': ''}`} 
              ref={provided.innerRef} 
              {...provided.droppableProps}
            >
              <span className="todos__heading">Completed Tasks ({completedTodos.length})</span>
              {
                completedTodos.map((todo, index) => 
                  <SingleTodo 
                    index={index}
                    todo={todo} 
                    todos={completedTodos} 
                    setTodos={setCompletedTodos} 
                    key={todo.id}
                  />)
              }
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
    </div>
  )
}

export default TodoList