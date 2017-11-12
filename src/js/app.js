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
    if (event.clientX != 0 || event.clientY != 0) {
        var div = document.createElement("div");
        div.style.top = event.clientY+"px";
        div.style.left = event.clientX+"px";
        div.setAttribute('class', 'drop');
        document.body.appendChild(div);
        setTimeout(function(){
            div.parentNode.removeChild(div);
        }, 2000);    
    }
}
document.addEventListener("click", printMousePos);
