const showcase = document.getElementById("showcase");
async function loadData(id){
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${id}`);
    const data = await res.json();
    const phones = data.data;
    if(phones.length == 0){
        alert("Invalid Input!");
        return;
    }
    populateData(phones);
}
loadData(13);
function populateData(phoneData){
    const showcaseContainer = document.querySelector(".phoneContainer");
    showcaseContainer.innerHTML = '';
    phoneData.forEach(eachPhone => {
        const parentDiv = document.createElement("div");
        parentDiv.className = "w-[20%] h-[90%] m-2 p-2 rounded-2xl flex flex-col items-center shadow-xl mb-10";

        const imgDiv = document.createElement("div");
        imgDiv.className = "h-24 w-24 mb-14";
        
        const img = document.createElement("img");
        img.src = eachPhone.image;
        imgDiv.appendChild(img);

        parentDiv.appendChild(imgDiv);

        const name = document.createElement("h1");
        name.className = "font-xl font-semibold mb-4";
        name.textContent = eachPhone.phone_name;

        parentDiv.appendChild(name);

        const button = document.createElement("button");
        button.type = 'button';
        button.className = "m-2 p-2  rounded-full border border-solid border-gray-500 hover:shadow-xl";
        button.textContent = "Show Details";
        button.onclick = `modalDetail(${eachPhone.slug})`;

        parentDiv.appendChild(button);

        showcaseContainer.appendChild(parentDiv);
    });
    console.log(phoneData);
}
function findPhone(){
    const searchVal = document.getElementById('inputVal').value;
    loadData(searchVal);
    
    const showcaseElement = document.getElementById('showcase');
    showcaseElement.scrollIntoView({ behavior: 'smooth' });
}
function modalDetail(phoneSlug){
    const my_modal = document.getElementById('my_modal');
    console.log("loaded");
    my_modal.showModal();
}
const showcaseInput = document.getElementById('inputVal');
showcaseInput.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
        event.preventDefault();
        findPhone();
    }
});
