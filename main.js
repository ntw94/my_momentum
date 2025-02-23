
let todos = [];
let username = "";

const meals = {
    breakfast: [
      "계란후라이", "토스트", "베이컨", "시리얼", "요거트", "오트밀", "팬케이크", "크로와상", "김밥", "떡국",
      "샌드위치", "모닝빵", "비엔나소시지", "김치전", "쥬스", "커피", "아메리카노", "프렌치토스트", "모카", "두부구이",
      "떡볶이", "계란말이", "호두과자", "식빵", "갈릭브레드", "베이글", "죽", "햄", "치즈", "햄버거"
    ],
    lunch: [
      "비빔밥", "김치찌개", "된장찌개", "피자", "샌드위치", "라면", "불고기", "돈까스", "김밥", "짜장면",
      "짬뽕", "칼국수", "만두", "제육볶음", "순두부찌개", "곰탕", "김치볶음밥", "햄버거", "토스트", "떡볶이",
      "닭강정", "덮밥", "치킨", "파스타", "양식", "샐러드", "수제비", "삼겹살", "삼계탕", "육회"
    ],
    dinner: [
      "불고기", "삼겹살", "닭볶음탕", "짜장면", "회", "볶음밥", "갈비", "된장찌개", "비빔밥", "김치찌개",
      "삼계탕", "해물탕", "갈비찜", "조개구이", "김치전", "튀김", "생선구이", "라면", "샤브샤브", "초밥",
      "스테이크", "치킨너겟", "회덮밥", "닭도리탕", "쭈꾸미볶음", "오징어볶음", "소고기국밥", "곱창구이", "족발",
      "파전", "순두부찌개"
    ],
    snack: [
        "과일", "치즈", "초콜릿", "쿠키", "케이크", "핫도그", "떡", "감자튀김", "스낵", "아이스크림", 
        "나쵸", "팝콘", "젤리", "사탕", "카스테라", "모카커피", "핫초콜릿", "모찌", "과자", "견과류",
        "쥬시후르츠", "미니빵", "프레첼", "건포도", "단호박", "요거트", "시리얼바", "바나나", "딸기", "망고"
      ]
  };


$(document).ready(()=>{
    todos =JSON.parse(localStorage.getItem("todos"));
    username  = JSON.parse(localStorage.getItem("username"));
    
    const userInput = document.querySelector("#userInput");

    if(!todos) todos = [];
    if(!username){
        username = "";
    }
    getListAll();

    if(username == ""){
        userInput.classList.remove("inputHide");
    }else{
        userInput.classList.add("inputHide");
    }
    
    userInput.value = username;
    userInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            saveUserName(event.target.value);
            event.target.classList.add("inputHide");
        }
    });

    userInput.addEventListener("focus", (event) => {
        event.target.classList.remove("inputHide");
    });

    userInput.addEventListener("blur", (event) => {
        event.target.classList.add("inputHide");
    });

    userInput.addEventListener("input",()=>{
        saveUserName(event.target.value);
    })

})

//유저 이름 저장
function saveUserName(name){
    localStorage.setItem("username",JSON.stringify(name));
}
function getCurrentTime(){
    const nowTime = new Date();
    return {
        hour : nowTime.getHours(),
        minutes: nowTime.getMinutes(),
    }
}

//현재 시간 표시
const timerContainer = document.getElementById("timerContainer");
setInterval(() => {
    const nowTime = new Date();

    const hour = nowTime.getHours();
    const minutes = nowTime.getMinutes();

    const hourFormat = nowTime.getHours() < 10 ? `0${hour}` :hour;
    const minutesFormat = nowTime.getMinutes() < 10 ? `0${minutes}` :minutes;

    timerContainer.innerHTML = hourFormat + " : " + minutesFormat

}, 1000);

$("#tasksButton").click((e)=>{
    if(event.target.checked == true){
        $("#tasksContainer").fadeIn(300);
    }else{
        $("#tasksContainer").fadeOut(300);
    }
});

$("#todoInput").on("keydown", (event)=>{
    if (event.key  === "Enter") {  
        if(!event.target.value) return;
        // 또는 event.keyCode === 13
        // 엔터키가 눌렸을 때 실행할 코드
        //저장
        
        const newId = Date.now();
        addTodo(newId, event.target.value);
        makeHtmlTodo( newId,event.target.value);

        event.target.value = "";
    }
})

    
function addTodo(id,content){
    const newTodo = {
        id : Date.now(),
        content: content,
        checked:false,
    }
    todos.push(newTodo);
    saveTodos();
}
function updateTodo(id,content){
    const findTodo = todos.find((item)=>item.id ==id);
    findTodo.content = content;
    saveTodos();
}

function deleteTodo(id){
    const filteredTodo = todos.filter((item) => item.id != id)
    todos = filteredTodo;
    saveTodos();
}

function getListAll(){
    todos.forEach((item)=>{
        makeHtmlTodo(item.id, item.content, item.checked);
    })
}
function updateCheckTodos(id,checked){
    const findTodo = todos.find((item) =>item.id == id);
    findTodo.checked = checked;
    saveTodos();
}
function saveTodos(){
    localStorage.setItem("todos",JSON.stringify(todos));
}

function makeHtmlTodo(id,inputValue,checked){
    const content = document.getElementById("content");
    const containerDiv = document.createElement("div");
    const checkBox = document.createElement("input");
    const span = document.createElement("span");
    const button = document.createElement("button");

    checkBox.type = "checkbox";
    checkBox.checked = checked;
    checkBox.classList.add("check-box");
    checkBox.addEventListener("click",(event)=>{
        
        const parentDiv = event.target.closest('div');
        const spanTag = parentDiv.querySelector('span');

        if(event.target.checked) spanTag.classList.add("completed");
        else spanTag.classList.remove("completed");

        updateCheckTodos(id,event.target.checked);
    })

    span.innerHTML = inputValue;

    if(checked) span.classList.add("completed");
    span.addEventListener("input",(event)=>{
        updateTodo(id,event.target.innerHTML);
    })
    span.addEventListener("blur",(event)=>{
        event.target.removeAttribute("contenteditable");
    })

    button.innerHTML = "..."
    button.setAttribute("id",id);
    button.classList.add("hidden");
    button.addEventListener("click", (event)=>{
        // 기존 컨텍스트 메뉴 제거
        const existingMenu = document.getElementById("context-menu");
        if (existingMenu) {
            existingMenu.remove();
        }

        // 메뉴 컨테이너 생성
        const container = document.createElement("div");
        container.id = "context-menu";
        container.style.position = "absolute";
        container.style.width = "120px";
        container.style.background = "#fff";
        container.style.border = "1px solid #ccc";
        container.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
        container.style.padding = "5px";
        container.style.borderRadius = "5px";
        container.style.zIndex = "1000";

        // 클릭한 버튼의 위치 정보 가져오기
        const rect = event.target.getBoundingClientRect();
        const menuWidth = 120; // 메뉴 너비
        const menuHeight = 60; // 예상되는 메뉴 높이 (2줄)

        // 화면 가로 크기 가져오기
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // 기본 위치 (버튼 아래)
        let posX = rect.left + window.scrollX;
        let posY = rect.bottom + window.scrollY;

        // 오른쪽 화면 끝을 넘어갈 경우 좌표 조정
        if (posX + menuWidth > viewportWidth) {
            posX = viewportWidth - menuWidth - 10; // 우측 끝에서 10px 여유 두고 정렬
        }

        // 아래쪽 화면 끝을 넘어갈 경우 위로 띄우기
        if (posY + menuHeight > viewportHeight) {
            posY = rect.top + window.scrollY - menuHeight;
        }

        container.style.left = `${posX}px`;
        container.style.top = `${posY}px`;

        // 메뉴 항목 생성
        const editMenu = document.createElement("div");
        editMenu.innerText = "수정";
        editMenu.style.padding = "8px";
        editMenu.style.cursor = "pointer";
        editMenu.addEventListener("click", () => {
            const existingMenu = document.getElementById("context-menu");
            if (existingMenu) {
                existingMenu.remove();
            }

            const updateTag = document.getElementById(id);
            const changeSpan = updateTag.parentNode.querySelector("span"); // span을 찾은뒤
            changeSpan.classList.add("editable");
            changeSpan.setAttribute("contenteditable","true");
            changeSpan.focus();
            setCaretToEnd(changeSpan);
        });

        const deleteMenu = document.createElement("div");
        deleteMenu.innerText = "삭제";
        deleteMenu.style.padding = "8px";
        deleteMenu.style.cursor = "pointer";
        deleteMenu.addEventListener("click", (event) => {
            const existingMenu = document.getElementById("context-menu");
            if (existingMenu) {
                existingMenu.remove();
            }
            const deleteTag = document.getElementById(id);
            deleteTag.closest("div").remove();
        });

        // 스타일 추가
        editMenu.style.borderBottom = "1px solid #ddd";
        editMenu.style.background = "#f9f9f9";
        deleteMenu.style.background = "#f9f9f9";

        editMenu.addEventListener("mouseover", () => (editMenu.style.background = "#eee"));
        editMenu.addEventListener("mouseout", () => (editMenu.style.background = "#f9f9f9"));

        deleteMenu.addEventListener("mouseover", () => (deleteMenu.style.background = "#eee"));
        deleteMenu.addEventListener("mouseout", () => (deleteMenu.style.background = "#f9f9f9"));

        // 컨테이너에 메뉴 추가
        container.appendChild(editMenu);
        container.appendChild(deleteMenu);

        // 문서에 추가
        document.body.appendChild(container);

        // 클릭하면 메뉴 제거
        document.addEventListener("click", (e) => {
            if (!container.contains(e.target) && e.target !== event.target) {
                container.remove();
            }
        }, );
    });
    button.addEventListener("mouseout", (event)=>{
        
    });

    containerDiv.addEventListener("mouseover",(event)=>{
        button.classList.remove("hidden");
    })
    
    containerDiv.addEventListener("mouseout",(event)=>{
        button.classList.add("hidden");
    })

    containerDiv.appendChild(checkBox);
    containerDiv.appendChild(span);
    containerDiv.appendChild(button);
    content.appendChild(containerDiv);

}

// 커서를 마지막 위치로 보내는 함수
function setCaretToEnd(span) {
    const range = document.createRange();  // 새로운 range 객체 생성
    const selection = window.getSelection();  // 선택 객체 생성
  
    range.selectNodeContents(span);  // span의 전체 내용을 선택
    range.collapse(false);  // 마지막 위치로 커서 설정 (false -> 맨 뒤)
  
    selection.removeAllRanges();  // 기존 선택 영역 제거
    selection.addRange(range);  // 새로운 범위 추가
  }

function getLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            },
            (error) => {
                reject(error);
            }
        );
    });
}

async function getQuote(){
    const url = `https://korean-advice-open-api.vercel.app/api/advice`
    const response  = await fetch(url);
    const data = await response.json();

    console.log(data);

    const qutoes = document.getElementById("qutoes");
    const author = document.getElementById("author");

    qutoes.innerHTML = data.message;
    author.innerHTML = "-"+data.authorProfile + " " + data.author +"-"; // authorProfile;

    $("#famousQuotes").on("mouseenter", function() {
        $("#author").fadeIn(300);
    });

    $("#famousQuotes").on("mouseleave", function() {
        $("#author").fadeOut(300);
    });
    
}

getQuote();


async function getWeatherInfo(){
    try{
        const location = await getLocation();
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=&units=metric`;
        const response  = await fetch(url);
        const data = await response.json();
    
        return data;
    }catch(error){
        console.log("에러",error);
    }
}

const weatherInfo = getWeatherInfo();
weatherInfo.then((res)=>{
    const {
        coord: {lon, lat},
        weather, 
        main, 
        wind,
        sys,
        name,
    } = res;

    const weatherIcon = document.getElementById("weatherIcon");
    const weatherContent = document.getElementById("temp");
    weatherContent.innerHTML = main.temp+"<span>℃</span>";
    weatherIcon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;


}).catch((e)=>{
    const weatherContent = document.getElementById("temp");
    weatherContent.innerHTML ="?";
});

openRandomFoodContent();

function getRandomFood(){

    const nowTime = new Date();

    const hour = nowTime.getHours();
    const minutes = nowTime.getMinutes();

    const hourFormat = nowTime.getHours() < 10 ? `0${hour}` :hour;
    const minutesFormat = nowTime.getMinutes() < 10 ? `0${minutes}` :minutes;

    let randomIdx;
    if(hour >= 6 && hour <= 9){// 아침 :  6 ~ 9
        randomIdx = Math.floor(Math.random()*meals.breakfast.length);
        return meals.breakfast[randomIdx];
    }
    // 점심 : 11 ~ 14
    else if(hour >= 11 && hour <= 13){
        randomIdx = Math.floor(Math.random()*meals.lunch.length);
        return meals.lunch[randomIdx];
    }
    // 저녁 : 17 ~ 20
    else if(hour >= 17 && hour <= 20){
        randomIdx = Math.floor(Math.random()*meals.dinner.length);
        return meals.dinner[randomIdx];
    }else{
        randomIdx = Math.floor(Math.random()*meals.snack.length);
        return meals.snack[randomIdx];
    }
}

function openRandomFoodContent(){

    const foodContent = document.querySelector("#randomFoodContent");

    $("#randomFoodContent").on("click",()=>{

    })

    foodContent.addEventListener("click",(event)=>{
        // 기존 컨텍스트 메뉴 제거
        const existingMenu = document.getElementById("food-menu");
        if (existingMenu) {
            existingMenu.remove();
        }else{
        console.log(existingMenu)

        // 메뉴 컨테이너 생성
        const container = document.createElement("div");
        container.id = "food-menu";
        container.style.position = "absolute";
        container.style.width = "150px";
        container.style.height = "250px";
        container.style.background = "#fff";
        container.style.border = "1px solid #ccc";
        container.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
        container.style.padding = "5px";
        container.style.borderRadius = "5px";
        container.style.zIndex = "1000";

        const randomBtn = document.createElement("button");
        randomBtn.innerHTML = "음식뽑기";
        randomBtn.addEventListener("click",(e)=>{
            const randomBoard = document.getElementById("randomBoard");
            
            const intervalId = setInterval(() => {
                    randomBoard.innerHTML = getRandomFood();
                }, 100);

            setTimeout(()=>{
                clearInterval(intervalId);
            },1000);

        })

        const randomBoard = document.createElement("div");
        randomBoard.id = "randomBoard";
        

        // 클릭한 버튼의 위치 정보 가져오기
        const rect = event.target.getBoundingClientRect();
        const menuWidth = 120; // 메뉴 너비
        const menuHeight = 60; // 예상되는 메뉴 높이 (2줄)

        // 화면 가로 크기 가져오기
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // 기본 위치 (버튼 아래)
        let posX = rect.left + window.scrollX;
        let posY = rect.bottom + window.scrollY;

        // 오른쪽 화면 끝을 넘어갈 경우 좌표 조정
        if (posX + menuWidth > viewportWidth) {
            posX = viewportWidth - menuWidth - 10; // 우측 끝에서 10px 여유 두고 정렬
        }

        // 아래쪽 화면 끝을 넘어갈 경우 위로 띄우기
        if (posY + menuHeight > viewportHeight) {
            posY = rect.top + window.scrollY - menuHeight;
        }

        container.style.left = `${posX}px`;
        container.style.top = `${posY}px`;


        container.appendChild(randomBoard);
        container.appendChild(randomBtn);
        document.body.appendChild(container);

        // 클릭하면 메뉴 제거
        document.addEventListener("click", (e) => {
            if (!container.contains(e.target) && e.target !== event.target) {
                container.remove();
            }
        }, );
        }
    })
}

function settingGreetingMessage(){
    const timeObj = getCurrentTime();
    const greetingMessage = getGreetingMessage(timeObj.hour);

    const greetingContainer = document.getElementById("greetingMessage");
    greetingContainer.innerHTML = greetingMessage;


}

function getGreetingMessage(hour){

    if( hour <= 9){
        return "Good morning"
    }else if(hour >= 10 && hour <= 17){
        return "Good afternoon"
    }else if(hour >= 18 && hour <= 24){
        return "Good evening"
    }
}

