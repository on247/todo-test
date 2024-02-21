const BASE_URL="https://nanameue-front-end-candidate-test.vercel.app/api"
const USER="on247"

let getTodos=async()=>{
    return fetch(`${BASE_URL}/on247/todos`)
    .then((res) => res.json())
    .then(data => {
      return data
    })
    .catch(e =>{
      return null
    });
  }
  
  let createTodo=async(text:string)=>{
    let request={
      method:"POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({text})
    }
    return fetch(`${BASE_URL}/${USER}/todos/create`,request)
    .then((res) => res.json())
    .then(data => {
      return data
    })
    .catch(e =>{
      return null
    });
  }

  let deleteTodo = async(id:string)=>{
    let request={
      method:"DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    return fetch(`${BASE_URL}/${USER}/todos/${id}`,request)
    .then((res) => res.json())
    .then(data => {
      return data
    })
    .catch(e =>{
      return null
    });
  }

  let toggleTodo = async(id:string)=>{
    let request={
      method:"PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    return fetch(`${BASE_URL}/on247/todos/${id}/toggle`,request)
    .then((res) => res.json())
    .then(data => {
      return data
    })
    .catch(e =>{
      return null
    });
  }

  export {getTodos,createTodo,deleteTodo,toggleTodo}