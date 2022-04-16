import ImageSlider from "./imageslider";
import SignIn from "./signin-view";
import SignUp from "./signup-view";
import Vanilla from "../vanilla/Vanilla";

const app = {
    methods: {
        showSignUp: function (event) {
            const signupcontent = document.getElementById('signupcontent')
            if (!signupcontent) {
                const content = document.getElementById('content')
                while (content.firstChild) {
                    content.removeChild(content.firstChild);
                }
                Vanilla.render(SignUp, content);
            }
        }
    },
    render: function (createElement) {
        const $context = this;
        return createElement('div', { class: "app_container" }, [
            createElement('div', { attr: { id: 'left' }, class: "relative" }, [
                createElement('div', { attr: { id: 'main' } }, [
                    createElement('div', { attr: { id: 'wrapper' } }, [
                        createElement('div', { attr: { id: 'logo_wrapper' } }, [
                            createElement('div', { attr: { style: { height: "100%", display: "table-cell", "vertical-align": "bottom" } } }, [
                                createElement('img', {
                                    attr: {
                                        width: 120,
                                        height: 120,
                                        src: "https://play-lh.googleusercontent.com/92xIZAW-mdwucFX1v8kyTXlLVgZfLczHv8XCVOH1tFc0M3cTRI4q9qJLUM96PqCrgWjc=s180-rw",
                                        alt: "Logo",
                                        id: "logo"
                                    }
                                })
                            ]),
                        ]),
                        createElement('div', { attr: { id: 'content', style: { display: 'block' } } }, SignIn),
                    ])
                ])
            ]),
            createElement('div', { attr: { id: 'right' }, class: "relative" }, [
                createElement('div', { class: "container" }, [
                    createElement('div', { class: "promo_wrapper" }, [
                        createElement('div', { class: "promo" }, [
                            createElement('h1', { attr: { id: "tryapp" } }, "Try Task Manager for free"),
                            createElement('h3', { attr: { id: "startfree" } }, "Sign up in less than a minute. No contract and no credit card needed."),
                            createElement('a', {
                                attr: { id: "signupbtn" },
                                class: "button btnprimary floatleft",
                                on: {
                                    click: (event) => {
                                        event.preventDefault();
                                        $context.showSignUp(event)
                                    }
                                }
                            }, "Sign Up"),
                        ])
                    ]),
                    ImageSlider
                ])
            ]),
        ])
    }
}

export default app;