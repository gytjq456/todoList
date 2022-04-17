let taskInput = document.querySelector('#task-input');
let addButton = document.querySelector('#add-button');
let tabs = document.querySelectorAll('.task-tabs div');
let taskList = [];
let mode = 'all';
let filterList = []

addButton.addEventListener('click', addTask)


for (let i = 0; i < tabs.length; i++) {
	tabs[i].addEventListener('click', function (event) {
		filter(event)
	})
}

function addTask() {
	let task = {
		id: randomIDGenerate(),
		taskContent: taskInput.value,
		isComplete: false
	}
	taskList.push(task)
	render()
}


function render() {
	let list = [];
	if (mode == 'all') {
		list = taskList
	} else if (mode == 'ongoing' || mode == 'done') {
		list = filterList;
	}
	console.log(list);
	let resultHTML = '';
	for (let i = 0; i < list.length; i++) {
		if (list[i].isComplete) {
			resultHTML += `<div class="task">
				<div class="task-done">${list[i].taskContent}</div> 
				<div>
					<button onclick="toggleComplete('${list[i].id}')">Check</button>
					<button>Delete</button>
				</div>
			</div>`
		} else {
			resultHTML += `<div class="task">
				<div>${list[i].taskContent}</div> 
				<div>
					<button onclick="toggleComplete('${list[i].id}')">Check</button>
					<button onclick="deleteTask('${list[i].id}')">Delete</button>
				</div>
			</div>`
		}
	}
	document.querySelector('#task-board').innerHTML = resultHTML;

}

function toggleComplete(id) {
	for (let i = 0; i < taskList.length; i++) {
		if (taskList[i].id == id) {
			taskList[i].isComplete = !taskList[i].isComplete;
			break;
		}
	}
	render()
}

function deleteTask(id) {
	for (let i = 0; i < taskList.length; i++) {
		if (taskList[i].id == id) {
			taskList.splice(i, 1);
			break;
		}
	}
	render()
}

function filter(event) {
	mode = event.target.id
	filterList = [];

	document.querySelector('#under-line').style.width = event.target.offsetWidth + 'px';
	document.querySelector('#under-line').style.top = event.target.offsetHeight + 'px';
	document.querySelector('#under-line').style.left = event.target.offsetLeft + 'px';
	if (mode == 'all') {
		render();
	} else if (mode == 'ongoing') {
		// 진행중인 아이템
		for (let i = 0; i < taskList.length; i++) {
			if (taskList[i].isComplete == false) {
				filterList.push(taskList[i]);
			}
		}
		console.log(filterList);
		render();
	} else if (mode == 'done') {
		for (let i = 0; i < taskList.length; i++) {
			if (taskList[i].isComplete == true) {
				filterList.push(taskList[i]);
			}
		}
		render();
	}
}

function randomIDGenerate() {
	return '_' + (
		Number(String(Math.random()).slice(2)) +
		Date.now() +
		Math.round(performance.now())
	).toString(36);
}