function cancel(){
    localStorage.clear();
    history.go(-1);
}

function save(id,type,action)
{
    if(action === "edit")
    {
        if(type === EMPLOYEE_TYPE)
        {
            editEmployee(id);
        }
        else if(type === ROLE_TYPE)
        {

        }
        else if(type === FEEDBACK_TYPE)
        {

        }
    }
    else if(action === "create")
    {

    }
}


function showInvalidRequest()
{
    localStorage.clear();
    alert("Requisição invalida!");
    history.go(-1);
}

function createButtons()
{
    let buttonSave = document.createElement("button");
    buttonSave.innerHTML = "Salvar"
    buttonSave.addEventListener("click",(e)=>{e.preventDefault();save(localStorage.getItem('edit-id'),localStorage.getItem('type'),localStorage.getItem('action'))})

    let buttonCancel = document.createElement("button");
    buttonCancel.innerHTML = "Cancelar";
    buttonCancel.addEventListener("click",(e)=>{e.preventDefault();cancel();});

    let form = document.getElementById("form")
    form.appendChild(buttonSave);
    form.appendChild(buttonCancel);
}


function formCheck()
{

    if((localStorage.getItem("type") === null) || (localStorage.getItem("action") === null))
    {
        return showInvalidRequest();
    }

    if(localStorage.getItem("type") === EMPLOYEE_TYPE)
    {
        createEmployeeForm();
    }

    createButtons();
}

function clearLocalStorage()
{
    localStorage.clear(); 
}

function fillWithEmployeeData(data)
{
    aux = data.user[0];

    let ipName = document.getElementById("employee-name")
    let ipTel = document.getElementById("employee-tel")
    let ipBirth = document.getElementById("employee-birthday")

    ipName.value = aux.func_nome;
    ipTel.value = aux.func_telefone;
    ipBirth.value = aux.func_nascimento;
}

function editEmployee(id)
{
    data = {
        nome:`${document.getElementById("employee-name").value}`,
        telefone:`${document.getElementById("employee-tel").value}`,
        nascimento: `${document.getElementById("employee-birthday").value}`
    }

    fetch(`${API_LINK}/user/${id}`,{  method: 'PUT',headers: {'Content-Type': 'application/json',},body:JSON.stringify(data)}).then(resp=>{
        if(resp.ok)
        {
            alert("Salvo com sucesso!")
        }
        else
        {
            alert("Falha ao salvar!")
        }
        cancel();
    }).catch(err=>{
        alert("Falha ao editar!")
        cancel();
    })
}


function loadEmployeeData(id)
{
    fetch(`${API_LINK}/user/${id}`).then(async resp=>{
        console.log(resp)
        data = await resp.json();
        console.log(data)

        fillWithEmployeeData(data)


    }).catch(err=>{
        showInvalidRequest();
    })
}


function createEmployeeForm()
{
    let lbName = document.createElement("label");
    lbName.innerHTML = "Nome";

    let ipName = document.createElement("input");
    ipName.setAttribute("id","employee-name");

    let lbTel = document.createElement("label");
    lbTel.innerHTML = "Telefone";

    let ipTel = document.createElement("input");
    ipTel.setAttribute("id","employee-tel");


    let lbBirth = document.createElement("label");
    lbBirth.innerHTML = "Nascimento";

    let ipBirth = document.createElement("input");
    ipBirth.setAttribute("id","employee-birthday");

    let form = document.getElementById("form");

    form.appendChild(lbName);
    form.appendChild(ipName);

    form.appendChild(lbTel);
    form.appendChild(ipTel);

    form.appendChild(lbBirth);
    form.appendChild(ipBirth);

    if(localStorage.getItem("action") === "edit")
    {
        //load employee data
        if(localStorage.getItem("edit-id") !== null)
        {
            loadEmployeeData(localStorage.getItem("edit-id"))

        }
        else
        {
            showInvalidRequest();
        }
    }

}

formCheck();
