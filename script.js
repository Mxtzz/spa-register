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
        const pswError = document.querySelector("#passwordError");
        if (isDisplay) {
            pswError.style.display = "";
        } else {
            pswError.style.display = "none";
        }
    }

    static pswTip(isDisplay) {
        const passwordTip = document.querySelector("#passwordTip");
        if (isDisplay) {
            passwordTip.style.display = "";
        } else {
            passwordTip.style.display = "none";
        }
    }

    static userNameCheck(val) {
        return /^[\u4e00-\u9fa5]{1,7}$|^[\dA-Za-z_]{1,14}$/.test(val);
    }

    static phoneCheck(val) {
        return /^1[3456789]\d{9}$/.test(val);
    }

    static pswCheck(val) {
        if (val && /^(?=.*[A-Za-z])(?=.*[$@$!%*#?&.,])[A-Za-z\d$@$!%*#?&.,]{8,14}$/.test(val)) {
            return true;
        } else if (val && /^(?=.*\d)(?=.*[$@$!%*#?&.,])[\d$@$!%*#?&.,]{8,14}$/.test(val)) {
            return true;
        } else if (val && /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,14}$/.test(val)) {
            return true;
        } else {
            return false;
        }
    }
}

class Main {
    constructor() {
        this.sendTimer = 5;
        this.sendTimerInterval = null;
        this.isUserName = false;
        this.isPhone = false;
        this.isPsw = false;
        this.isVerifyCode = false;
        this.isAgree = false;
    }

    initMain() {
        const me = this;
        console.log("hello");

        const userNameInput = document.querySelector("#userName");
        userNameInput.addEventListener("focus", () => {
            Register.userNameTip(true);
        });
        userNameInput.addEventListener("blur", () => {
            if (Register.userNameCheck(userNameInput.value)) {
                Register.userNameSucc(true);
                me.isUserName = true;
            } else {
                Register.userNameSucc(false);
                me.isUserName = false;
            }
            Register.userNameTip(false);
            me.submitCheck()
        });

        const phoneInput = document.querySelector("#phone");
        phoneInput.addEventListener("blur", () => {
            if (phoneInput.value && Register.phoneCheck(phoneInput.value)) {
                Register.phoneError(false);
                me.isPhone = true;
            } else if (phoneInput.value) {
                Register.phoneError(true);
                me.isPhone = false;
            }
            me.submitCheck()
        });

        const pswInput = document.querySelector("#password");
        pswInput.addEventListener("focus", () => {
            Register.pswTip(true);
        });
        pswInput.addEventListener("blur", () => {
            Register.pswTip(false);
            if (Register.pswCheck(pswInput.value)) {
                Register.pswError(false);
                me.isPsw = true;
            } else {
                Register.pswError(true);
                me.isPsw = false;
            }
            me.submitCheck()
        });

        document.querySelector("#verifyCodeSend").addEventListener("click", () => {
            me.verifyCodeSend();
        });

        const verifyCodeInput = document.querySelector("#verifyCode");
        verifyCodeInput.addEventListener("focus", () => {

        });
        verifyCodeInput.addEventListener("blur", () => {
            if (verifyCodeInput.value) {
                me.isVerifyCode = true;
            } else {
                me.isVerifyCode = false;
            }
            me.submitCheck()
        });

        document.querySelector("#submit").addEventListener("click", () => {
            me.submit();
        });

        const isAgreeInput = document.querySelector("#isAgree");
        isAgreeInput.addEventListener("click", () => {
            if (isAgreeInput.checked) {
                me.isAgree = true;
            } else {
                me.isAgree = false;
            }
            me.submitCheck();
        });
    }

    verifyCodeSend() {
        const me = this;
        const sendBtn = document.querySelector("#verifyCodeSend");
        const phoneInput = document.querySelector("#phone");
        const pswInput = document.querySelector("#password");
        const phoneNum = phoneInput.value;
        const psw = pswInput.value;

        if (phoneNum && !me.sendTimerInterval) {
            sendBtn.style.color = "#aaa";

            sendBtn.value = `获取验证码(${me.sendTimer})`;
            me.sendTimerInterval = setInterval(() => {
                if (me.sendTimer > 0) {
                    sendBtn.value = `获取验证码(${me.sendTimer - 1})`;
                    me.sendTimer -= 1;
                }

                if (me.sendTimer == 0) {
                    me.sendTimer = 5;
                    sendBtn.value = `获取验证码`;
                    sendBtn.style.color = "#333";
                    clearInterval(me.sendTimerInterval);
                    me.sendTimerInterval = null;
                }
                
            }, 1000);
        } else if (!phoneNum) {
            Register.phoneError(true);
        }
    }

    submit() {
        const me = this;
        
        if (me.submitCheck()) {
            alert("Register success!");
        } else {
            alert("Failed!");
        }
    }

    submitCheck() {
        const me = this;
        if (me.isAgree && me.isPhone && me.isPsw && me.isVerifyCode && me.isUserName) {
            document.querySelector("#submit").style.backgroundColor = "#6666ff";
            return true;
        }
        document.querySelector("#submit").style.backgroundColor = "#BDCEFC";
        return false;
    }
}

window.onload = () => {
    const myMain = new Main();
    myMain.initMain();
}