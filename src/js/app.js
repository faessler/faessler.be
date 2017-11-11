// ************************************************************************** //
//  ╦╔═╗╔╗╔  ╔═╗╔═╗╔═╗╔═╗╔═╗╦  ╔═╗╦═╗
//  ║╠═╣║║║  ╠╣ ╠═╣║╣ ╚═╗╚═╗║  ║╣ ╠╦╝
// ╚╝╩ ╩╝╚╝  ╚  ╩ ╩╚═╝╚═╝╚═╝╩═╝╚═╝╩╚═
//
// AUTH: Jan Fässler
// MAIL: jan@faessler.be
// COPY: © 2017
// ************************************************************************** //


// ********************************** //
// DROP EFFECT
// ********************************** //
function printMousePos(event) {
    var div = document.createElement("div");
    div.style.top = event.clientY+"px";
    div.style.left = event.clientX+"px";
    div.setAttribute('class', 'drop');
    document.body.appendChild(div);
}
document.addEventListener("click", printMousePos);
