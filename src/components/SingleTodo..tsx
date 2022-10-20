import React from 'react'
import {Todo} from '../models'
import {AiFillEdit, AiFillDelete} from 'react-icons/ai'
import {MdDone} from 'react-icons/md'
import {useState, useRef, useEffect} from 'react'
import {Draggable} from 'react-beautiful-dnd'

type Props = {
    index: number
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
}

const SingleTodo: React.FC<Props> = ({index, todo, todos, setTodos}) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<Todo>(todo)

    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (value: string) =>{
        setEditTodo({...editTodo, todo:value})
    }

    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault()
        setTodos(todos.map(todo => todo.id === editTodo.id? editTodo: todo))
        setEditMode(prev=> !prev)
    }

    const handleEdit = (todo: Todo) =>{
        setEditTodo(todo)
        setEditMode(prev => !prev)
    }

    const handleDelete = (id: string) =>{
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const handleDone = (id: string) =>{
        setTodos(todos.map(todo => todo.id === id? {...todo, isDone: !todo.isDone}: todo))
    }

    useEffect(() => {
        inputRef.current?.focus()
    }, [editMode])
    
  return (
    <Draggable draggableId={todo.id} key={todo.id} index={index}>
        {
            (provided, snapshot)=>(
                <form 
                    className={`todos__single ${snapshot.isDragging? 'dragged': ''}`}
                    onSubmit={handleSubmit} 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef} 
                >
                    {
                        editMode && !todo.isDone ?(
                            <input type='text'
                                ref={inputRef} 
                                onChange={(e)=>handleChange(e.target.value)}
                                className='todos__single--text' 
                                value={editTodo.todo} />
                        ):
                        (
                            todo.isDone? (
                                    <s className="todos__single--text">{todo.todo}</s>
                                ):
                                (
                                    <span className="todos__single--text">{todo.todo}</span>
                                )
                        )
                    }
                    <div>
                        <span className="icon">
                            <AiFillEdit 
                                onClick={()=>handleEdit(todo)}
                                />
                        </span>
                        <span className="icon">
                            <AiFillDelete
                                onClick={()=>handleDelete(todo.id)}
                                />
                        </span>
                        <span className="icon">
                            <MdDone
                                onClick={(e)=>handleDone(todo.id)} />
                        </span>
                    </div>
                </form>
            )
        }
    </Draggable>
  )
}

export default SingleTodo