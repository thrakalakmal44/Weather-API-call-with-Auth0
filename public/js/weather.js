function callWeather(){
    // array for cities with their codes;
    var cityCodes = [];
    //variable to handle http address to call weather json from openweathermap.org;
    var cityCodesAdress = "" ;
    //my lodin ID for openweathermap.org
    var myId = "6b277d6e563e2a68cf26afce7a272179" ;

        // fetching the local, cities json file
    async function getJsonData(){
        const response = await fetch('/cities.json', {mode:'no-cors'});    
        const data = await response.json();
            // calling adress preparing 
        for (i=0;i<data.List.length;i++){
            cityCodes[i]=data.List[i].CitysCode;
            if(i===data.List.length-1){
                cityCodesAdress += data.List[i].CityCode ;
            }else {
                cityCodesAdress += data.List[i].CityCode +"," ;
            }
            
        }
        var callingAdress = "http://api.openweathermap.org/data/2.5/group?id=" + cityCodesAdress + "&units=metric&APPID=" + myId ;
        //calling for json from openweathermap.org
        getWeatherJsonData(callingAdress)
    }
    getJsonData()
   //fetching json comming from openweathermap.org
    async function getWeatherJsonData(callForWeatherAdress){
        const response = await fetch(callForWeatherAdress);
        const data = await response.json();
        // calling to fill the table 
        function tableForWeatherData (){
            var table = document.getElementById("myTable");
            // clear table
            table.innerHTML = "" ;
            //filling the table
            for (var j=0;j<data.list.length;j++){
                var row = `<tr>
                <td>${data.list[j].id}</td>
                <td><b>${data.list[j].name}</b></td>
                <td align="middle"><b>${Math.floor(data.list[j].main.temp)}</b></td>
                <td><b>${data.list[j].weather[0].description}</b></td>
                </tr>`
                table.innerHTML += row ;
            }
                
        }tableForWeatherData ();        
    }
}