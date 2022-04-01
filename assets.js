let fontList = [[
    "万用颜楷", "./fonts/Yanzq.ttf"
],/* [
    "行书体", "./fonts/WHZxingshu.ttf"
]*/];
let backgroundList = ["./assets/bg1.jpg", "./assets/bg2.jpg"];
var NOW_FONT = 0;
function changeBackground(index) {
    $("#bg-img").setAttribute("src", backgroundList[index]);
}
function attachBackgrounds() {
    let form = $("#choose");
    for (var i = 0; i < backgroundList.length; i++) {
        form.innerHTML += `<label class="mdui-radio choose">
                    <input type="radio" name="background" onchange="changeBackground(${i});" ${i == 0 ? "checked" : ""}/>
                    <i class="mdui-radio-icon"></i>
                    <img src="${backgroundList[i]}" width="70px" height="70px">
                </label> `;
    }
}
function loadFont(fontID, callback) {
    if (fontID >= fontList.length) {
        callback();
        return;
    }
    var font = new FontFace(`font-${fontID}`, `url(${fontList[fontID][1]})`);
    font.load().then(font => {
        document.fonts.add(font)
    }).then(() => {
        loadFont(fontID + 1, callback);
    });
}
function addFont() {
    var sel = $("#font-select");
    for (var j = 0; j < fontList.length; j++) {
        sel.innerHTML += `<option value="${j}">${fontList[j][0]}</option>`;
    }
    mdui.mutation();
}
function fontChange() {
    var val = $("#font-select").value;
    NOW_FONT = val;
}
function initResource(callback) {
    attachBackgrounds();
    loadFont(0, callback);
    addFont();
}