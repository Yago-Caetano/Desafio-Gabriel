function cancel(){
    sessionStorage.clear();
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
            editFeedback(id);
        }
    }
    else if(action === "create")
    {
        if(type === EMPLOYEE_TYPE)
        {
            saveEmployee();
        }
        if(type == FEEDBACK_TYPE)
        {
            saveFeedback();       
        }
    }
}


function showInvalidRequest()
{
    sessionStorage.clear();
    alert("Requisição invalida!");
    history.go(-1);
}

function createButtons()
{
    let buttonSave = document.createElement("button");
    buttonSave.innerHTML = "Salvar"
    buttonSave.addEventListener("click",(e)=>{e.preventDefault();save(sessionStorage.getItem('edit-id'),sessionStorage.getItem('type'),sessionStorage.getItem('action'))})

    let buttonCancel = document.createElement("button");
    buttonCancel.innerHTML = "Cancelar";
    buttonCancel.addEventListener("click",(e)=>{e.preventDefault();cancel();});

    let form = document.getElementById("form")
    form.appendChild(buttonSave);
    form.appendChild(buttonCancel);
}

function formCheck()
{

    if((sessionStorage.getItem("type") === null) || (sessionStorage.getItem("action") === null))
    {
        return showInvalidRequest();
    }

    if(sessionStorage.getItem("type") === EMPLOYEE_TYPE)
    {
        createEmployeeForm();
    }
    else if(sessionStorage.getItem("type") === FEEDBACK_TYPE)
    {
        createFeedbackForm();
    }

    createButtons();
}


function fillWithEmployeeData(data)
{
    aux = data.user[0];

    let ipName = document.getElementById("employee-name")
    let ipTel = document.getElementById("employee-tel")
    let ipBirth = document.getElementById("employee-birthday")

    let auxNascimento = new Date();
    console.log(aux)

    ipName.value = aux.func_nome;
    ipTel.value = aux.func_telefone;
    ipBirth.value = aux.func_nascimento.split("T")[0]
}

function editFeedback(id)
{

    data = {
        user:`${sessionStorage.getItem("user-id")}`,
        data: `${document.getElementById("feedback-date").value}`,
        goals: `${document.getElementById("feedback-targets").value}`,
        successes: `${document.getElementById("feedback-positivos").value}`,
        mistakes: `${document.getElementById("feedback-negativos").value}`
    }

    fetch(`${API_LINK}/feedback/${id}`,{  method: 'PUT',headers: {'Content-Type': 'application/json',},body:JSON.stringify(data)}).then(resp=>{
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


function saveFeedback()
{
    data = {
        user:`${sessionStorage.getItem("user-id")}`,
        data: `${document.getElementById("feedback-date").value}`,
        goals: `${document.getElementById("feedback-targets").value}`,
        successes: `${document.getElementById("feedback-positivos").value}`,
        mistakes: `${document.getElementById("feedback-negativos").value}`
    }

    fetch(`${API_LINK}/feedback`,{  method: 'POST',headers: {'Content-Type': 'application/json',},body:JSON.stringify(data)}).then(resp=>{
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



function saveEmployee(){
    employee = {}

    employee.nome = document.getElementById("employee-name").value;
    employee.telefone = document.getElementById("employee-tel").value;
    employee.nascimento = document.getElementById("employee-birthday").value;


    fetch(`${API_LINK}/user`,{  method: 'POST',headers: {'Content-Type': 'application/json',},body:JSON.stringify(employee)}).then(resp=>{
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
    ipBirth.setAttribute("type","date");

    let form = document.getElementById("form");

    form.appendChild(lbName);
    form.appendChild(ipName);

    form.appendChild(lbTel);
    form.appendChild(ipTel);

    form.appendChild(lbBirth);
    form.appendChild(ipBirth);

    if(sessionStorage.getItem("action") === "edit")
    {
        //load employee data
        if(sessionStorage.getItem("edit-id") !== null)
        {
            loadEmployeeData(sessionStorage.getItem("edit-id"))

        }
        else
        {
            showInvalidRequest();
        }
    }

}

function loadFeedbackData(id)
{
    fetch(`${API_LINK}/feedback/${id}`).then(async resp=>{
        console.log(resp)
        data = await resp.json();
        console.log(data)

        fillWithFeedbackData(data)


    }).catch(err=>{
        showInvalidRequest();
    })
}


function fillWithFeedbackData(data)
{
    aux = data.user[0];

    let ipDate = document.getElementById("feedback-date")
    let ipTargets = document.getElementById("feedback-targets")
    let ipPositivos = document.getElementById("feedback-positivos")
    let ipNegativos = document.getElementById("feedback-negativos")

    ipPositivos.value = aux.feed_pontos_positivos;
    ipNegativos.value = aux.feed_pontos_negativos;
    ipTargets.value = aux.feed_metas;
    ipDate.value = aux.feed_data.split("T")[0]
}

function createFeedbackForm()
{
    let lbdata = document.createElement("label");
    lbdata.innerHTML = "Data";

    let ipData = document.createElement("input");
    ipData.setAttribute("id","feedback-date");
    ipData.setAttribute("type","date");


    let lbMetas = document.createElement("label");
    lbMetas.innerHTML = "Metas";

    let ipMetas = document.createElement("input");
    ipMetas.setAttribute("id","feedback-targets");


    let lbPositivos = document.createElement("label");
    lbPositivos.innerHTML = "Pontos positivos";

    let ipPositivos = document.createElement("input");
    ipPositivos.setAttribute("id","feedback-positivos");

    let lbNegativos = document.createElement("label");
    lbNegativos.innerHTML = "Pontos negativos";

    let ipNegativos = document.createElement("input");
    ipNegativos.setAttribute("id","feedback-negativos");


    let form = document.getElementById("form");

    form.appendChild(lbdata);
    form.appendChild(ipData);

    form.appendChild(lbMetas);
    form.appendChild(ipMetas);

    form.appendChild(lbPositivos);
    form.appendChild(ipPositivos);

    form.appendChild(lbNegativos);
    form.appendChild(ipNegativos);

    if(sessionStorage.getItem("action") === "edit")
    {
        //load employee data
        if(sessionStorage.getItem("edit-id") !== null)
        {
            loadFeedbackData(sessionStorage.getItem("edit-id"))

        }
        else
        {
            showInvalidRequest();
        }
    }

}


formCheck();