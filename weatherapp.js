// var myObj = { key: "value"/ array []/ function(){}};
let weather = {
    apikey: "990eb11d63c7ca8598506b1bc0f4bf30",
    // fetch 透過網路取得 json 然後印出在 console.log(data)
    // 若呼叫weather.fetchweather("Taipei")，會console.log(data)印出 API資料
    fetchweather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" +  this.apikey)
            .then(
                (response)=>{
                    return response.json()
                    // 傳到下個.then
                }
            )
            // ??? function
            .then(
                (data) => 
                this.displayweather(data)
            )
    },
    // 解構賦值(Destructuring Assignment)，提取Array或Object中的資料 ex: const o = {p: 42, q: true}; const {p, q} = o; console.log(p); >> 42 / console.log(q); >> true
    displayweather: function(data) {
        const{ name } = data;
        const{ temp } = data.main;
        const{ description, icon } = data.weather[0];
        console.log(name, temp, description,icon)
        // ??? url
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name +"')" 

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
        document.querySelector(".temp").innerText = temp + " °C"
        document.querySelector(".desciption").innerText = description

        document.querySelector(".weather").classList.remove("loading")
    },
    search: function(){
        this.fetchweather(document.querySelector(".searchbar").value)
    }
}


// funtion(){ weather.search()} vs. weather.search()
// 因為前者代表 "click" 後才呼叫； 而後者則是直接呼叫，不等"click",所以不對。
document.querySelector(".searchbtn").addEventListener("click", function(){weather.search()})

document.querySelector(".searchbar").addEventListener("keydown", function(event){
    // event.key return a "string" ex: enter, shift... 
    if (event.key == "Enter"){
        
        weather.search()
    }
})

// 預設
weather.fetchweather("Taipei")




// this 在object 中的用法:
// var o = {
//   prop: 37,
//   f: function() {
//     return this.prop;
//   }
// };
// console.log(o.f()); >>> logs 37


// problem unsolved: ???

// 為何不可寫成這樣 .then(
    // function(data){
    //     this.displayweather(data)
    // }
// )


// event.target 屬性則是永遠指向觸發事件的 DOM 物件。
