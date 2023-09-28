
// const mongoose = require('mongoose')
import {redirect} from "next/navigation"
import Todo from './model/Todo'
import dbConnect from './utils/dbConnect'


export default function Home() {

  // Function to save Todo
  async function newTodo(data){

    "use server"
    let title = data.get('title')?.valueOf()
    let todo = data.get('todo')?.valueOf()

    try{
      dbConnect()
      
      let newTodo = new Todo({title, todo})
      await newTodo.save()
      // console.log(newTodo)

    }catch(err){
      console.log(err)
    }

    redirect('/show')
  }

  return (
    <main className="m-10 apsce-y">
      <h1 className='text-xl font-bold'>Create Todo</h1>
      <form action={newTodo}>
        <div>
          <label htmlFor='title' className='text-lg'>Title</label>
          <br/>
          <input type='text' name='title' id='title' className='w-[100%] bg-slate-200 h-10 p-3' />
        </div>
        
        <div>
          <label htmlFor='todo' className='text-lg'>Todo</label>
          <br/>
          <input type='text' name='todo' id='todo' className='w-[100%] bg-slate-200 h-10 p-3' />
        </div>
        <button type='submit' className='p-3 bg-yellow-400 font-bold hover:bg-orange-500 hover:text-white'>SUBMIT</button>
      </form>
    </main>
  )
}
