
function loadEmployees()
{
    console.log("LOAD EMPLOYEES");
    fetch(`${API_LINK}/user`).then(async resp=>{
        data = await resp.json();
        createTable(data)
    }).catch(err=>{ console.log("Falha!!")});
}

function deleteEmployee(id)
{
    fetch(`${API_LINK}/user/${id}`,{
        method:'DELETE'
    }).then(rep=>{
        alert.show("Removido com sucesso");
        location.reload();
    }).catch(err=>{
        alert("Falha ao remover!!");
    })
}

function editEmployee(id)
{
    localStorage.clear();

    localStorage.setItem("edit-id",id);
    localStorage.setItem("type", EMPLOYEE_TYPE);
    localStorage.setItem("action","edit");


    location.href = "./form.html";
}

function createTable(data)
{
    const table = document.getElementById("tb-employees");
    data.users.forEach(element => {
        //create a table row
        let row = document.createElement("tr");
        let tdName = document.createElement("td");
        let tdTel = document.createElement("td");
        let tdBirth = document.createElement("td");
        let tdRole = document.createElement("td");
        let tdActions = document.createElement("td");


        let btDel = document.createElement("button");
        let btEdit = document.createElement("button");

        row.setAttribute("id",element.func_id);
        tdName.innerHTML = element.func_nome;
        tdTel.innerHTML = element.func_telefone;
        tdRole.innerHTML = "-";
        tdBirth.innerHTML = element.func_nascimento;

        btDel.addEventListener("click",()=>deleteEmployee(element.func_id));
        tdActions.appendChild(btDel);

        btEdit.addEventListener("click",()=>editEmployee(element.func_id));
        tdActions.appendChild(btEdit);


        row.appendChild(tdName);
        row.appendChild(tdTel);
        row.appendChild(tdRole);
        row.appendChild(tdBirth);
        row.appendChild(tdActions);

        table.appendChild(row);

        

    });
}


loadEmployees();
