import addtasksbro from '../images/addtasks-bro.svg';
import completed from '../images/completed.svg';
import inprogressbro from '../images/inprogress-bro.svg';
import kanbanboard from '../images/kanbanboard.svg';

export default {
    data: {
        images: [addtasksbro, completed, inprogressbro, kanbanboard],
        slideTimerRef: undefined,
        slideIndex: 1,
        interval: 5000
    },
    methods: {
        showPrevSlide: function () {
            this.showSlide(this.slideIndex += -1);
        },
        showNextSlide: function () {
            this.showSlide(this.slideIndex += 1);
        },
        showSlide: function (index = this.slideIndex) {
            let slides = document.getElementsByClassName('slides');
            if (slides.length) {
                if (index > slides.length) { this.slideIndex = 1 }
                if (index < 1) { this.slideIndex = slides.length }
                for (let i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }
                slides[this.slideIndex - 1].style.display = "inline";
            }
        }
    },
    mounted: function () {
        this.showSlide();
        clearInterval(this.slideTimerRef);
        this.slideTimerRef = setInterval(() => { this.showNextSlide() }, this.interval || 5000);
    },
    render: function (createElement) {
        const $context = this;
        return createElement('div', { attr: { id: "image_slider" }, class: "slideshow-container relative" }, [
            this.images && this.images.map((img) => {
                return createElement('img', {
                    attr: { src: img, }, class: "slides fade"
                }, [])
            }),
            createElement('a', { attr: { id: 'prev' }, on: { click: () => $context.showPrevSlide() } }, '❮'),
            createElement('a', { attr: { id: 'next' }, on: { click: () => $context.showNextSlide() } }, '❯')
        ])
    }
}