import { redirect } from "next/navigation"
import Todo from "../model/Todo"
import dbConnect from "../utils/dbConnect"
import Link from "next/link"

export default async function Show(){

    dbConnect()
    const todos = await Todo.find()

    // Function to delete todo
    async function deleteTodo(data){
        "use server"
        let id = JSON.parse(data.get('id')?.valueOf())
        
        await Todo.deleteOne({_id: id})
        redirect('/show')
    }

    return <main className="m-10 space-y-5">
        <h1 className="text-xl font-bold">Todos</h1>
        <ul className="flex font-bold">
            <li className="flex-1">Title</li>
            <li className="flex-1">Todo</li>
            <li className="flex-1">Options</li>
        </ul>
        <hr/>
        {todos.map((element)=> <>
                <ul className="flex" key={element.id}>

                    <li className="flex-1">{element.title}</li>
                    <li className="flex-1">{element.todo}</li>
                    <li className="flex-1">
                        <div className="flex">

                            <form action={deleteTodo} >
                                <input type="hidden" name="id" id="id" value={JSON.stringify(element._id)} />
                                <button type="submit" className="p-2 m-2 bg-red-600 text-white hover:cursor-pointer">Delete</button>
                            </form>

                            <Link href={"/edit/"+element._id}>
                                <button className="p-2 m-2 bg-blue-600 text-white hover:cursor-pointer">Edit</button>
                            </Link>
                        </div>

                    </li>
                </ul>
            </>
        )}
    </main>
}
