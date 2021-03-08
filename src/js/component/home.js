import React, { useState, useEffect } from "react";

//include images into your bundle
//Saratodolist con Fetch Api
//create your first component
export function Home() {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/menganito", {
			method: "GET",
			heathers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				return response.json();
			})
			.then(responseJson => {
				setTodos(responseJson);
			});
	}, []);

	function createTodo() {
		console.log("Createtodo");
		fetch("https://assets.breatheco.de/apis/fake/todos/user/menganito", {
			method: "PUT",
			heathers: {
				"Content-Type": "application/json;charset-UTF-8"
			},
			body: JSON.stringify({
				title: newTodo,
				body: "",
				userId: 1
			})
		})
			.then(response => response.json())
			.then(responseJson => {
				console.log(responseJson);
				let newTodos = JSON.parse(JSON.stringify(todos));
				responseJson.title = newTodo;
				newTodos.push(responseJson);
				setTodos(newTodos);
			});
	}

	function deleteTodo(id) {
		let newTodos = todos.filter(todo => todo.id !== id);
		console.log(newTodos);
		setTodos(newTodos);
	}

	return (
		<div className="text-center  list-group container ">
			<h1>TO DO LIST</h1>
			<div className="card list-group">
				<input
					className="list-group-item"
					type="text"
					placeholder="add new to do..."
					onChange={event => {
						setNewTodo(event.target.value);
					}}
				/>
				<input type="button" value="crear" onClick={createTodo} />
			</div>
			<ul className="list-group col-8 ">
				{todos.map((todo, id) => {
					return (
						<li
							key={id}
							className="list-group-item d-flex justify-content-between align-items-center">
							{todo.label}
							<button
								type="button"
								className="btn btn-outline-dark btn-sm m-3 "
								onClick={() => deleteTodo(id, todo)}>
								{" "}
								X
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

// function deleteTask(taskIndex) {
//         let newTaskList = taskList.filter((task, index) => {
//             return taskIndex !== index;
//         });
//         setTaskList(newTaskList);
//     }
//     function addTask() {
//         let inputvalue = document.querySelector("#input").value;
//         if (inputvalue !== "") {
//             let newTask = { label: inputvalue, done: false };
//             let newTaskList = [...taskList, newTask];
//             setTaskList(newTaskList);
//             document.querySelector("#input").value = "";
//         }
