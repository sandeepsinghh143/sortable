

const addItem = (element) => {
    const listDiv = document.createElement("li");
    listDiv.classList.add("item");
    listDiv.setAttribute("draggable", "true");
    const inputWrap = document.createElement("div");
    inputWrap.classList.add("input-wrap");
    const labelDiv = document.createElement("div");
    labelDiv.classList.add("label-wrap");
    const label = document.createElement("label");
    element==="input"?label.innerText="Sample Input" : element==="select"? label.innerText="Select" :label.innerText="Text area";
    const deleteItem = document.createElement("i");
    deleteItem.classList.add("fa-solid", "fa-trash");
    labelDiv.appendChild(label);
    labelDiv.appendChild(deleteItem);
    const elementToAdd = document.createElement(element);
    if(element==="select"){
        elementToAdd.innerHTML=`<option value="" disabled selected>Select Option</option>
        <option value="Sample Option 2">Sample Option 1</option>
        <option value="Sample Option 3">Sample Option 2</option>`;
    }else{
        listDiv.setAttribute("placeholder","Sample Placeholder")
    }
    inputWrap.appendChild(labelDiv);
    inputWrap.appendChild(elementToAdd)
    listDiv.appendChild(inputWrap)
    document.getElementById("sortable-list").appendChild(listDiv);

    const deleteButtons = document.getElementsByClassName("fa-trash");
Array.from(deleteButtons).forEach(element => {
    element.addEventListener("click",(e) => console.log(element.parentElement.parentElement.remove()))
});

listDiv.addEventListener("dragstart", () => {
    // Adding dragging class to item after a delay
    setTimeout(() => listDiv.classList.add("dragging"), 0);
});
// Removing dragging class from item on dragend event
listDiv.addEventListener("dragend", () => listDiv.classList.remove("dragging"));
}

const saveDetails = () => {
    const arr = document.getElementById("sortable-list").children;
    const jsonAns = Array.from(arr).map(ele=>{
        return ele;
    });
    console.log(jsonAns);
}

document.getElementById("input-add").addEventListener("click", () => addItem("input"));
document.getElementById("select-add").addEventListener("click", () =>addItem("select"));
document.getElementById("textarea-add").addEventListener("click", () => addItem("textarea"));
document.getElementById("save").addEventListener("click", saveDetails);


const deleteButtons = document.getElementsByClassName("fa-trash");
Array.from(deleteButtons).forEach(element => {
    element.addEventListener("click",(e) => console.log(element.parentElement.parentElement.remove()))
});



const sortableList = document.querySelector("#sortable-list");
const items = sortableList.querySelectorAll(".item");

items.forEach(item => {
    item.addEventListener("dragstart", () => {
        // Adding dragging class to item after a delay
        setTimeout(() => item.classList.add("dragging"), 0);
    });
    // Removing dragging class from item on dragend event
    item.addEventListener("dragend", () => item.classList.remove("dragging"));
});

const initSortableList = (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    // Getting all items except currently dragging and making array of them
    let siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];

    // Finding the sibling after which the dragging item should be placed
    let nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight;
    });

    // Inserting the dragging item before the found sibling
    sortableList.insertBefore(draggingItem, nextSibling);
}

sortableList.addEventListener("dragover", initSortableList);
sortableList.addEventListener("dragenter", e => e.preventDefault());