$(document).ready(function() {
    $('.header__burger').click(function(event) {
        $('.header__burger,.header__menu').toggleClass('active');
    });

    $('.main__switcher > p').click(function(event) {
        $(this).toggleClass('active');
    });
    $('.faq__item').click(function(event) {
        $(this).toggleClass('active');
    });
    $('.our__slide').click(function(event) {
      $('.our__slide').removeClass('active');
      $(this).toggleClass('active');
    });

    $(document).click(function(event) {
      if (!$(event.target).closest('.our__slide').length) {
        $('.our__slide').removeClass('active');
      }
    });
    $('.main__switcher').click(function(event) {
        $('body').toggleClass('active');
    });
    $('.calc__buy').click(function(event) {
        $(this).toggleClass('active');
    });
    $('.calc__dropdown li').on('click', function () {
      const $parentBuy = $(this).closest('.calc__buy'); // Get the closest calc__buy container
      const selectedText = $(this).text(); // Get clicked li text
      const icon = $parentBuy.find('a svg'); // Save the SVG icon within the same calc__buy
      $parentBuy.find('a').html(selectedText).append(icon); // Set text and append icon back
    });
    function toggleHeaderLang(event) {
      event.preventDefault(); // Prevent default link behavior
      const $target = $(event.target);

      if ($target.closest('.header__lang > a').length) {
      $target.closest('.header__lang').toggleClass('active');
      } else if ($target.closest('.header__lang > ul > li > a').length) {
      $('.header__lang').removeClass('active');
      } else if (!$(event.target).closest('.header__lang').length) {
      $('.header__lang').removeClass('active');
      }
    }

    $(document).on('click', toggleHeaderLang);

    $(document).click(function(event) {
      if (!$(event.target).closest('.header__lang').length) {
      $('.header__lang').removeClass('active');
      }
    });
    // ANIMATION OF BLOCKS
    $(document).ready(function () {
      const $elements = $("[data-animate]");
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            $(entry.target).addClass($(entry.target).data("animate"));
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      $elements.each(function () {
        observer.observe(this);
      });
    });
    //CALCULATOR
    $('.calc__item').each(function () {
      const $item = $(this);
      const $range = $item.find('input[type="range"]');
      const $priceInput = $item.find('.calc__price input[type="text"], .calc__price input[type="number"]');
    
      function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      }
    
      function cleanNumber(val) {
        return val.toString().replace(/\D/g, '');
      }
    
      function syncFromRange() {
        const val = $range.val();
        $priceInput.val(formatNumber(val));
      }
    
      function syncFromInput() {
        const rawVal = $priceInput.val();
        let cleaned = cleanNumber(rawVal);
    
        const max = parseInt($priceInput.attr('max'), 10);
        if (!isNaN(max) && parseInt(cleaned, 10) > max) {
          cleaned = max.toString();
        }
    
        $priceInput.val(formatNumber(cleaned));
        $range.val(cleaned);
      }
    
      $range.on('input', function () {
        syncFromRange();
      });
    
      $priceInput.on('input', function () {
        syncFromInput();
      });
    
      // Initialize on page load
      syncFromRange();
    });
    
    // RANGE INPUT
    function updateRangeBg($range) {
      const min = Number($range.attr('min'));
      const max = Number($range.attr('max'));
      const val = Number($range.val());
      const percentage = ((val - min) / (max - min)) * 100;
    
      $range.css('background', `linear-gradient(to right, var(--bg-green) 0%, var(--bg-green) ${percentage}%, #ddd ${percentage}%, #ddd 100%)`);
    }
    
    $(document).ready(function () {
      $('input[type="range"]').each(function () {
      updateRangeBg($(this)); // initialize on load
      });
    
      $('input[type="range"]').on('input change', function () {
      updateRangeBg($(this));
      });

      $('.calc__price input[type="text"], .calc__price input[type="number"]').on('input', function () {
      const $input = $(this);
      const $range = $input.closest('.calc__item').find('input[type="range"]');
      const rawVal = $input.val().replace(/\D/g, ''); // Remove non-numeric characters
      const max = parseFloat($range.attr('max'));
      const min = parseFloat($range.attr('min'));
      let cleaned = parseFloat(rawVal);

      if (isNaN(cleaned)) {
        cleaned = min; // Default to min if invalid
      } else if (cleaned > max) {
        cleaned = max; // Cap at max
      } else if (cleaned < min) {
        cleaned = min; // Cap at min
      }

      $input.val(cleaned.toLocaleString()); // Format with commas
      $range.val(cleaned); // Sync range value
      updateRangeBg($range); // Update range background
      });
    });

    // LEAFLET MAP 
    $(document).ready(function () {
      const centerLatLng = [41.374333, 69.276861]; // Converted coordinates
    
      const map = L.map('map').setView(
        window.innerWidth < 696 
          ? [41.37175, 69.276556] 
          : window.innerWidth < 1270 
        ? [41.373583, 69.272333] 
        : [41.37262178023456, 69.2718746665852], 
        16
      );
    
      // Add OpenStreetMap tiles
      L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      attribution: '',
      noWrap: true
      }).addTo(map);

      // Adjust zoom level based on screen width
      if (window.innerWidth < 696) {
          map.setZoom(15);
      }

      // Disable zoom control buttons
      map.zoomControl.remove();

      // Remove Leaflet attribution text
      map.attributionControl.setPrefix(false);
      
      // Custom icon (optional)
      const customIcon = L.icon({
      iconUrl: './img/png/icon.png', // example icon
      iconSize: [32, 39],
      iconAnchor: [15, 25]
      });
    
      // Add marker with a link
      const marker = L.marker(centerLatLng, { icon: customIcon }).addTo(map);
      marker.on('click', function () {
      window.location.href = 'https://www.google.com/maps/dir/41.3301805,69.3328349/ALFRAGANUS+UNIVERSITY,+%D0%A2%D0%BE%D1%88%D0%BA%D0%B5%D0%BD%D1%82+%D1%88%D0%B0%D2%B3%D0%B0%D1%80,+%D0%AE%D0%BD%D1%83%D1%81%D0%BE%D0%B1%D0%BE%D0%B4+%D1%82%D1%83%D0%BC%D0%B0%D0%BD%D0%B8,+%D0%A2%D0%B8%D0%BA%D0%BB%D0%B0%D0%BD%D0%B8%D1%88+%D0%9C%D0%A4%D0%99,+%D0%AE%D2%9B%D0%BE%D1%80%D0%B8,+Karakamish+St+2a-%D1%83%D0%B9,+100190,+%D0%A2%D0%BEshkent,+%D0%A3%D0%B7%D0%B1%D0%B5%D0%BA%D0%B8%D1%81%D1%82%D0%B0%D0%BD/@41.3529506,69.2839322,14z/data=!3m1!4b1!4m17!1m7!3m6!1s0x38ae8d98908cbb41:0x87328286b27698a6!2sALFRAGANUS+UNIVERSITY!8m2!3d41.3752065!4d69.2697859!16s%2Fg%2F11t9lqkmbn!4m8!1m1!4e1!1m5!1m1!1s0x38ae8d98908cbb41:0x87328286b27698a6!2m2!1d69.2697859!2d41.3752065?entry=ttu&g_ep=EgoyMDI1MDQwNy4wIKXMDSoASAFQAw%3D%3D'; // Replace with your desired link
      });
    
      // Add circle
      L.circle(centerLatLng, {
      color: '#16664D',
      fillColor: '#16664D',
      fillOpacity: 0.3,
      radius: 150 // meters
      }).addTo(map);
    });
})

new Swiper('.partner__grid', {
  slidesPerView: 4.2,
  spaceBetween: 32,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  speed: 1000,
  loop: true,
  breakpoints: {
    1270: { 
      slidesPerView: 4.2,
    },
    // 1020: { 
    //   slidesPerView: 3.0,
    // },
    // 1020: { 
    //   slidesPerView: 3.5,
    // },
    768: { 
      slidesPerView: 5,
      spaceBetween: 16,
    },
    // 696: { 
    //   slidesPerView: 4,
    // },
    // 520: { 
    //   slidesPerView: 2,
    // },
    // 420: { 
    //   slidesPerView: 2.7,
    // },
    // 320: { 
    //   slidesPerView: 3,
    // },
    // 200: { 
    //   slidesPerView: 2.5,
    // },
    1: { 
      slidesPerView: 2.4,
      spaceBetween: 16,
    },
  }
});

// WAFA LEASING
// SLIDER
new Swiper('.our__slider', {
  spaceBetween: -50,
  breakpoints: {
    0: {
      slidesPerView: 1.8,
      spaceBetween: -25,
    },
    767: {
      slidesPerView: 2.5,
    },
    1270: {
      slidesPerView: 4,
    },
  }
});