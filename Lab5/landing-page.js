// JavaScript source code

window.addEventListener("scroll", scrollAppear);

function scrollAppear() {
    var textArray = document.querySelectorAll('.fade-in');

    for(var i = 0; i < textArray.length; i++) {
        var textPosition = textArray[i].getBoundingClientRect().top;
        var screenPosition = window.innerHeight / 1.2;

        if(textPosition < screenPosition) {
            textArray[i].classList.add('text-appear');
        } 
        if(textPosition < 0 || textPosition > screenPosition) {
            textArray[i].classList.remove('text-appear');
        }
    }
}