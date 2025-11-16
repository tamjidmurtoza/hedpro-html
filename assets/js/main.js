(function ($) {
  "use strict";

  /*
  |--------------------------------------------------------------------------
  | Template Name: Hedpro
  | Author: peterdraw
  | Version: 1.0.0
  |--------------------------------------------------------------------------
  |--------------------------------------------------------------------------
  | TABLE OF CONTENTS:
  |--------------------------------------------------------------------------
  |
  | 01. Preloader
  | 02. Mobile Menu
  | 03. Sticky Header
  | 04. Dynamic Background
  | 05. Slick Slider
  | 06. Modal Video
  | 07. Scroll Up
  | 08. Accordian
  | 09. Review
  | 10. Counter Animation
  | 11. Smooth Page Scroll
  | 12. Steps Animation
  | 13. Dynamic contact form
  | 14. AOS Animation
  | 15. hobbleEffect
  | 16. beforeAfterSlide
  */

  /*--------------------------------------------------------------
    Scripts initialization
  --------------------------------------------------------------*/
  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  $(window).on("load", function () {
    preloader();
  });
  $(window).on("scroll", function () {
    stickyHeader();
    showScrollUp();
  });
  $(window).on("resize", function () {
    $(".cs_site_header").removeClass("active");
    $(".cs_menu_toggle")
      .removeClass("active")
      .siblings(".cs_nav_list_wrap")
      .removeClass("active");
  });

  $(function () {
    mainNav();
    stickyHeader();
    dynamicBackground();
    slickInit();
    modalVideo();
    scrollUp();
    accordian();
    review();
    counterInit();
    smoothScroll();
    aosInit();
    hobbleEffect();
    beforeAfterSlider();
    dateTimePicker()
    customSlider()
    $(".tom_select").each(function () {
      new TomSelect(this, {
        create: false,
        onDropdownOpen: function (dropdown) {
          dropdown.classList.add("active");
        },
        onDropdownClose: function (dropdown) {
          dropdown.classList.remove("active");
        },
      });
    });
    if ($.exists(".cs_getting_year")) {
      const date = new Date();
      $(".cs_getting_year").text(date.getFullYear());
    }
  });

  /*=============================================================
    01. Preloader
  ===============================================================*/
  function preloader() {
    $(".cs_preloader_in").fadeOut();
    $(".cs_preloader").delay(150).fadeOut("slow");
  }

  /*=============================================================
    02. Mobile Menu
  ===============================================================*/
  function mainNav() {
    $(".cs_nav").append('<span class="cs_menu_toggle"><span></span></span>');
    $(".menu-item-has-children").append(
      '<span class="cs_menu_dropdown_toggle"><span></span></span>'
    );
    $(".cs_menu_toggle").on("click", function () {
      $(this)
        .toggleClass("active")
        .siblings(".cs_nav_list_wrap")
        .toggleClass("active");
      $(".cs_site_header").toggleClass("active");
    });
    $(".cs_menu_dropdown_toggle").on("click", function () {
      $(this).toggleClass("active").siblings("ul").slideToggle();
      $(this).parent().toggleClass("active");
    });
  }

  /*=============================================================
    03. Sticky Header
  ===============================================================*/
  function stickyHeader() {
    var scroll = $(window).scrollTop();
    if (scroll >= 10) {
      $(".cs_sticky_header").addClass("cs_sticky_active");
    } else {
      $(".cs_sticky_header").removeClass("cs_sticky_active");
    }
  }
  /*=============================================================
    04. Dynamic Background
  ===============================================================*/
  function dynamicBackground() {
    $("[data-src]").each(function () {
      var src = $(this).attr("data-src");
      $(this).css({
        "background-image": "url(" + src + ")",
      });
    });
  }
  /*=============================================================
   05. Slick Slider
  ===============================================================*/
  function slickInit() {
    if ($.exists(".cs_slider")) {
      $(".cs_slider").each(function () {
        // Slick Variable
        var $ts = $(this).find(".cs_slider_container");
        var $slickActive = $(this).find(".cs_slider_wrapper");
        // Auto Play
        var autoPlayVar = parseInt($ts.attr("data-autoplay"), 10);
        // Auto Play Time Out
        var autoplaySpdVar = 3000;
        if (autoPlayVar > 1) {
          autoplaySpdVar = autoPlayVar;
          autoPlayVar = 1;
        }
        // Slide Change Speed
        var speedVar = parseInt($ts.attr("data-speed"), 10);
        // Slider Loop
        var loopVar = Boolean(parseInt($ts.attr("data-loop"), 10));
        // Slider Center
        var centerVar = Boolean(parseInt($ts.attr("data-center"), 10));
        // Variable Width
        var variableWidthVar = Boolean(
          parseInt($ts.attr("data-variable-width"), 10)
        );
        // Pagination
        var paginaiton = $(this)
          .find(".cs_pagination")
          .hasClass("cs_pagination");
        // Slide Per View
        var slidesPerView = $ts.attr("data-slides-per-view");
        if (slidesPerView == 1) {
          slidesPerView = 1;
        }
        if (slidesPerView == "responsive") {
          var slidesPerView = parseInt($ts.attr("data-add-slides"), 10) || 1;
          var lgPoint = parseInt($ts.attr("data-lg-slides"), 10) || 1;
          var mdPoint = parseInt($ts.attr("data-md-slides"), 10) || 1;
          var smPoint = parseInt($ts.attr("data-sm-slides"), 10) || 1;
          var xsPoing = parseInt($ts.attr("data-xs-slides"), 10) || 1;
        }
        // Fade Slider
        var fadeVar = parseInt($($ts).attr("data-fade-slide"));
        fadeVar === 1 ? (fadeVar = true) : (fadeVar = false);

        // Slick Active Code
        $slickActive.slick({
          autoplay: autoPlayVar,
          dots: paginaiton,
          centerPadding: "28%",
          speed: speedVar,
          infinite: loopVar,
          autoplaySpeed: autoplaySpdVar,
          centerMode: centerVar,
          fade: fadeVar,
          prevArrow: $(this).find(".cs_left_arrow"),
          nextArrow: $(this).find(".cs_right_arrow"),
          appendDots: $(this).find(".cs_pagination"),
          slidesToShow: slidesPerView,
          variableWidth: variableWidthVar,
          swipeToSlide: true,
          responsive: [
            {
              breakpoint: 1600,
              settings: {
                slidesToShow: lgPoint,
              },
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: mdPoint,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: smPoint,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: xsPoing,
                slidesToScroll: xsPoing,
              },
            },
          ],
        });
      });
    }
  }
  /*=============================================================
    06. Modal Video
  ===============================================================*/
  function modalVideo() {
    if ($.exists(".cs_video_open")) {
      $("body").append(`
        <div class="cs_video_popup">
          <div class="cs_video_popup-overlay"></div>
          <div class="cs_video_popup-content">
            <div class="cs_video_popup-layer"></div>
            <div class="cs_video_popup_container">
              <div class="cs_video_popup-align">
                <div class="embed-responsive embed-responsive-16by9">
                  <iframe class="embed-responsive-item" src="about:blank"></iframe>
                </div>
              </div>
              <div class="cs_video_popup_close"></div>
            </div>
          </div>
        </div>
      `);
      $(document).on("click", ".cs_video_open", function (e) {
        e.preventDefault();
        var video = $(this).attr("href");

        $(".cs_video_popup_container iframe").attr("src", `${video}`);

        $(".cs_video_popup").addClass("active");
      });
      $(".cs_video_popup_close, .cs_video_popup-layer").on(
        "click",
        function (e) {
          $(".cs_video_popup").removeClass("active");
          $("html").removeClass("overflow-hidden");
          $(".cs_video_popup_container iframe").attr("src", "about:blank");
          e.preventDefault();
        }
      );
    }
  }

  /*=============================================================
    07. Scroll Up
  ===============================================================*/
  function scrollUp() {
    $(".cs_scrollup").on("click", function (e) {
      e.preventDefault();
      $("html,body").animate(
        {
          scrollTop: 0,
        },
        0
      );
    });
  }
  /* For Scroll Up */
  function showScrollUp() {
    let scroll = $(window).scrollTop();
    if (scroll >= 350) {
      $(".cs_scrollup").addClass("active");
    } else {
      $(".cs_scrollup").removeClass("active");
    }
  }
  /*=============================================================
    08. Accordian
  ===============================================================*/
  function accordian() {
    $(".cs_accordian").children(".cs_accordian_body").hide();
    $(".cs_accordian.active").children(".cs_accordian_body").show();
    $(".cs_accordian_head").on("click", function () {
      $(this)
        .siblings()
        .slideDown(250)
        .parent(".cs_accordian")
        .siblings()
        .children(".cs_accordian_body")
        .slideUp(250);

      /* Accordian Active Class */
      $(this).parents(".cs_accordian").addClass("active");
      $(this).parent(".cs_accordian").siblings().removeClass("active");
    });
  }

  /*=============================================================
    09. Review
  ===============================================================*/
  function review() {
    $(".cs_rating").each(function () {
      var review = $(this).data("rating");
      var reviewVal = review * 20 + "%";
      $(this).find(".cs_rating_percentage").css("width", reviewVal);
    });
  }

  /*===========================================================
    10. Counter Animation
  =============================================================*/
    function counterInit() {
    if ($.exists('.odometer')) {
      $(window).on('scroll', function () {
        function winScrollPosition() {
          var scrollPos = $(window).scrollTop(),
            winHeight = $(window).height();
          var scrollPosition = Math.round(scrollPos + winHeight / 1.2);
          return scrollPosition;
        }

        $('.odometer').each(function () {
          var elemOffset = $(this).offset().top;
          if (elemOffset < winScrollPosition()) {
            $(this).html($(this).data('count-to'));
          }
        });
      });
    }
  }

  /*===========================================================
    11. Smooth Page Scroll
  =============================================================*/
  function smoothScroll() {
    if (typeof Lenis !== "undefined") {
      const lenis = new Lenis({
        duration: 1.2,
        smooth: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }
  }
  /*===========================================================
    12. Steps Animation
  =============================================================*/
  let tabInterval;
  let currentIndex = 0;

  const $tabs = $(".cs_iconbox_wrapper_style_2 .cs_iconbox_style_2");
  const $tabContents = $(".cs_step_thumbnail");
  const intervalTime = 5000;

  if ($tabs.length > 0 && $tabContents.length > 0) {
    function activateTab(index) {
      $tabs.eq(index).addClass("active").siblings().removeClass("active");
      $tabContents.eq(index).fadeIn(800).siblings().hide();
    }

    function startAutoplay() {
      stopAutoplay();
      tabInterval = setInterval(function () {
        currentIndex = (currentIndex + 1) % $tabs.length;
        activateTab(currentIndex);
      }, intervalTime);
    }

    function stopAutoplay() {
      if (tabInterval) clearInterval(tabInterval);
    }

    $tabs.on("click", function (e) {
      e.preventDefault();
      stopAutoplay();
      currentIndex = $(this).index();
      activateTab(currentIndex);
      startAutoplay();
    });

    // Init
    $tabContents.hide();
    activateTab(currentIndex);
    startAutoplay();
  }
  /*==============================================================
    13. Dynamic contact form
    ===============================================================*/
  if ($.exists("#cs_form")) {
    const form = document.getElementById("cs_form");
    const result = document.getElementById("cs_result");

    form.addEventListener("submit", function (e) {
      const formData = new FormData(form);
      e.preventDefault();
      var object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });
      var json = JSON.stringify(object);
      result.innerHTML = "Please wait...";

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      })
        .then(async (response) => {
          let json = await response.json();
          if (response.status == 200) {
            result.innerHTML = json.message;
          } else {
            console.log(response);
            result.innerHTML = json.message;
          }
        })
        .catch((error) => {
          console.log(error);
          result.innerHTML = "Something went wrong!";
        })
        .then(function () {
          form.reset();
          setTimeout(() => {
            result.style.display = "none";
          }, 5000);
        });
    });
  }
  /*=============================================================
    14. AOS Animation
  ===============================================================*/
  function aosInit() {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }

   /*--------------------------------------------------------------
    15. Hobble Effect
  --------------------------------------------------------------*/
  function hobbleEffect() {
    $(document)
      .on("mousemove", ".cs_hobble", function (event) {
        var halfW = this.clientWidth / 2;
        var halfH = this.clientHeight / 2;
        var coorX = halfW - (event.pageX - $(this).offset().left);
        var coorY = halfH - (event.pageY - $(this).offset().top);
        var degX1 = (coorY / halfH) * 8 + "deg";
        var degY1 = (coorX / halfW) * -8 + "deg";
        var degX3 = (coorY / halfH) * -15 + "px";
        var degY3 = (coorX / halfW) * 15 + "px";

        $(this)
          .find(".cs_hover_layer_1")
          .css("transform", function () {
            return (
              "perspective( 800px ) translate3d( 0, 0, 0 ) rotateX(" +
              degX1 +
              ") rotateY(" +
              degY1 +
              ")"
            );
          });
        $(this)
          .find(".cs_hover_layer_2")
          .css("transform", function () {
            console.log('hello');
            return (
              "perspective( 800px ) translateX(" +
              degX3 +
              ") translateY(" +
              degY3 +
              ") scale(1.04)"
            );
          });
      })
      .on("mouseout", ".cs_hobble", function () {
        $(this).find(".cs_hover_layer_1").removeAttr("style");
        $(this).find(".cs_hover_layer_2").removeAttr("style");
      });
  }

  /*--------------------------------------------------------------
   14. Before After Slider
 --------------------------------------------------------------*/
  function beforeAfterSlider() {
    if ($.exists('.cs_before_after')) {
      var supportsTouch =
        'ontouchstart' in window || navigator.msMaxTouchPoints;
      $('.cs_before_after').each(function () {
        var $container = $(this),
          $before = $container.find('.cs_before'),
          $after = $container.find('.cs_after'),
          $handle = $container.find('.cs_handle_before_after');

        var maxX = $container.outerWidth(),
          offsetX = $container.offset().left,
          startX = 0;

        var touchstart, touchmove, touchend;
        var mousemove = function (e) {
          e.preventDefault();
          var curX = e.clientX - offsetX,
            diff = startX - curX,
            curPos = (curX / maxX) * 100;
          if (curPos > 100) {
            curPos = 100;
          }
          if (curPos < 0) {
            curPos = 0;
          }
          $before.css({ right: 100 - curPos + '%' });
          $handle.css({ left: curPos + '%' });
        };
        var mouseup = function (e) {
          e.preventDefault();
          if (supportsTouch) {
            $(document).off('touchmove', touchmove);
            $(document).off('touchend', touchend);
          } else {
            $(document).off('mousemove', mousemove);
            $(document).off('mouseup', mouseup);
          }
        };
        var mousedown = function (e) {
          e.preventDefault();
          startX = e.clientX - offsetX;
          if (supportsTouch) {
            $(document).on('touchmove', touchmove);
            $(document).on('touchend', touchend);
          } else {
            $(document).on('mousemove', mousemove);
            $(document).on('mouseup', mouseup);
          }
        };

        touchstart = function (e) {
          console.log(e);
          mousedown({
            preventDefault: e.preventDefault,
            clientX: e.originalEvent.changedTouches[0].pageX,
          });
        };
        touchmove = function (e) {
          mousemove({
            preventDefault: e.preventDefault,
            clientX: e.originalEvent.changedTouches[0].pageX,
          });
        };
        touchend = function (e) {
          mouseup({
            preventDefault: e.preventDefault,
            clientX: e.originalEvent.changedTouches[0].pageX,
          });
        };
        if (supportsTouch) {
          $handle.on('touchstart', touchstart);
        } else {
          $handle.on('mousedown', mousedown);
        }
      });
    }
  }

  /*--------------------------------------------------------------
    15. Date And Time Picker

  --------------------------------------------------------------*/
  function dateTimePicker() {
    flatpickr("#timePicker", {
      enableTime: true,
      allowInput: true,
      noCalendar: true,
      dateFormat: "G:i: K", // Only time in 24-hour format
    });
    flatpickr("#datePicker", {
      enableTime: false,
      allowInput: true,
    });
  }
  /*--------------------------------------------------------------
    16. Custom Slider
  --------------------------------------------------------------*/
  function customSlider() {
    var Slider = (function () {
      var initSlider = function () {
        $('.cs_custom_slide_arrow_right , .cs_custom_slide_arrow_left').click(
          function (event) {
            const direction = $(this).hasClass('cs_custom_slide_arrow_left')
              ? 'prev'
              : 'next';
            updateSlides(direction);
          },
        );
        updateSlides('next');
      };

      const updateSlides = function (direction) {
        const activeSlide = $('.cs_custom_slide.active');
        const slides = $('.cs_custom_slide');
        const totalSlides = slides.length;
        const activeIndex = activeSlide.index();
        let nextIndex;

        if (direction === 'next') {
          nextIndex = activeIndex === totalSlides - 1 ? 0 : activeIndex + 1;
        } else {
          nextIndex = activeIndex === 0 ? totalSlides - 1 : activeIndex - 1;
        }

        const nextSlide = slides.eq(nextIndex);

        // Remove active class from all slides
        slides.removeClass('prev-1 next-1 prev-2 next-2 active');

        // Set the new active slide
        nextSlide.addClass('active');

        // Calculate the indices of previous and next slides considering the loop
        const prev1Index = nextIndex === 0 ? totalSlides - 1 : nextIndex - 1;
        const prev2Index = prev1Index === 0 ? totalSlides - 1 : prev1Index - 1;
        const next1Index = nextIndex === totalSlides - 1 ? 0 : nextIndex + 1;
        const next2Index = next1Index === totalSlides - 1 ? 0 : next1Index + 1;

        // Add appropriate classes to slides
        slides.eq(prev1Index).addClass('prev-1');
        slides.eq(prev2Index).addClass('prev-2');
        slides.eq(next1Index).addClass('next-1');
        slides.eq(next2Index).addClass('next-2');
      };

      return {
        init: function () {
          initSlider();
        },
      };
    })();

    Slider.init();
  }

    // Language Update Functionality
    $(".cs_language_switcher").on("click", function () {
      $(this).siblings(".cs_language_dropdown").slideToggle();
      updateLanguage();
    });
    function updateLanguage() {
      $(".cs_language_dropdown input").on("click", function () {
        var selectedValue = $(this).val();
        $(this)
          .closest(".cs_language_select")
          .find(".cs_language_switcher input")
          .val(selectedValue);
        $(".cs_language_dropdown").slideUp();
      });
    }



})(jQuery); // End of use strict
