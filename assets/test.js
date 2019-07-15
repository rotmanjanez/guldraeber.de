(function () {
    function removeElement(elem) {
        elem.parentNode.removeChild(elem);
    }

    let untr, filz, andi;

    function lie(elem) {
        const text = "Das ist eine Lüge" + (andi ? ", Andi!" : "!") + " Fang von vorne an.";
        elem.innerHTML = '<h3>' + text + '</h3><button id="reload">Na gut.</button>';
        elem.querySelector('button').addEventListener('click', clickHandler);
    }

    function removeQuestion(elem) {
        elem.addEventListener('transitionend', function () {
            elem.classList.remove('visible');
            elem.nextElementSibling.classList.add('visible');
            setTimeout(function () {
                elem.nextElementSibling.classList.add('active')
            });
        });
        elem.classList.remove('active');
    }

    removeElement(document.getElementById('js-prompt'));
    document.getElementById('qstart').classList.add('visible', 'active');

    function resultAnimation() {
        var resultHeader = document.querySelector('#preresult h3');
        var numberOfDots = 0;

        if (andi || (untr && filz)) {
            // Positiver Test
            removeElement(document.getElementById('result-neg'));
        } else {
            // Negativer Test
            removeElement(document.getElementById('result-pos'));
        }

        function changeDots() {
            numberOfDots++;
            numberOfDots %= 4;
            resultHeader.innerText = "Ergebnis wird berechnet" + ' . '.repeat(numberOfDots);
        }

        var intervalId = setInterval(changeDots, 400);
        setTimeout(function () {
            clearInterval(intervalId);
            resultHeader.innerText = "Fertig!";
            document.querySelector("#preresult button").style.display = 'block';
        }, 4000);
    }

    function clickHandler() {
        switch (this.id) {
            default:
                break;
            case 'ja-untr':
                untr = true;
                break;
            case 'nein-untr':
                untr = false;
                if (andi) {
                    lie(this.parentNode);
                    return;
                }
                break;
            case 'ja-filz':
                filz = true;
                resultAnimation();
                break;
            case 'nein-filz':
                filz = false;
                if (untr) {
                    lie(this.parentNode);
                    return;
                }
                resultAnimation();
                break;
            case 'ja-andi':
                andi = true;
                break;
            case 'nein-andi':
                andi = false;
                break;
            case 'reload':
                console.log("reload");
                location.reload(false);
                return;
        }
        removeQuestion(this.parentNode);
    }

    document.querySelectorAll('.question button').forEach(function (button) {
        button.addEventListener('click', clickHandler, false);
    });
})();
