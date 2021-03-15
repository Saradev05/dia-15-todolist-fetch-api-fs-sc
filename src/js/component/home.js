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
			headers: {
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
		let todoObject = {
			label: newTodo,
			done: false
		};
		let newTodos = [...todos, todoObject];
		setTodos(newTodos);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/menganito", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newTodos)
		})
			.then(response => {
				return response.json();
			})
			.then(responseJson => console.log());
	}

	function deleteTodo(index) {
		let newTodos = todos.filter((todo, i) => i !== index);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/menganito", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newTodos)
		})
			.then(response => {
				return response.json();
			})
			.then(responseJson => console.log());
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
				{todos.map((todo, index) => {
					return (
						<li
							key={index}
							className="list-group-item d-flex justify-content-between align-items-center">
							{todo.label}
							<button
								type="button"
								className="btn btn-outline-dark btn-sm m-3 "
								onClick={() => deleteTodo(index)}>
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
