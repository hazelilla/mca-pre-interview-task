text_truncate = (str, length) =>  {
    if (str.length > length) {
      return str.substring(0, length - 3) + '...';
    } else {
      return str;
    }
};

print = (element) =>{
    console.log("..." + element.name)
    console.log("Price: $" + parseFloat(element.price).toFixed(1))
    console.log(text_truncate(element.description, 13))
    
    if(!element.weight){
        console.log("Weigth: N/A")
    } else{
        console.log("Weigth: " + element.weight + "g")
    }
}



let domesticCost = 0;
let importedCost = 0;
let domesticCounter = 0;
let importedCounter = 0;

fetch("https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1").then((getdata)=>{
        getdata.json().then((data) => {
        
            data.sort((a, b) => {
                return (a.name || "").toString().localeCompare((b.name || "").toString())
            })

            console.log(". Domestic")
            data.forEach(element => {
                if(element.domestic){
                    
                    domesticCounter++;
                    domesticCost+=element.price;
                    print(element)
                }
            });

            console.log(". Imported")
            data.forEach(element => {
                if(!element.domestic){

                    importedCounter++;
                    importedCost+=element.price;
                    print(element)
                }
            })

            console.log("Domestic cost: $" + parseFloat(domesticCost).toFixed(1))
            console.log("Imported cost: $" + parseFloat(importedCost).toFixed(1))
            console.log("Domestic count: " + domesticCounter)
            console.log("Imported count: " + importedCounter)
        })
    }
)