// window.addEventListener('DOMContentLoaded', function () {
//     var whitelogo = document.getElementById('whitelogo');

//     window.addEventListener('mousemove', function (event) {
//         var mouseX = - event.clientX;
//         var mouseY = event.clientY;
//         var distance = mouseX + mouseY
//         var moveX = Math.floor(distance / 40);
//         var moveY = Math.floor(-distance / 40);
//         whitelogo.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
//     });
// });
window.addEventListener('DOMContentLoaded', function () {
    var cyanlogo = document.getElementById('cyanlogo');

    window.addEventListener('mousemove', function (event) {
        var mouseX = - event.clientX;
        var mouseY = event.clientY;
        var distance = mouseX + mouseY
        var moveX = Math.floor(distance / -400);
        var moveY = Math.floor(-distance / -400);
        cyanlogo.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
    });
});
window.addEventListener('DOMContentLoaded', function () {
    var redlogo = document.getElementById('redlogo');

    window.addEventListener('mousemove', function (event) {
        var mouseX = - event.clientX;
        var mouseY = event.clientY;
        var distance = mouseX + mouseY
        var moveX = Math.floor(distance / 400);
        var moveY = Math.floor(-distance / 400);
        redlogo.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
    });
});