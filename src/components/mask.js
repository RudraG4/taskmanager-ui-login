
const template = `<div id="load-mask"><div class="circle-spinner"></div></div>`;
var timerRef;

export default {
    showMask: function (target) {
        if (target) {
            target.insertAdjacentHTML('beforeend', template)
            timerRef = setTimeout(this.hideMask, 5000)
        }
    },
    hideMask: function () {
        clearTimeout(timerRef)
        const mask = document.getElementById("load-mask")
        if (mask) {
            mask.remove()
        }
    }
};