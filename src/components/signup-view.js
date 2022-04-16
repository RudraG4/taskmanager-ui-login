import iaxios from "../vanilla/axios";
import mask from "./mask";
import SignIn from "./signin-view";
import Vanilla from "../vanilla/Vanilla";

export default {
    data: {

    },
    methods: {
        submit: async function (event) {
            const formmesssage = document.getElementById('formmesssage')
            formmesssage.style.display = 'none';
            formmesssage.classList.remove('error-message')
            formmesssage.textContent = '';

            const content = document.getElementById('content')
            const signupform = document.getElementById('signupform')
            const { username, password, fullname, email } = signupform.elements
            const isValid = signupform.reportValidity()
            if (isValid) {
                mask.showMask(content)
                const data = {
                    "username": username.value,
                    "password": password.value,
                    "fullname": fullname.value,
                    "email": email.value
                }
                try {
                    const response = await iaxios.post('/api/v1/signup', data)
                    if (response.status == 201 && response.data && response.data.status == 'success') {
                        mask.hideMask()
                        formmesssage.style.display = 'block';
                        formmesssage.textContent = 'Sign Up Sucessfull';
                        signupform.style.display = 'none'
                        setTimeout(showSignInFrame, 1000)
                    }
                } catch (error) {
                    formmesssage.style.display = 'block'
                    formmesssage.textContent =  error && error.response && error.response.data && error.response.data.error || 'Error Signing Up. Please try again later'
                    formmesssage.classList.add('error-message')
                }
                mask.hideMask()
            }
        },
        showSignIn: function (event) {
            const content = document.getElementById('content')
            while (content.firstChild) {
                content.removeChild(content.firstChild);
            }
            const signincontent = document.getElementById('signincontent')
            if (!signincontent) {
                Vanilla.render(SignIn, content);
            }
        }
    },
    render: function (createElement) {
        const $context = this;
        return createElement('div', { attr: { id: "signupcontent" }, class: ["animated", "fadeInLeft"] }, [
            createElement('div', { attr: { id: "signupform_wrapper" } }, [
                createElement('div', { attr: { id: "tosignin_wrapper" } }, [
                    createElement('div', { attr: { style: { "display": "flex" } } }, [
                        createElement('div', {
                            attr: { id: "tosignin" },
                            on: {
                                click: (event) => {
                                    $context.showSignIn(event);
                                }
                            }
                        }, "Sign In")
                    ]),
                    createElement('p', "Sign Up")
                ]),
                createElement('div', { attr: { id: "formmesssage" } }),
                createElement('form', { attr: { id: "signupform", "aria-autocomplete": "none", "autocomplete": "off" } }, [
                    createElement('div', { class: ["form-inputgroup"] }, [
                        createElement('label', { attr: { for: "fullname" }, class: ["form-label"] }, ["Full Name"]),
                        createElement('input', { attr: { id: "fullname", type: "text", required: true, placeholder: "John Doe" }, class: ["form-input"] })
                    ]),
                    createElement('div', { class: ["form-inputgroup"] }, [
                        createElement('label', { attr: { for: "email" }, class: ["form-label"] }, ["Email"]),
                        createElement('input', { attr: { id: "email", type: "email", required: true, placeholder: "johndoe@xyz.com" }, class: ["form-input"] })
                    ]),
                    createElement('div', { class: ["form-inputgroup"] }, [
                        createElement('label', { attr: { for: "username" }, class: ["form-label"] }, ["User Name"]),
                        createElement('input', { attr: { id: "username", type: "text", required: true, placeholder: "im_johndoe" }, class: ["form-input"] })
                    ]),
                    createElement('div', { class: ["form-inputgroup"] }, [
                        createElement('label', { attr: { for: "password" }, class: ["form-label"] }, ["Password"]),
                        createElement('input', { attr: { id: "password", type: "password", required: true, placeholder: "Password" }, class: ["form-input"] })
                    ]),
                    createElement('input', {
                        attr: { id: "Signup", type: "button", value: "Sign Up", "autocomplete": "off" },
                        class: ["w100", "button", "btnprimary"], on: {
                            click: (event) => $context.submit(event)
                        }
                    })
                ])
            ])
        ]);
    }
}