function createNewFeedback(userId)
{    
    sessionStorage.setItem("edit-id",id);
    sessionStorage.setItem("type", FEEDBACK_TYPE);
    sessionStorage.setItem("action","create");

    location.href = "./form.html";

}


function createFeedbacksNotFound()
{
    alert("Não foram encontrados feedbacks");    
}

function editFeedback(id)
{

    sessionStorage.setItem("edit-id",id);
    sessionStorage.setItem("type", FEEDBACK_TYPE);
    sessionStorage.setItem("action","edit");


    location.href = "./form.html";
}


function deleteFeedback(id)
{
    fetch(`${API_LINK}/feedback/${id}`,{
        method:'DELETE'
    }).then(rep=>{
        alert("Removido com sucesso");
        location.reload();
    }).catch(err=>{
        console.log(err)
        alert("Falha ao remover!!");
    })
}



function createTable(data)
{
    console.log(data);
    const table = document.getElementById("tb-feedbacks");
    data.roles.forEach(element => {
        //create a table row
        let row = document.createElement("tr");
        let tdId = document.createElement("td");
        let tdData = document.createElement("td");
        let tdMetas = document.createElement("td");
        let tdPositivos = document.createElement("td");
        let tdNegativos = document.createElement("td");
        let tdActions = document.createElement("td");

        let btDel = document.createElement("button");
        let btEdit = document.createElement("button");

        row.setAttribute("id",element.feed_id);
        tdId.innerHTML = element.feed_id;
        tdData.innerHTML = element.feed_data;
        tdMetas.innerHTML = element.feed_metas;
        tdPositivos.innerHTML = element.feed_pontos_positivos;
        tdNegativos.innerHTML = element.feed_pontos_negativos;


        btDel.addEventListener("click",()=>deleteFeedback(element.feed_id));
        btDel.innerHTML = "Remover";
        tdActions.appendChild(btDel);

        btEdit.addEventListener("click",()=>editFeedback(element.feed_id));
        btEdit.innerHTML = "Editar";
        tdActions.appendChild(btEdit);
        
        tdActions.appendChild(btEdit);
        tdActions.appendChild(btDel);


        row.appendChild(tdData);
        row.appendChild(tdMetas);
        row.appendChild(tdPositivos);
        row.appendChild(tdNegativos);
        row.appendChild(tdActions);

        table.appendChild(row);

        

    });
}

function loadFeedbacks()
{
    //get id
    id = sessionStorage.getItem("user-id");
    if(id === null)
    {
        //not user was defined, then go back!!
        history.go(-1);
        return;
    }
    console.log("LOAD FEEDBACKS");
    fetch(`${API_LINK}/feedback/user/${id}`).then(async resp=>{
        console.log(resp)
        data = await resp.json();
        createTable(data)
    }).catch(
        err=>{ console.log(err)});

}


function createNewButton()
{
    document.getElementById("bt-create-feed").addEventListener("click",()=>createNewFeedback(sessionStorage.getItem("user-id")))    
}


createNewButton();
loadFeedbacks();