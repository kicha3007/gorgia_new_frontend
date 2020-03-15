;
"use strict";

function DOMready() {

    // Глобальные настройки
    var globParam = (function () {
        var sizes = {
            DESKTOP: "1280",
            LAPTOP: "991",
            TABLETS: "768",
            PHONES: "575"
        };

        return {
            getMediaSize: function () {
                return sizes;
            },
            windowWidth: function () {
                return $(window).width();
            }
        }

    })();

    // Аккордеон
    var accordeonBase = (function () {

        return {
            start: function (e, showItem, callback) {


                e.preventDefault();
                var $this = $(this),
                    accordItems = $(e.delegateTarget).find("[data-accord-item]"),
                    $thisItem = $this.closest("[data-accord-item]");

                accordItems.not($thisItem).removeClass("active");
                accordItems.find("[data-accord-toggle]").not($this).siblings("[data-accord-content]").slideUp();

                $this.toggleClass("active");
                accordItems.find("[data-accord-toggle]").not($this).removeClass("active");

                if (showItem) {
                    $thisItem.addClass("active");
                    $this.siblings("[data-accord-content]").slideDown();
                } else {
                    $thisItem.toggleClass("active");
                    $this.siblings("[data-accord-content]").slideToggle();
                }
                if (typeof (callback) !== "undefined" && callback) {
                    callback.call(this)
                }
            },
            setListener: function (wrap, showItem, callback) {
                var self = this;

                $(wrap).on("click", "[data-accord-toggle]", function (e) {
                    self.start.call(this, e, showItem, callback);
                });
            },
            slideUpOnLoad: function (wrap, showActive) {
                $(wrap + " [data-accord-item]" + (showActive ? ":not(.active)" : "")).find("[data-accord-content]").slideUp();
                if (!showActive) {
                    $(wrap + " [data-accord-item]").removeClass("active");
                }
            }
        }
    })();

    if (globParam.windowWidth() < globParam.getMediaSize().PHONES) {

        accordeonBase.slideUpOnLoad(".js--registration-choice-wrap", true);
        accordeonBase.setListener(".js--registration-choice-wrap", true);




    }

    if (globParam.windowWidth() < globParam.getMediaSize().LAPTOP) {
        accordeonBase.slideUpOnLoad(".js--order-wrap", true);
        accordeonBase.setListener(".js--order-wrap", true);
    }

    if (globParam.windowWidth() < globParam.getMediaSize().LAPTOP) {
        accordeonBase.slideUpOnLoad(".js--cart-cabinet-wrap", true);
        accordeonBase.setListener(".js--cart-cabinet-wrap", false);
    }

    // Активируем блоки регистрации


    var registrationChoiceColumn = $("[data-registration-choice-column]");
    if (globParam.windowWidth() < globParam.getMediaSize().PHONES) {
        registrationChoiceColumn.off("click");
        registrationChoiceColumn.removeClass("disabled");
    } else {
        registrationChoiceColumn.on("click", function () {
            var $this = $(this);
            if ($this.hasClass("disabled")) {
                $this.closest("[data-registration-choice-wrap]").find("[data-registration-choice-column]").addClass("disabled");
                $this.removeClass("disabled");
            }
            if (!$this.hasClass("disabled")) {
                return;
            }
        })

    }

    $("[data-basket-list-remove]").on("click", function () {
        $(this).closest("[data-basket-list-item]").remove();
    });

}

document.addEventListener("DOMContentLoaded", DOMready);