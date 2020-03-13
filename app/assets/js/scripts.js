;
"use strict";

function DOMready() {

    function setCookie(name, value, expires, path, domain, secure) {
        document.cookie = name + "=" + escape(value) +
            ((expires) ? "; expires=" + expires : "") +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            ((secure) ? "; secure" : "");
    }

    function getCookie(name) {
        var cookie = " " + document.cookie;
        var search = " " + name + "=";
        var setStr = null;
        var offset = 0;
        var end = 0;
        if (cookie.length > 0) {
            offset = cookie.indexOf(search);
            if (offset != -1) {
                offset += search.length;
                end = cookie.indexOf(";", offset)
                if (end == -1) {
                    end = cookie.length;
                }
                setStr = unescape(cookie.substring(offset, end));
            }
        }
        return (setStr);
    }

    // Рассчет здоровья сная

    if ($("[data-question-form]").length > 0) {

        var questionFormData = [
            {
                "text": "узнай насколько твой сон здоровый"
            },
            {
                "text": "Вы довольны качеством вашего сна?"
            },
            {
                "text": "Ваш день проходит без ощущение сонливости?"
            },
            {
                "text": "Находитесь ли вы в состоянии сна между 2-4 часами ночи?"
            },
            {
                "text": "Вы засыпаете и просыпаетесь менее чем за 30 минут? (Необходимо сложить время засыпания и время просыпания)"
            },
            {
                "text": "Вы спите от 6 до 8 часов в сутки?"
            },
        ];

        var questionFormResultData = [
            {
                "text": "Плохой сон",
                "desc": "1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

            },
            {
                "text": "Средний сон",
                "desc": "2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            {
                "text": "Идеальный сон",
                "desc": "3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
        ];

        var questionFormActiveStep = 0;
        var questionForm = $("[data-question-form]");
        var questionFormWrap = $("[data-question-form-wrap]");
        var questionFormTopText = $("[data-question-form-top-text]");
        var questionFormBottomText = $("[data-question-form-bottom-text]");
        var questionFormBottom = $("[data-question-form-bottom]");
        var questionFormBtn = $("[data-question-form-btn]");
        var questionFormInnerWrap = $("[data-question-form-inner-wrap]");
        var questionFormCenter = $("[data-question-form-center]");
        var questionFormsumPoints = 0;
        var questionFormResult = "";
        var questionFormResultText = "";
        var isEnd = false;

        questionFormTopText.text(questionFormData[0].text);

        function startQuestionForm() {

            if (isEnd === true) {
                questionForm.addClass("hide");
                return;
            }

            var $this = $(this);

            if (questionFormActiveStep === 0) {
                questionForm.removeClass("question-form_mod_" + questionFormActiveStep);

                questionFormInnerWrap.removeClass("hide");

                var btnInnerText = $this.data("question-form-btn");
                var btnText = $this.text();

                $this.text(btnInnerText);
                $this.data("question-form-btn", btnText);
            }

            questionFormActiveStep++;

            if (questionFormActiveStep > 0) {

                var points = questionFormInnerWrap.find("[data-question-form-radio]:checked").data("question-form-radio");
                questionFormsumPoints += +points;

            }

            if (questionFormActiveStep === questionFormData.length) {

                if (questionFormsumPoints <= 4) {
                    questionFormResult = "bad";
                } else if (questionFormsumPoints >= 5 && questionFormsumPoints <= 9) {
                    questionFormResult = "normal";
                } else {
                    questionFormResult = "good";
                }

                switch (questionFormResult) {
                    case "bad":
                        questionFormResultText = questionFormResultData[0];
                        break;
                    case "normal":
                        questionFormResultText = questionFormResultData[1];
                        break;
                    case "good":
                        questionFormResultText = questionFormResultData[2];

                }

                questionFormWrap.addClass("hide");
                questionFormBottom.removeClass("hide");
                questionFormBottomText.text(questionFormResultText.text);
                questionForm.addClass("question-form_mod_" + questionFormResult);

                return;

            }

            questionFormTopText.text(questionFormData[questionFormActiveStep].text);

        }

        questionFormBtn.on("click", function () {
            startQuestionForm.call(this);

        });

        $("[data-question-form-btn-close]").on("click", function () {
            questionForm.addClass("hide");

        });

        $("[data-question-form-link]").on("click", function () {
            questionFormBottom.addClass("hide");
            questionFormWrap.removeClass("hide");
            questionFormTopText.addClass("hide");
            questionFormInnerWrap.addClass("hide");
            questionFormBtn.text("Закрыть");
            questionFormCenter.text(questionFormResultText.desc);
            isEnd = true;
            questionForm.removeClass("question-form_mod_" + questionFormResult);

        });

        var alredyStartedQuestionForm = getCookie("questionFormOpen");

        // Раскомментировать при переносе на сайт
        // if(  alredyStartedQuestionForm !== "true") {

        setTimeout(function () {
            questionForm.removeClass("hide");
            setCookie("questionFormOpen", "true");
        }, 2000);
        // }

    }

}

document.addEventListener("DOMContentLoaded", DOMready);