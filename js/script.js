// Seleção de elementos

const addForm = document.querySelector("#add-form");
const addInput = document.querySelector("#add-input");
const tarefasList = document.querySelector("#tarefas-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-btn");
const filterSelect = document.querySelector("#filter-select");

let oldTitle;

// Funções

const saveTarefa = (title, done = 0, save = 1) => {
	const tarefa = document.createElement("div");
	tarefa.classList.add("tarefa");
	
	const tarefaTitle = document.createElement("h3");
	tarefaTitle.innerText = title;
	tarefa.appendChild(tarefaTitle);
	
	const doneBtn = document.createElement("button");
	doneBtn.classList.add("done-tarefa");
	doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
	tarefa.appendChild(doneBtn);
	
	const editBtn = document.createElement("button");
	editBtn.classList.add("edit-tarefa");
	editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
	tarefa.appendChild(editBtn);
	
	const deleteBtn = document.createElement("button");
	deleteBtn.classList.add("delete-tarefa");
	deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
	tarefa.appendChild(deleteBtn);
	
	tarefasList.appendChild(tarefa);

	if(done){
		tarefa.classList.add("done");
	}

	if(save){
		saveTarefaLocalStorage({title, done: 0});
	}
	
	addInput.value = "";
	addInput.focus();
}

const toggleForms = () => {
	editForm.classList.toggle("hide");
	addForm.classList.toggle("hide");  
	tarefasList.classList.toggle("hide");  
}

const updateTarefa = (input) => {
	const tarefas = tarefasList.querySelectorAll(".tarefa");

	tarefas.forEach(tarefa => {
		let title = tarefa.querySelector("h3");

		if(title.innerText === oldTitle){
			title.innerText = input;
		}

		updateTarefasLocalStorage(oldTitle, input);
	});
}

const searchTarefa = (search) => {
	const tarefas = tarefasList.querySelectorAll(".tarefa");

	tarefas.forEach(tarefa => {
		const tarefaTitle = tarefa.querySelector("h3").innerText.toLowerCase();

		tarefa.style.display = "flex";

		if(!tarefaTitle.includes(search)){
			tarefa.style.display = "none";
		}
	});
}

const filterTarefas = (filter) => {
	const tarefas = tarefasList.querySelectorAll(".tarefa");

	tarefas.forEach(tarefa => {
		switch(filter) {
			case "all":
				tarefas.forEach(tarefa => {
					tarefa.style.display = "flex";
				});

				break;

			case "done":
				tarefas.forEach(tarefa => {
					tarefa.classList.contains("done") ? (tarefa.style.display = "flex") : (tarefa.style.display = "none");
				});

				break;
				
			case "todo":
				tarefas.forEach(tarefa => {
					tarefa.classList.contains("done") ? (tarefa.style.display = "none") : (tarefa.style.display = "flex");
				});

				break;

			default:
				break;
					
		}
	});
}

// Eventos

addForm.addEventListener("submit", (e) => {
	e.preventDefault();
	
	const inputValue = addInput.value;
	
	if(inputValue){
		saveTarefa(inputValue);
	}
});

tarefasList.addEventListener("click", (e) => {
	const targetBtn = e.target;
	const tarefaBtn = targetBtn.closest("div");
	oldTitle = tarefaBtn.querySelector("h3").innerText;
	
	if(targetBtn.classList.contains("done-tarefa")){
		tarefaBtn.classList.toggle("done");
		targetBtn.classList.toggle("done-btn");

		updateStatusLocalStorage(oldTitle);
	}
	
	if(targetBtn.classList.contains("edit-tarefa")){
		toggleForms();
	}
	
	if(targetBtn.classList.contains("delete-tarefa")){
		tarefaBtn.remove();

		removeTarefaLocalStorage(oldTitle);
	}
});

cancelEditBtn.addEventListener("click", (e) => {
	e.preventDefault();
	
	toggleForms();
});

editForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const inputValue = editInput.value;

	if(inputValue){
		updateTarefa(inputValue);
	}

	toggleForms();
});

searchInput.addEventListener("keyup", () => {
	const search = searchInput.value;

	searchTarefa(search);
});

eraseBtn.addEventListener("click", (e) => {
	e.preventDefault();

	searchInput.value = "";
	searchTarefa("");
});

filterSelect.addEventListener("change", () =>{
	const filter = filterSelect.value;

	filterTarefas(filter);
});

// Local Storage

const getTarefasLocalStorage = () => {
	const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

	return tarefas;
}

const loadTarefas = () => {
	const tarefas = getTarefasLocalStorage();

	tarefas.forEach(tarefa => {
		saveTarefa(tarefa.title, tarefa.done, 0);
	});
}

const saveTarefaLocalStorage = (tarefa) => {
	const tarefas = getTarefasLocalStorage();

	tarefas.push(tarefa);
	localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

const removeTarefaLocalStorage = (title) => {
	const tarefas = getTarefasLocalStorage();

	const filteredTarefas = tarefas.filter(tarefa => tarefa.title != title);

	localStorage.setItem("tarefas", JSON.stringify(filteredTarefas));
}

const updateStatusLocalStorage = (title) => {
	const tarefas = getTarefasLocalStorage();

	tarefas.map(tarefa => {
		tarefa.title === title ? (tarefa.done = !tarefa.done) : null;
	});

	localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

const updateTarefasLocalStorage = (old, newTitle) => {
	const tarefas = getTarefasLocalStorage();

	tarefas.map(tarefa =>{
		tarefa.title === old ? (tarefa.title = newTitle) : null;
	});

	localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

loadTarefas();