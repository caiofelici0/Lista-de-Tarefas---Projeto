// Seleção de elementos

const addForm = document.querySelector("#add-form");
const addInput = document.querySelector("#add-input");
const tarefasList = document.querySelector("#tarefas-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

// Funções

const saveTarefa = (title) => {
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

    addInput.value = "";
    addInput.focus();
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

    if(targetBtn.classList.contains("done-tarefa")){
        tarefaBtn.classList.add("done");
    }

    if(targetBtn.classList.contains("edit-tarefa")){
        
    }

    if(targetBtn.classList.contains("delete-tarefa")){
        
    }
});