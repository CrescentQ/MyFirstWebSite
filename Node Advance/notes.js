
const fs = require("fs")

function read(file){
    try {
        const jsonString = fs.readFileSync(file).toString()
        const data = JSON.parse(jsonString)
        return data
    } catch (error) {
        return []
    }
}
function deleteNote(title){
var data = read("ivar1.json")

// for(var i=0; i<data.length;i++){       
//     if(title === data[i].title){
//         data.splice(i,1)     
//         fs.writeFileSync("ivar1.json",JSON.stringify(data))   
//     } 
// }
var newarr = data.filter((da)=>
     da.title !==title 
)

fs.writeFileSync("ivar1.json",JSON.stringify(newarr))

    
}

  

function add(title, author){
    var count =0;
    var data = read("ivar1.json")
    var book = {
        title:title,
        author:author
    }    
    for(var i=0; i<data.length;i++){       
        if(title === data[i].title){
            count++;             
        }
    }
        if(count >0){
            console.log("sach da ton tai");
        } else {
            console.log("them thanh cong");
            data.push(book)
            fs.writeFileSync("ivar1.json",JSON.stringify(data))
        }
    }
module.exports = {
    add: add,
    deleteNote:deleteNote
}