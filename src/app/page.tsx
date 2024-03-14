import { useState } from "react";

import chalk from "chalk";



export default function Home() {
  const [taskList, setTaskList] = useState([]);

  async function addTask() {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "taskName",
        message: "Enter the task name:",
      },
    ]);

    const { taskName } = answer;

    if (taskName.trim() === "") {
      console.log(chalk.red("Task name cannot be empty."));
    } else {
      setTaskList([...taskList, { name: taskName, completed: false }]);
      console.log(chalk.green("Task added successfully!"));
    }
  }

  function listTasks() {
    if (taskList.length === 0) {
      console.log(chalk.yellow("No tasks found."));
    } else {
      taskList.forEach((task, index) => {
        const status = task.completed ? chalk.green("*") : chalk.red("O");
        console.log(`${index + 1}. [${status}] ${task.name}`);
      });
    }
  }

  // Implement other functions (un_markTask, completeTask, deleteTask) similarly

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tasks:</h1>
      {taskList.map((task, index) => (
        <Task key={index} {...task} />
      ))}
      <div className="mt-4">
        <button onClick={addTask} className="px-4 py-2 bg-blue-500 text-white rounded">
          Add Task
        </button>
      </div>
    </div>
  );
}

