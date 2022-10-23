
function atributeNewRole(userId)
{    
    sessionStorage.setItem("edit-id",id);
    sessionStorage.setItem("type", ROLE_TYPE);
    sessionStorage.setItem("action","create");

    location.href = "./form.html";

}




function deleteRole(id)
{
    fetch(`${API_LINK}/roles/${id}`,{
        method:'DELETE'
    }).then(rep=>{
        alert("Removido com sucesso");
        location.reload();
    }).catch(err=>{
        alert("Falha ao remover!!");
    })
}



function createTable(data)
{
    const table = document.getElementById("tb-roles");
    data.roles.forEach(element => {
        //create a table row
        let row = document.createElement("tr");
        let tdName = document.createElement("td");
        let tdDate = document.createElement("td");
        let tdDescription = document.createElement("td");
        let tdActions = document.createElement("td");

        let btDel = document.createElement("button");

        tdName.innerHTML = element.cargo;
        tdDate.innerHTML = element.cargo_data;
        tdDescription.innerHTML = element.cargo_descricao

        btDel.addEventListener("click",()=>deleteRole(element.cargo_id));
        btDel.innerHTML = "Remover";

        tdActions.appendChild(btDel);

        row.appendChild(tdName);
        row.appendChild(tdDate);
        row.appendChild(tdDescription);
        row.appendChild(tdActions);

        table.appendChild(row);

        

    });
}

function loadRoles()
{
    //get id
    id = sessionStorage.getItem("user-id");

    if(id === null)
    {
        //not user was defined, then go back!!
        history.go(-1);
        return;
    }
    
    console.log("LOAD ROLES");
    fetch(`${API_LINK}/roles/user/${id}`).then(async resp=>{
        data = await resp.json();
        createTable(data)
    }).catch(err=>{});

}


function createNewButton()
{
    document.getElementById("bt-create-role").addEventListener("click",()=>atributeNewRole(sessionStorage.getItem("user-id")))  

}


createNewButton();
loadRoles();