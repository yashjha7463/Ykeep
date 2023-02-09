const addButton=document.getElementById('add');

const updateLSdata=()=>{
    const textAreaData=document.querySelectorAll('textarea');
    const notes=[];
    textAreaData.forEach((note)=>{
        return notes.push(note.value);
    });

    localStorage.setItem('notesky',JSON.stringify(notes));
}



const addNewNote=(text='')=>{

    const note=document.createElement('div');
    note.classList.add('note');

    const htmldata=`<div class="operation">
            <button class="edit"><i class="fas fa-edit"></i> </button>
            <button class="delete"><i class="fas fa-trash-alt"></i> </button>
            </div>
            <div class="main ${text ? "": "hidden"}"></div>
            <textarea class="${text ? "hidden": ""}"></textarea> `;

    note.insertAdjacentHTML('afterbegin',htmldata);  
    document.body.appendChild(note); // it append a node as the last child of a node.
    
    
    // getting the refrences
    const editB=note.querySelector('.edit');
    const deleteB=note.querySelector('.delete');
    
    const mainD=note.querySelector('.main');
    const textArea=note.querySelector('textarea');

    // deleting the Node
    deleteB.addEventListener('click',()=>{
        note.remove();
        updateLSdata();
    });

    // toggle using edit btn
    textArea.value=text;
    mainD.innerHTML=text;
    
    editB.addEventListener('click',()=>{
        mainD.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    textArea.addEventListener('change',()=>{
        mainD.innerHTML=textArea.value;

        updateLSdata();
    });
    

}




// geeting data from localStorage
const notes=JSON.parse(localStorage.getItem('notesky'));

if(notes)
{
    notes.forEach((note)=>{
        addNewNote(note);
    });
    
}

addButton.addEventListener('click',()=>addNewNote());