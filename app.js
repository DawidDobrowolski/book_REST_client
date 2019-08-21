var LINK = "http://localhost:8282/books"
var div = $("div")

$.ajax(LINK).done(function (response) {
    response.forEach(function (item) {
        var newDiv = $("<div>")
        var newButtonDelete = $("<button>").text("Usun").addClass("book"+item.id).addClass("delete")
        var newButtonEdit = $("<button>").text("Edytuj").addClass("book"+item.id).addClass("edit")
        newDiv.text(item.title).addClass("book"+item.id).addClass("books")
        newDiv.append(newButtonEdit).append(newButtonDelete).append($("<div>").hide())
        div.append(newDiv)
    })
})

$("body").on("click",".books",function () {
    
})

