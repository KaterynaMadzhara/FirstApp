let key = "list";
let todoArr = [];

window.addEventListener('load',() => {
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const list_elem = document.querySelector('#tasks');
    const error = document.querySelector('#error');
    const createEl = () => {
        const task_elem = document.createElement('div');
        task_elem.classList.add('task');

        const task_elem_content = document.createElement('div');
        task_elem_content.classList.add('content');
        task_elem.appendChild(task_elem_content);

        const task_elem_input = document.createElement('input');
        task_elem_input.type = "checkbox";
        task_elem_input.classList.add('text');

        const task_elem_input_p = document.createElement('p');
        task_elem_content.appendChild(task_elem_input);
        task_elem_content.appendChild(task_elem_input_p);

        const task_elem_action = document.createElement('div');
        task_elem_action.classList.add('actions');

        const task_elem_button = document.createElement('button');
        task_elem_button.classList.add('delete');
        task_elem_button.innerHTML = "Delete";
        task_elem_action.appendChild(task_elem_button);
        task_elem.appendChild(task_elem_action);
        list_elem.appendChild(task_elem);
        return {
            task_elem,
            task_elem_input_p,
            task_elem_button,
            task_elem_input
        }
    }

    const deleteTask = (taskItem) => {
        taskItem.task_elem_button.addEventListener('click', () => {
            todoArr = JSON.parse(localStorage.getItem(key));
            let deleteArr = todoArr.filter(obj =>
                obj.id.toString() !== taskItem.task_elem.id
            )
            localStorage.setItem(key, JSON.stringify(deleteArr))
            list_elem.removeChild(taskItem.task_elem);
        })
    }

    const doneTask = (taskItem) => {
        taskItem.task_elem_input.addEventListener('click', () => {
            taskItem.task_elem_input_p.classList.toggle('done');
            todoArr = JSON.parse(localStorage.getItem(key));
            let newArr = todoArr.map(obj => {
                if (obj.id.toString() === taskItem.task_elem.id) {
                    obj.done = !obj.done
                }
                return obj
            })
            localStorage.setItem(key, JSON.stringify(newArr))
        })
    }

    if(localStorage.getItem(key)) {
        todoArr = JSON.parse(localStorage.getItem(key));
        for (const obj of todoArr) {
            let tasksItem = createEl();
            tasksItem.task_elem.id = obj.id;
            tasksItem.task_elem_input_p.innerHTML = obj.name;
            if(obj.done) {
                tasksItem.task_elem_input_p.classList.add('done');
                tasksItem.task_elem_input.checked = true;
            }
            doneTask(tasksItem);
            deleteTask(tasksItem)
        }
    }
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        error.innerHTML ="";
        const task = input.value;
        if (!task || !task.trim()) {
            error.innerHTML = "Please enter some valid value"
            return
        }
        let taskItem = createEl();
        let id = Math.floor(Math.random() * 100);
        taskItem.task_elem_input_p.innerHTML = task;
        const createTaskObj = (objectList) => {
            const taskObj = {
                name: task,
                id: id,
                done: false
            }
            objectList.push(taskObj);
        }
        createTaskObj(todoArr);
        taskItem.task_elem.setAttribute('id', id.toString());
        localStorage.setItem(key, JSON.stringify(todoArr))
        input.value ="";
        doneTask(taskItem);
        deleteTask(taskItem, taskItem.task_elem)
    })
})
