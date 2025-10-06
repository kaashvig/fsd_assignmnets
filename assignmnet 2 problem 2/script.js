// ======== DOM Manipulation (Plain JavaScript) ========

// 1️ Change Text using innerHTML
function changeText() {
    document.getElementById("para1").innerHTML = "The paragraph text has been updated dynamically!";
}

// 2️ Change CSS properties like color & position
function changeStyle() {
    const para = document.getElementById("para1");
    para.style.color = "white";
    para.style.backgroundColor = "#2575fc";
    para.style.padding = "10px";
    para.style.position = "relative";
    para.style.left = "20px";
}

// 3️ Change Image Source
function changeImage() {
    document.getElementById("myImage").src = "https://picsum.photos/150?random=" + Math.floor(Math.random() * 100);
}

// 4️ Add a Text Node and attach it to parent node
function addNode() {
    const ul = document.getElementById("listContainer");
    const newLi = document.createElement("li");
    const textNode = document.createTextNode("New Item " + (ul.children.length + 1));
    newLi.appendChild(textNode);
    newLi.className = "listItem";
    ul.appendChild(newLi);
}

// 5️ Delete a Node
function deleteNode() {
    const ul = document.getElementById("listContainer");
    if (ul.lastElementChild) {
        ul.removeChild(ul.lastElementChild);
    } else {
        alert("No more items to delete!");
    }
}

// ======== jQuery Operations ========

$(document).ready(function() {

    // 6️ Change button text using jQuery
    $("#jqButton").click(function() {
        $(this).text("Text Changed with jQuery!");
    });

    // 7️⃣ Set background image using jQuery CSS
    $("#bgButton").click(function() {
        $("body").css({
            "background-image": "url('https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1920&q=80')",
            "background-size": "cover",
            "background-repeat": "no-repeat"
        });
    });

    // 8️ Access form data using jQuery
    $("#formBtn").click(function() {
        let name = $("#name").val();
        let email = $("#email").val();

        if (name.trim() === "" || email.trim() === "") {
            $("#formOutput").text("Please enter both name and email.");
            $("#formOutput").css("color", "red");
        } else {
            $("#formOutput").html(`Name: <b>${name}</b> | Email: <b>${email}</b>`);
            $("#formOutput").css("color", "green");
        }
    });
});
