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
        alert.show("Removido com sucesso");
        location.reload();
    }).catch(err=>{
        alert("Falha ao remover!!");
    })
}



function createTable(data)
{
    const table = document.getElementById("tb-feedbacks");
    data.users.forEach(element => {
        //create a table row
        let row = document.createElement("tr");
        let tdId = document.createElement("td");
        let tdData = document.createElement("td");
        let tdActions = document.createElement("td");

        let btDel = document.createElement("button");
        let btEdit = document.createElement("button");

        row.setAttribute("id",element.feed_id);
        tdId.innerHTML = element.feed_id;
        tdData.innerHTML = element.feed_data;


        btDel.addEventListener("click",()=>deleteFeedback(element.feed_id));
        tdActions.appendChild(btDel);

        btEdit.addEventListener("click",()=>editFeedback(element.feed_id));
        tdActions.appendChild(btEdit);
        
        tdActions.appendChild(btEdit);
        tdActions.appendChild(btDel);


        row.appendChild(tdId);
        row.appendChild(tdData);
        row.appendChild(tdBirth);
        row.appendChild(tdActions);

        table.appendChild(row);

        

    });
}

function loadFeedbacks()
{
    //get id
    id = sessionStorage.getItem("feed-id");

    console.log("LOAD EMPLOYEES");
    fetch(`${API_LINK}/feedback/user/${id}`).then(async resp=>{
        data = await resp.json();
        createTable(data)
    }).catch(err=>{ createFeedbacksNotFound()});

}


function createNewButton()
{
    document.getElementById("bt-create-feed").addEventListener("click",()=>createNewFeedback(sessionStorage.getItem("user-id")))    
}


createNewButton();
loadFeedbacks();