// ش
// if (localStorage.getItem("icon") !== null) {
//     iconElement.classList = "";
//     iconElement.classList.add(localStorage.getItem("icon"));
// }

// iconElement.addEventListener("click", function (e) {
//     e.preventDefault();
//     if (rootElement.classList.contains("dark")) {
//         rootElement.classList.remove("dark");
//         rootElement.classList.add("light");
//         iconElement.classList = "";
//         iconElement.classList.add("far", "fa-sun");
//         localStorage.setItem("theme", "light");
//     } else {
//         rootElement.classList.remove("light");
//         rootElement.classList.add("dark");
//         iconElement.classList = "";
//         iconElement.classList.add("fas", "fa-moon");
//         localStorage.setItem("theme", "dark");
//     }
// });

//select element from html
let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");

let upload = document.getElementById("upload");
let download = document.getElementById("download");
let imageBox = document.querySelector(".image-box");
let Reset = document.querySelector("span");
let img = document.getElementById("img");

let text = document.getElementById("text");
let btn = document.getElementById("btn");
let size = document.getElementById("size");
let x = document.getElementById("x");
let y = document.getElementById("y");
let edit = document.getElementById("edit");
let editInImage = document.getElementById("editInImage");
let color = document.getElementById("color");

// canvas
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 500;
window.onload = function () {
    download.style.display = "none";
    Reset.style.display = "none";
    imageBox.style.display = "none";
};

//reset values to filter
function resetFilterValue() {
    imageBox.style.display = "none";
    saturate.value = "100";
    contrast.value = "100";
    brightness.value = "100";
    sepia.value = "0";
    grayscale.value = "0";
    blur.value = "0";
    hueRotate.value = "0";
}

upload.onchange = function () {
    download.style.display = "block";
    Reset.style.display = "block";
    imageBox.style.display = "block";
    //upload photo from class filereader
    let file = new FileReader();
    if (upload.files.length > 0) {
        file.readAsDataURL(upload.files[0]);
    }
    file.onload = function () {
        img.src = file.result;
    };
    // draw image
    img.onload = function () {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        img.style.display = "none";
    };
    saturate.value = "100";
    contrast.value = "100";
    brightness.value = "100";
    sepia.value = "0";
    grayscale.value = "0";
    blur.value = "0";
    hueRotate.value = "0";
};

// lw 3mlt kol click lwa7dh msh hynf3 34an htl8y ma3ya kol ma a5tar filter tany
// 3ashan keda b5znhm fe variable w b3ml 3lehm loop
let filters = document.querySelectorAll("ul li input");
filters.forEach((filter) => {
    filter.addEventListener("input", function () {
        context.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
        `;
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    });
});

function createText(color, size, text, x, y) {
    context.fillStyle = color;
    context.font = size + "px Cairo";
    context.fillText(text, x, y);
}
edit.onclick = function () {
    editInImage.style.display = "block";
    btn.addEventListener("click", function () {
        let x_ = x.value;
        let y_ = y.value;
        let size_ = size.value;
        let txt = text.value;
        let coloor = color.value;
        console.log(txt);
        if (
            x.value != "" &&
            y.value != "" &&
            size.value != "" &&
            text.value != "" &&
            color.value != ""
        ) {
            createText(coloor, size_, txt, x_, y_);
            x.value = y.value = size.value = text.value = color.value = "";
        } else {
            alert("please add value");
        }
    });
};

// download photo
download.onclick = function () {
    download.href = canvas.toDataURL("jpg");
};
