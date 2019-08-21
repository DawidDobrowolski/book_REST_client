var LINK = "http://localhost:8080/books/"
var div = $("#books")

getBooks()
function getBooks() {$.ajax(LINK).done(function (response) {
    response.forEach(function (item) {
        var newDiv = $("<div>")
        var newH3 = $("<h3>")
        var newButtonDelete = $("<button>").text("Delete").addClass("book"+item.id).addClass("delete")
        var newButtonEdit = $("<button>").text("Edit").addClass("book"+item.id).addClass("edit")
        newDiv.addClass("book"+item.id).addClass("books")
        newH3.text(item.title).attr('data-click',"false").attr('data-id',item.id)
        newDiv.append(newH3)
        newDiv.attr('data-id',item.id)
        newDiv.append(newButtonEdit).append(newButtonDelete).append($("<div>").hide())
        div.append(newDiv)
    })
})
}


$("body").on("click", "h3",function (event) {
    if(event.target.dataset.click==='false'){
        $.ajax(LINK+event.target.dataset.id).done(function (res) {
            var newElement =  $("<div>")
            newElement.append($("<p>").text("Author: "+res.author.firstName+" " + res.author.lastName))
            newElement.append($("<p>").text("Publisher: "+res.publisher))
            newElement.append($("<p>").text("ISBN: "+res.isbn))
            newElement.append($("<p>").text("Type: "+res.type))
            $(event.target).after(newElement)
            newElement.css("display","none")
            newElement.slideDown()
            event.target.dataset.click= "true"
        })
    }else{
        $(event.target).parent().find("div").slideUp(800)
        setTimeout(function () {
            $(event.target).parent().find("div").remove()
        },800)
        event.target.dataset.click= "false"
    }

})




