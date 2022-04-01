/* 
    SpringFestivalCoupletGenerator v1.0.0
    By XHG78999
    Copyright XHG78999 2019-2022 All right reserved.
*/
var load = false;
//Selector. NOT same as JQuery!
function $(pth) {
    return document.querySelector(pth);
}
function reloadShow() {
    /* Calcuting for scale */
    let show = $(".show");
    let showParent = $(".show-parent");
    let scale = showParent.offsetWidth / show.clientWidth;
    show.style.transform = `translate(${(1 - scale) * -52}%,${(1 - scale) * -47}%) scale(${scale})`;
    showParent.style.height = (showParent.offsetHeight * scale).toString() + "px";
}
function drawHorizontal(cva, nam) {
    /* Draw Canvas (Horizontal) */
    cva.setAttribute("width", (200 * nam.length).toString() + "px");
    cva.setAttribute("height", "200px");
    var ctx = cva.getContext("2d");
    // Draw background
    let bg = $("#bg-img");
    for (var i = 0; i < nam.length; i++) {
        ctx.drawImage(bg, 200 * i, 0);
    }
    // Draw text
    nam = traditionalized(nam);
    ctx.font = `140px font-${NOW_FONT}`;
    for (var i = 0; i < nam.length; i++) {
        ctx.fillText(nam[i], 200 * i + 30, 140);
    }
}
function drawPortrait(cva, nam) {
    /* Draw Canvas (Portrait) */
    cva.setAttribute("width", "200px");
    cva.setAttribute("height", (200 * nam.length).toString() + "px");
    var ctx = cva.getContext("2d");
    // Draw background
    let bg = $("#bg-img");
    for (var i = 0; i < nam.length; i++) {
        ctx.drawImage(bg, 0, 200 * i);
    }
    // Draw text
    nam = traditionalized(nam);
    ctx.font = `140px font-${NOW_FONT}`;
    for (var i = 0; i < nam.length; i++) {
        ctx.fillText(nam[i], 30, 200 * i + 143);
    }
    reloadShow();
}
function validate() {
    /* Validate for input field */
    function values() {
        return [$("#pi").value, $("#shang").value, $("#xia").value]
    }
    let textpi = $("#outer-pi");
    let textshang = $("#outer-shang");
    let textxia = $("#outer-xia");
    let val = values();
    var flg = true;
    if ((val[0].match(/[\u4e00-\u9fa5]+/i) == null ? true : val[0].match(/[\u4e00-\u9fa5]+/i)[0].length != val[0].length)) {
        textpi.classList.add("mdui-textfield-invalid");
        flg = false;
    } else {
        textpi.classList.remove("mdui-textfield-invalid");
    }
    if ((val[1].match(/[\u4e00-\u9fa5]+/i) == null ? true : val[1].match(/[\u4e00-\u9fa5]+/i)[0].length != val[1].length) || val[1].length != val[2].length || val[1].length == 0) {
        textshang.classList.add("mdui-textfield-invalid");
        flg = false;
    } else {
        textshang.classList.remove("mdui-textfield-invalid");
    }
    if ((val[2].match(/[\u4e00-\u9fa5]+/i) == null ? true : val[2].match(/[\u4e00-\u9fa5]+/i)[0].length != val[2].length) || val[1].length != val[2].length || val[2].length == 0) {
        textxia.classList.add("mdui-textfield-invalid");
        flg = false;
    } else {
        textxia.classList.remove("mdui-textfield-invalid");
    }
    return flg;
}
function generate() {
    /* Generate Main */
    function values() {
        return [$("#pi").value, $("#shang").value, $("#xia").value]
    }
    if (load) {
        if (validate()) {
            let cvpi = $("#cv-pi");
            let cvshang = $("#cv-shang");
            let cvxia = $("#cv-xia");
            let val = values();
            if ($("#rtl").checked == true) {
                val[0] = val[0].split('').reverse().join('');
            }
            drawHorizontal(cvpi, val[0]);
            drawPortrait(cvshang, val[1]);
            drawPortrait(cvxia, val[2]);
        }
    }
}
function download(cva, type) {
    /* Download */
    var typelist = ["hengpi", "shanglian", "xialian"]
    var a = document.createElement("a");
    a.download = typelist[type];
    a.href = cva.toDataURL("image/png");
    a.click();
}
/* Initalize */
window.onload = (() => {
    initResource(() => {
        window.load = true;
        //new mdui.Select($("#font-select"), {});
        generate();
    });
});