class Register {
    static userNameTip(isDisplay) {
        const userNameTip = document.querySelector("#userNameTip");
        if (isDisplay) {
            userNameTip.style.display = "";
        } else {
            userNameTip.style.display = "none";
        }
    }

    static userNameSucc(isDisplay) {
        const userNameSucc = document.querySelector("#userNameSucc");
        if (isDisplay) {
            userNameSucc.style.display = "";
        } else {
            userNameSucc.style.display = "none";
        }
    }

    static phoneError(isDisplay) {
        const phoneError = document.querySelector("#phoneError");
        if (isDisplay) {
            phoneError.style.display = "";
        } else {
            phoneError.style.display = "none";
        }
    }

    static pswError(isDisplay) {

    }

    static pswTip(isDisplay) {
        const passwordTip = document.querySelector("#passwordTip");
        if (isDisplay) {
            passwordTip.style.display = "";
        } else {
            passwordTip.style.display = "none";
        }
    }

    static verifyCodeError(isDisplay) {

    }

    static userNameCheck(val) {
        return /^[\u4e00-\u9fa5]{1,7}$|^[\dA-Za-z_]{1,14}$/.test(val);
    }

    static phoneCheck(val) {
        return /^1[3456789]\d{9}$/.test(val);
    }
}

class Main {
    constructor() {

    }

    initMain() {
        const me = this;
        console.log("hello");

        const userNameInput = document.querySelector("#userName");
        userNameInput.addEventListener("focus", () => {
            Register.userNameTip(true);
        });
        userNameInput.addEventListener("blur", () => {
            if (Register.phoneCheck(userNameInput.value)) {
                Register.userNameSucc(true);
            } else {
                Register.userNameSucc(false);
            }
            Register.userNameTip(false);
        });

        const phoneInput = document.querySelector("#phone");
        phoneInput.addEventListener("blur", () => {
            if (phoneInput.value && Register.phoneCheck(phoneInput.value)) {
                Register.phoneError(false);
            } else if (phoneInput.value) {
                Register.phoneError(true);
            }
        });

        document.querySelector("#password").addEventListener("focus", () => {
            Register.pswTip(true);
        });
        document.querySelector("#password").addEventListener("blur", () => {
            Register.pswTip(false);
        });

        document.querySelector("#verifyCodeSend").addEventListener("click", () => {
            me.verifyCodeSend();
        });
    }

    verifyCodeSend() {
        const me = this;
        const phoneInput = document.querySelector("#phone");
        const pswInput = document.querySelector("#password");
        const phoneNum = phoneInput.value;
        const psw = pswInput.value;

        if (phoneNum && psw) {
            
        }
    }
}

window.onload = () => {
    const myMain = new Main();
    myMain.initMain();
}