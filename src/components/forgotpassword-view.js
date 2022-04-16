import iaxios from "../vanilla/axios";
import mask from "./mask";
import SignIn from "./signin-view";
import Vanilla from "../vanilla/Vanilla";

export default {
    data: {

    },
    methods: {
        submitForgotPwd: async function (event) {
            const formmesssage = document.getElementById('formmesssage')
            formmesssage.style.display = 'none';
            formmesssage.classList.remove('error-message')
            formmesssage.textContent = '';

            const content = document.getElementById('content')
            const forgotpwdform = document.getElementById('forgotpwdform')
            const resetpwdform = document.getElementById('resetpwdform')
            const { username } = forgotpwdform.elements
            const isValid = forgotpwdform.reportValidity()
            if (isValid) {
                mask.showMask(content)
                const data = {
                    "username": username.value
                }
                try {
                    const response = await iaxios.post('/api/v1/forgetpwd', data)
                    if (response.status == 200 && response.data && response.data.status == 'success') {
                        mask.hideMask()
                        formmesssage.style.display = 'block';
                        formmesssage.textContent = 'Please check your email for a password reset key to complete the reset.';
                        forgotpwdform.style.display = 'none'
                        resetpwdform.style.display = 'block'
                    }
                } catch (error) {
                    formmesssage.style.display = 'block'
                    formmesssage.textContent = error?.response?.data?.error || 'Error intiating Reset Password. Please try again later'
                    formmesssage.classList.add('error-message')
                }
                mask.hideMask()
            }
        },
        submitResetPwd: async (event) => {
            const formmesssage = document.getElementById('formmesssage')
            const content = document.getElementById('content')
            const resetpwdform = document.getElementById('resetpwdform')
            const { resetkey, newpassword, confirmpassword } = resetpwdform.elements
            const isValid = resetpwdform.reportValidity()
            if (isValid) {
                if (newpassword.value != confirmpassword.value) {
                    formmesssage.style.display = 'block';
                    formmesssage.classList.add('error-message')
                    formmesssage.textContent = 'Confirm Password does not match New Password';
                    return
                }
                mask.showMask(content)
                const data = {
                    resetkey: resetkey.value,
                    newpassword: newpassword.value
                }
                try {
                    const response = await iaxios.post('/api/v1/resetpwd', data)
                    if (response.status == 200 && response.data && response.data.status == 'success') {
                        mask.hideMask()
                        formmesssage.style.display = 'block';
                        formmesssage.classList.remove('error-message')
                        formmesssage.textContent = response.data.result;
                        resetpwdform.style.display = 'none';
                        setTimeout(() => Vanilla.render(SignIn, content), 1000)
                    }
                } catch (error) {
                    formmesssage.style.display = 'block'
                    formmesssage.textContent = error?.response?.data?.error || 'Error resetting Password. Please try again later'
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
        },
        showResetPwd: function (event) {
            const formmesssage = document.getElementById('formmesssage')
            formmesssage.style.display = 'none';
            formmesssage.classList.remove('error-message')
            formmesssage.textContent = '';

            const forgotpwdform = document.getElementById('forgotpwdform')
            const resetpwdform = document.getElementById('resetpwdform')
            forgotpwdform.style.display = 'none';
            resetpwdform.style.display = 'block'
        }
    },
    render: function (createElement) {
        const $context = this;
        return createElement('div', { attr: { id: "forgotpwdcontent" }, class: ["animated", "fadeInLeft"] }, [
            createElement('div', { attr: { id: "forgotpwdform_wrapper" } }, [
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
                createElement('form', { attr: { id: "forgotpwdform", "aria-autocomplete": "none", "autocomplete": "off" }, class: "animated" }, [
                    createElement('div', { class: ["form-inputgroup"] }, [
                        createElement('label', { attr: { for: "username" }, class: ["form-label"] }, ["Username / Email"]),
                        createElement('input', { attr: { id: "username", type: "text", required: true, placeholder: "Username / Email" }, class: ["form-input"] })
                    ]),
                    createElement('input', {
                        attr: { id: "Forgotpwd", type: "button", value: "Continue", "autocomplete": "off" },
                        class: ["w100", "button", "btnprimary"], on: {
                            click: (event) => $context.submitForgotPwd(event)
                        }
                    }),
                    createElement('div', { class: ["links"] }, [
                        createElement('a', {
                            attr: { href: "javascript:void(0)", id: "byresetkey" },
                            class: ["floatleft"],
                            on: {
                                click: (event) => {
                                    event.preventDefault();
                                    $context.showResetPwd(event);
                                }
                            }
                        }, "I have Password Reset Key")
                    ]),
                ]),
                createElement('form', { attr: { id: "resetpwdform", "aria-autocomplete": "none", "autocomplete": "off", style: { display: "none" } }, class: "animated fadeInRight" }, [
                    createElement('div', { class: ["form-inputgroup"] }, [
                        createElement('label', { attr: { for: "resetkey" }, class: ["form-label"] }, ["Password Reset Key"]),
                        createElement('input', { attr: { id: "resetkey", type: "text", required: true, placeholder: "Enter reset key" }, class: ["form-input"] })
                    ]),
                    createElement('div', { class: ["form-inputgroup"] }, [
                        createElement('label', { attr: { for: "newpassword" }, class: ["form-label"] }, ["New Password"]),
                        createElement('input', { attr: { id: "newpassword", type: "password", required: true, placeholder: "New Password" }, class: ["form-input"] })
                    ]),
                    createElement('div', { class: ["form-inputgroup"] }, [
                        createElement('label', { attr: { for: "confirmpassword" }, class: ["form-label"] }, ["Confirm Password"]),
                        createElement('input', { attr: { id: "confirmpassword", type: "password", required: true, placeholder: "Confirm Password" }, class: ["form-input"] })
                    ]),
                    createElement('input', {
                        attr: { id: "Resetpwd", type: "button", value: "Reset Password", "autocomplete": "off" },
                        class: ["w100", "button", "btnprimary"], on: {
                            click: (event) => $context.submitResetPwd(event)
                        }
                    })
                ])
            ])
        ]);
    }
}