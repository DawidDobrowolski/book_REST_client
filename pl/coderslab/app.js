var LINK = "http://localhost:8080/books/";
var LINK_AUTHORS = "http://localhost:8080/authors/";
var div = $("#books");
var divAuthors = $("#authors");

getBooks();

function getBooks() {
    $.ajax(LINK).done(function (response) {
        response.forEach(function (item) {
            var newDiv = $("<div>");
            var newH3 = $("<h3>");
            var newButtonDelete = $("<button>").text("Delete").addClass("book" + item.id).addClass("delete");
            var newButtonEdit = $("<button>").text("Edit").addClass("book" + item.id).addClass("edit");
            newDiv.addClass("book" + item.id).addClass("books").attr('data-id', item.id);
            newH3.text(item.title).attr('data-click', "false").attr('data-id', item.id);
            newDiv.append(newH3).append(newButtonEdit).append(newButtonDelete).append($("<div>").hide());
            div.append(newDiv);
        })
    })
}

getAuthors();

function getAuthors() {
    $.ajax(LINK_AUTHORS).done(function (response) {
        response.forEach(function (item) {
            var newOption = $("<option>");
            newOption.attr("value", item.id).text(item.firstName + " " + item.lastName);
            $("#book_author_edit").append(newOption.clone());
            $("#book_author").append(newOption);

            var newDiv = $("<div>");
            var newH3 = $("<h3>");
            var newButtonDelete = $("<button>").text("Delete").addClass("author" + item.id).addClass("delete");
            var newButtonEdit = $("<button>").text("Edit").addClass("author" + item.id).addClass("edit");
            newDiv.addClass("author" + item.id).addClass("authors").attr('data-id', item.id);
            newH3.text(item.firstName + " " + item.lastName).attr('data-click', "false").attr('data-id', item.id);
            newDiv.append(newH3).append(newButtonEdit).append(newButtonDelete).append($("<div>").hide());
            divAuthors.append(newDiv);

        })
    })
}


$("body").on("click", ".books h3", function (event) {
    if (event.target.dataset.click === 'false') {
        $.ajax(LINK + event.target.dataset.id).done(function (res) {
            var newElement = $("<div>");
            newElement.append($("<p>").text("Author: " + res.author.firstName + " " + res.author.lastName));
            newElement.append($("<p>").text("Publisher: " + res.publisher));
            newElement.append($("<p>").text("ISBN: " + res.isbn));
            newElement.append($("<p>").text("Type: " + res.type));
            $(event.target).after(newElement);
            newElement.css("display", "none");
            newElement.slideDown();
            event.target.dataset.click = "true";
        })
    } else {
        $(event.target).parent().find("div").slideUp(800);
        setTimeout(function () {
            $(event.target).parent().find("div").remove()
        }, 800);
        event.target.dataset.click = "false";
    }

});


$("body").on("click", ".authors h3", function (event) {
    if (event.target.dataset.click === 'false') {
        $.ajax(LINK_AUTHORS + event.target.dataset.id).done(function (res) {
            var newElement = $("<div>");
            newElement.append($("<p>").text("Age: " + res.age));
            newElement.append($("<p>").text("Gender: " + res.gender));
            $(event.target).after(newElement);
            newElement.css("display", "none");
            newElement.slideDown();
            event.target.dataset.click = "true";
        })
    } else {
        $(event.target).parent().find("div").slideUp(800);
        setTimeout(function () {
            $(event.target).parent().find("div").remove()
        }, 800);
        event.target.dataset.click = "false";
    }

});


$("body").on("click", ".delete", function (event) {
    if (confirm("Are you sure?")) {
        $(event.target).parent().fadeOut(800);
        setTimeout(function () {
            $(event.target).parent().remove()
        }, 800);
        $.ajax({
            url: LINK + (event.target).closest("div").dataset.id,
            type: 'DELETE'
        })
    }
});


$("#add").click(function (e) {
    var book_author = $("#book_author");
    $.ajax({
        url: LINK_AUTHORS + book_author.val(),
        contentType: 'application/json',
        success: function (data) {
            addBook(data)
        }
    });
    e.preventDefault();
});


function addBook(data) {
    var book_isbn = $("#book_isbn");
    var book_publisher = $("#book_publisher");
    var book_title = $("#book_title");
    var book_type = $("#book_type");
    $.ajax({
        url: LINK,
        type: 'POST',
        data: JSON.stringify({
            author:
                {
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    gender: data.gender,
                    age: data.age
                },
            isbn: book_isbn.val(),
            publisher: book_publisher.val(),
            title: book_title.val(),
            type: book_type.val()

        }),
        contentType: 'application/json'
    }).done(function (item) {
        var newDiv = $("<div>");
        var newH3 = $("<h3>");
        var newButtonDelete = $("<button>").text("Delete").addClass("book" + item.id).addClass("delete");
        var newButtonEdit = $("<button>").text("Edit").addClass("book" + item.id).addClass("edit");
        newDiv.addClass("book" + item.id).addClass("books").attr('data-id', item.id);
        newH3.text(item.title).attr('data-click', "false").attr('data-id', item.id);
        newDiv.append(newH3).append(newButtonEdit).append(newButtonDelete).append($("<div>").hide());
        div.append(newDiv);
        book_isbn.val("");
        book_publisher.val("");
        book_title.val("");
        book_type.val("")
    })

}


$("#addAuthor_button").click(function (e) {
    var author_firstName = $("#author_firstName");
    var author_lastName = $("#author_lastName");
    var author_gender = $("#author_gender");
    var author_age = $("#author_age");
    $.ajax({
        url: LINK_AUTHORS,
        type: 'POST',
        data: JSON.stringify({
            firstName: author_firstName.val(),
            lastName: author_lastName.val(),
            gender: author_gender.val(),
            age: author_age.val()

        }),
        contentType: 'application/json'
    }).done(function (item) {
        console.log()
        var newOption = $("<option>");
        newOption.attr("value", item.id).text(item.firstName + " " + item.lastName);
        $("#book_author").append(newOption);
        $("#book_author_edit").append(newOption);
        author_firstName.val("");
        author_lastName.val("");
        author_age.val("")
    });

    e.preventDefault();
});


$("body").on("click", ".edit", function (event) {
    $("#addBook").hide();
    $("#editBook").show();
    $.ajax(LINK + (event.target).closest("div").dataset.id).done(function (res) {
        var book_author = $("#book_author_edit");
        var book_isbn = $("#book_isbn_edit");
        var book_publisher = $("#book_publisher_edit");
        var book_title = $("#book_title_edit");
        var book_type = $("#book_type_edit");
        var book_id = $("#book_id_edit");
        book_author.val(res.author.id);
        book_isbn.val(res.isbn);
        book_publisher.val(res.publisher);
        book_title.val(res.title);
        book_type.val(res.type);
        book_id.val(res.id);
    })

});


$("#editSubmit").click(function (e) {
    var book_author = $("#book_author_edit");
    $.ajax({
        url: LINK_AUTHORS + book_author.val(),
        contentType: 'application/json',
        success: function (data) {
            editBook(data)
        }
    });
    e.preventDefault();
});


function editBook(data) {
    var book_isbn = $("#book_isbn_edit");
    var book_publisher = $("#book_publisher_edit");
    var book_title = $("#book_title_edit");
    var book_type = $("#book_type_edit");
    $.ajax({
        url: LINK +$("#book_id_edit").val() ,
        type: 'PUT',
        data: JSON.stringify({
            author:
                {
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    gender: data.gender,
                    age: data.age
                },
            isbn: book_isbn.val(),
            publisher: book_publisher.val(),
            title: book_title.val(),
            type: book_type.val()

        }),
        contentType: 'application/json'
    }).done(function (item) {
        $("#addBook").show()
        $("#editBook").hide()
        var editId = $("#book_id_edit").val();
        var editDiv = $("div[data-id=" + editId);
        editDiv.empty();

        var newH3 = $("<h3>");
        var newButtonDelete = $("<button>").text("Delete").addClass("book" + editId).addClass("delete");
        var newButtonEdit = $("<button>").text("Edit").addClass("book" + editId).addClass("edit");
        newH3.text(item.title).attr('data-click', "false").attr('data-id', editId);
        editDiv.append(newH3).append(newButtonEdit).append(newButtonDelete).append($("<div>").hide());

        book_isbn.val("");
        book_publisher.val("");
        book_title.val("");
        book_type.val("");
        $("#book_id_edit").val("")

    })

}
