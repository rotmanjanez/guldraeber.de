(function (window, document, undefined) {
    let b = 0;

    function B() {
        b++;
        let walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let n;
        while (n = walk.nextNode()) {
            BText(n);
        }
    }

    function BText(node) {
        let regex;
        switch (b) {
            case 0:
                return;
            case 1:
                regex = /\b[bB]/g;
                break;
            case 2:
                regex = /[BDP8]/g;
                break;
        }
        node.textContent = node.textContent.replace(regex, "\ud83c\udd71");
    }

    document.addEventListener('paste', (ev) => {
        let data = ev.clipboardData.getData('text/plain');
        if (data.includes("\ud83c\udd71")) {
            B();
        }
    }, false);
})(window, document);
