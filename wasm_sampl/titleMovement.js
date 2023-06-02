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
    var redlogo = document.getElementById('redlogo');
    window.addEventListener('mousemove', function (event) {
        // var mouseX = - event.clientX - (this.window.innerWidth / 2);
        var mouseY = event.clientY - (this.window.innerHeight / 2);
        var mouseX = event.clientX - (this.window.innerWidth / 2); 
        var moveX = Math.floor(mouseX / -100);
        var moveY = Math.floor(-mouseY / -100);
        cyanlogo.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
        redlogo.style.transform = 'translate(' + -moveX + 'px, ' + -moveY + 'px)';
    });
});
// window.addEventListener('DOMContentLoaded', function () {
//     var redlogo = document.getElementById('redlogo');

//     window.addEventListener('mousemove', function (event) {
//         var mouseX = - event.clientX - (this.window.innerWidth / 2);
//         var mouseY = event.clientY - (this.window.innerHeight / 2);
//         var distance = mouseX + mouseY
//         var moveX = Math.floor(distance / 400);
//         var moveY = Math.floor(-distance / 400);
//         redlogo.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
//     });
// });