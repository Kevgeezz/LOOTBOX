(function ($) {
  "use strict";

  var searchPopup = function () {
    $('.navbar').on('click', '.search-button', function () {
      $('.search-popup').toggleClass('is-visible');
    });

    $('.navbar').on('click', '.btn-close-search', function () {
      $('.search-popup').toggleClass('is-visible');
    });

    $(".search-popup-trigger").on("click", function (b) {
      b.preventDefault();
      $(".search-popup").addClass("is-visible");
      setTimeout(function () {
        $(".search-popup").find("#search-popup").focus();
      }, 350);
    });

    $(".search-popup").on("click", function (b) {
      if (
        $(b.target).is(".search-popup-close") ||
        $(b.target).is(".search-popup-close svg") ||
        $(b.target).is(".search-popup-close path") ||
        $(b.target).is(".search-popup")
      ) {
        b.preventDefault();
        $(this).removeClass("is-visible");
      }
    });

    $(document).keyup(function (b) {
      if (b.which === 27) {
        $(".search-popup").removeClass("is-visible");
      }
    });
  };

  var initProductQty = function () {
    $('.product-qty').each(function () {
      var $el_product = $(this);

      $el_product.find('.quantity-right-plus').click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find('#quantity').val());
        $el_product.find('#quantity').val(quantity + 1);
      });

      $el_product.find('.quantity-left-minus').click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find('#quantity').val());
        if (quantity > 0) {
          $el_product.find('#quantity').val(quantity - 1);
        }
      });
    });
  };

  $(document).ready(function () {
  searchPopup();

    var $videoSrc;
    $('.play-btn').click(function () {
      $videoSrc = $(this).data("src");
    });

    $('#myModal').on('shown.bs.modal', function (e) {

      $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })

    $('#myModal').on('hide.bs.modal', function (e) {
      $("#video").attr('src', $videoSrc);
    })
  
  //Debug Swiper: mySwiper
  const mySwiperEl = document.querySelector('.mySwiper');
  if (mySwiperEl instanceof HTMLElement) {
    console.log('Initializing .mySwiper');
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 4,
      spaceBetween: 20,
      autoplay: false,
      pagination: {
        el: ".new-arrival-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        572: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 4,
        }
      },
    });
  } else {
    console.warn('Skipped .mySwiper — not found or invalid.');
  }

  // Debug Swiper: testimonial-Swiper
  const testimonialSwiperEl = document.querySelector('.testimonial-Swiper');
  if (testimonialSwiperEl instanceof HTMLElement) {
    console.log('Initializing .testimonial-Swiper');
    var swiper = new Swiper(".testimonial-Swiper", {
      spaceBetween: 30,
      pagination: {
        el: ".testimonial-pagination",
        clickable: true,
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        572: { slidesPerView: 2 },
        1280: { slidesPerView: 3 },
      }
    });
  } else {
    console.warn('Skipped .testimonial-Swiper — not found or invalid.');
  }
});


  // Optional product sliders
  const thumbEl = document.querySelector('.product-thumbnail-slider');
const largeEl = document.querySelector('.product-large-slider');

if (thumbEl instanceof HTMLElement && largeEl instanceof HTMLElement) {
  console.log('Initializing product sliders');

  const thumb_slider = new Swiper(thumbEl, {
    loop: true,
    slidesPerView: 3,
    autoplay: true,
    direction: "vertical",
    spaceBetween: 15,
  });

  new Swiper(largeEl, {
    loop: true,
    slidesPerView: 1,
    autoplay: true,
    effect: 'fade',
    thumbs: {
      swiper: thumb_slider,
    },
  });
} else {
  console.warn('Skipped product sliders — one or both elements missing.');
}


  window.addEventListener("load", () => {
    var $grid = $('.entry-container').isotope({
      itemSelector: '.entry-item',
      layoutMode: 'masonry'
    });
  });

  var initPreloader = function () {
    $(document).ready(function () {
      $('body').addClass('preloader-site');
    });
    $(window).on('load', function () {
      $('.preloader-wrapper').fadeOut();
      $('body').removeClass('preloader-site');
    });
  };

  initPreloader();
  initProductQty();

})(jQuery);
