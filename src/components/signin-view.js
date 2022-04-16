import iaxios from '../vanilla/axios';
import mask from './mask';
import SignUp from './signup-view';
import ForgotPwd from './forgotpassword-view'
import Vanilla from '../vanilla/Vanilla';

const states = {};

export default {
    data: {
        username: "",
        password: ""
    },
    methods: {
        submit: async function (event) {
            const formmesssage = document.getElementById('formmesssage')
            formmesssage.style.display = 'none';
            formmesssage.classList.remove('error-message')
            formmesssage.textContent = ''

            const content = document.getElementById('content')
            const signinform = document.getElementById('signinform')
            const { username, password } = signinform.elements
            const isValid = signinform.reportValidity()
            if (isValid) {
                mask.showMask(content)
                const data = {
                    "username": username.value,
                    "password": password.value
                }
                try {
                    const response = await iaxios.post('/api/v1/signin', data)
                    if (response.status == 200 && response.data && response.data.status == 'success') {
                        mask.hideMask()
                        const result = response.data.result
                        states['authToken'] = result.access_token
                        states['refreshToken'] = result.refesh_token
                        location.pathname = '/taskmanager-ui/src/views/board.html'
                        history.pushState({ username: data.username, login: 'success' }, 'Login', location.href)
                    }
                } catch (error) {
                    formmesssage.style.display = 'block'
                    formmesssage.textContent = error?.response?.data?.error || 'Error Signing In. Please try again later'
                    formmesssage.classList.add('error-message')
                }
                mask.hideMask()
            }
        },
        showSignUp: function (event) {
            const content = document.getElementById('content')
            while (content.firstChild) {
                content.removeChild(content.firstChild);
            }
            const signupcontent = document.getElementById('signupcontent')
            if (!signupcontent) {
                Vanilla.render(SignUp, content);
            }
        },
        showForgotPwd: function (event) {
            const content = document.getElementById('content')
            while (content.firstChild) {
                content.removeChild(content.firstChild);
            }
            const forgotpwdcontent = document.getElementById('forgotpwdcontent')
            if (!forgotpwdcontent) {
                Vanilla.render(ForgotPwd, content);
            }
        }
    },
    render: function (createElement) {
        const $context = this;
        return createElement('div', { attr: { id: "signincontent" }, class: ["animated", "fadeInLeft"] }, [
            createElement('h3', { attr: { id: "title" } }, ['Sign In']),
            createElement('div', { attr: { id: "signinform_wrapper" } }, [
                createElement('div', { attr: { id: "formmesssage" } }),
                createElement('form', { attr: { id: "signinform", "aria-autocomplete": "none", "autocomplete": "off" } }, [
                    createElement('div', { class: ["form-inputgroup"] }, [
                        createElement('label', { attr: { for: "username" }, class: ["form-label"] }, ["Username / Email"]),
                        createElement('input', { attr: { id: "username", type: "text", required: true, placeholder: "Username / Email" }, class: ["form-input"] })
                    ]),
                    createElement('div', { class: ["form-inputgroup"] }, [
                        createElement('label', { attr: { for: "password" }, class: ["form-label"] }, ["Password"]),
                        createElement('input', { attr: { id: "password", type: "password", required: true, placeholder: "Password" }, class: ["form-input"] })
                    ]),
                    createElement('input', {
                        attr: { id: "Signin", type: "button", value: "Sign In", "autocomplete": "off" },
                        class: ["w100", "button", "btnprimary"], on: {
                            click: (event) => $context.submit(event)
                        }
                    })
                ])
            ]),
            createElement('div', { class: ["links"] }, [
                createElement('a', {
                    attr: { href: "javascript:void(0)", id: "signupuser" },
                    class: ["floatleft"],
                    on: {
                        click: (event) => {
                            event.preventDefault();
                            $context.showSignUp(event);
                        }
                    }
                }, "Don't have an account? Sign Up"),
                createElement('a', {
                    attr: { href: "javascript:void(0)", id: "forgotpwd" },
                    class: ["floatright"],
                    on: {
                        click: (event) => {
                            event.preventDefault();
                            $context.showForgotPwd(event);
                        }
                    }
                }, "Forgot Password?"),
            ]),
        ]);
    }
}