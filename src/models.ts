import { type } from "os"

export interface Todo {
    id: string,
    todo: string, 
    isDone: boolean
}

type Actions = 
        {type: "add", payload: string}
    |   {type: "remove", payload: string}
    |   {type: "done", payload: string}


// const TodoReducer: (state: Todo[], action: Actions)=>{
//     switch(action.type) {
        
//     }
// }