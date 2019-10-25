// ------------------------------------------------
// Project Name: Imbue Coming Soon & Landing Page Template
// Project Description: Imbue - classy and stylish coming soon & landing page template to kick-start your project
// Tags: imbue, coming soon, under construction, template, coming soon page, landing page, one page, html5, css3
// Version: 1.0.0
// Build Date: January 2019
// Last Update: January 2019
// This product is available exclusively on Themeforest
// Author: mix_design
// Author URI: http://mixdesign.club
// File name: app.js (main)
// ------------------------------------------------

// ------------------------------------------------
// Table of Contents
// ------------------------------------------------
//
//  1. SVG Fallback
//  2. Chrome Smooth Scroll
//  3. Images moving ban
//  4. PhotoSwipe Gallery Images Replace
//  5. Main Menu & Sections Behavior
//  6. Popups Behavior
//
// ------------------------------------------------
// Table of Contents End
// ------------------------------------------------

$(function() {

  // SVG Fallback
  if(!Modernizr.svg) {
    $("img[src*='svg']").attr("src", function() {
      return $(this).attr("src").replace(".svg", ".png");
    });
  };

  // Chrome Smooth Scroll
  try {
    $.browserSelector();
    if($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch(err) {
  };

  // Images moving ban
  $("img, a").on("dragstart", function(event) { event.preventDefault(); });

  // PhotoSwipe Gallery Images Replace
  $('.works-link')
    // Background set up
    .each(function(){
    $(this)
    // Add a photo container
    .append('<div class="picture"></div>')
    // Set up a background image for each link based on data-image attribute
    .children('.picture').css({'background-image': 'url('+ $(this).attr('data-image') +')'});
  });

  // Main Menu & Sections Behavior
  // Declaring Variables
  var menuTrigger        = $('#menu-trigger'),
      menuClose          = $('#menu-close'),
      menu               = $('#menu'),
      mainSection        = $('#main'),
      aboutSection       = $('#about'),
      worksSection       = $('#portfolio'),
      contactSection     = $('#contact'),
      homeTrigger        = $('#home-trigger'),
      aboutTrigger       = $('#about-trigger'),
      worksTrigger       = $('#portfolio-trigger'),
      contactTrigger     = $('#contact-trigger'),
      aboutClose         = $('#about-close'),
      worksClose         = $('#portfolio-close'),
      contactClose       = $('#contact-close'),
      fullscreenBg       = $('.fullscreen-bg');

      // Menu Open
      menuTrigger.on('click', function(event){
        event.preventDefault();
        mainSection.addClass('is-hidden');
        menu.addClass('animate-in').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
          menuClose.addClass('is-scaled-up');
        });
        if($('html').hasClass('no-csstransitions')) {
          menuClose.addClass('is-scaled-up');
        }
        setTimeout(function(){
          $('body').addClass('overflow-hidden');
        }, 150);
      });
      // Menu Close
      menuClose.on('click', function(event){
        event.preventDefault();
        menu.addClass('animate-out').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
          menuClose.removeClass('is-scaled-up');
        });
        if($('html').hasClass('no-csstransitions')) {
          menuClose.removeClass('is-scaled-up');
        }
        setTimeout(function(){
          mainSection.removeClass('is-hidden');
          menu.removeClass('animate-in animate-out');
          $('body').removeClass('overflow-hidden');
        }, 800);
      });
      // Body remove class "overflow-hidden" on menu item click
      $('.menu a').on('click', function(event){
        $('body').removeClass('overflow-hidden');
      });

      // Sections Open/Close on menu item click
      // Back to Home Section from Menu
      homeTrigger.on('click', function(event) {
        event.preventDefault();
        $('.active').removeClass('active');
        menu.addClass('animate-out');
        setTimeout(function(){
          mainSection.removeClass('is-hidden');
          menu.removeClass('animate-in animate-out');
        }, 800);
      });
      // About Section Open
      aboutTrigger.on('click', function(event) {
        event.preventDefault();
        $('.active').removeClass('active');
        menu.addClass('animate-out');
        aboutSection.fadeIn(800, function() {
          if(fullscreenBg.length){
            $('.gradient-layer-dark').addClass('fade-dark');
          };
          aboutSection.addClass('active');
          menu.removeClass('animate-in animate-out');
          menuClose.removeClass('is-scaled-up');
          setTimeout(function(){
            aboutClose.addClass('is-scaled-up');
          }, 1000);
        });
      });
      // Works Section Open
      worksTrigger.on('click', function(event) {
        event.preventDefault();
        $('.active').removeClass('active');
        menu.addClass('animate-out');
        worksSection.fadeIn(800, function() {
          if(fullscreenBg.length){
            $('.gradient-layer-dark').addClass('fade-dark');
          };
          worksSection.addClass('active');
          menu.removeClass('animate-in animate-out');
          menuClose.removeClass('is-scaled-up');
          setTimeout(function(){
            worksClose.addClass('is-scaled-up');
          }, 1000);
        });
      });
      // Contact Section Open
      contactTrigger.on('click', function(event) {
        event.preventDefault();
        $('.active').removeClass('active');
        menu.addClass('animate-out');
        contactSection.fadeIn(800, function() {
          if(fullscreenBg.length){
            $('.gradient-layer-dark').addClass('fade-dark');
          };
          contactSection.addClass('active');
          menu.removeClass('animate-in animate-out');
          menuClose.removeClass('is-scaled-up');
          setTimeout(function(){
            contactClose.addClass('is-scaled-up');
          }, 1000);
        });
      });
      // Sections Close
      // Works Section Close
      worksClose.on('click', function(event) {
        event.preventDefault();
        worksSection.fadeOut(1200, function() {
          mainSection.removeClass('is-hidden');
          worksClose.removeClass('is-scaled-up');
          worksSection.removeClass('is-visible');
          if(fullscreenBg.length){
            $('.gradient-layer-dark').removeClass('fade-dark');
          };
        })
      });
      // About Section Close
      aboutClose.on('click', function(event) {
        aboutSection.fadeOut(1200, function() {
          mainSection.removeClass('is-hidden');
          aboutClose.removeClass('is-scaled-up');
          aboutSection.removeClass('is-visible');
          if(fullscreenBg.length){
            $('.gradient-layer-dark').removeClass('fade-dark');
          };
        })
      });
      // Contact Section Close
      contactClose.on('click', function(event) {
        event.preventDefault();
        contactSection.fadeOut(1200, function() {
          mainSection.removeClass('is-hidden');
          contactClose.removeClass('is-scaled-up');
          contactSection.removeClass('is-visible');
          if(fullscreenBg.length){
            $('.gradient-layer-dark').removeClass('fade-dark');
          };
        })
      });

  // Popups Behavior
  var notify             = $('#notify'),
      headline           = $('#headline'),
      writealine         = $('#writealine'),
      notifyTrigger      = $('#notify-trigger'),
      notifyClose        = $('#notify-close'),
      writealineTrigger  = $('#writealine-trigger'),
      writealineClose    = $('#writealine-close');

  // Contact Forms Open/Close Start
  // Notify Form Open
  notifyTrigger.on('click', function(event){
    event.preventDefault();
    mainSection.addClass('notify-is-visible');
    $('body').addClass('overflow-hidden');
    setTimeout(function(){
      notify.addClass('animate-in');
    }, 800);
    setTimeout(function(){
      notifyClose.addClass('is-scaled-up');
    }, 2000);
  });
  // Notify Form Close
  notifyClose.on('click', function(event){
    event.preventDefault();
    notify.addClass('animate-out');
    setTimeout(function(){
      mainSection.removeClass('notify-is-visible');
      notify.removeClass('animate-in animate-out');
      notifyClose.removeClass('is-scaled-up');
      $('body').removeClass('overflow-hidden');
    }, 800);
  });
  // Write-a-line Form Open
  writealineTrigger.on('click', function(event){
    event.preventDefault();
    contactSection.addClass('writealine-is-visible');
    $('body').addClass('overflow-hidden');
    setTimeout(function(){
      writealine.addClass('animate-in');
    }, 800);
    setTimeout(function(){
      writealineClose.addClass('is-scaled-up');
    }, 2000);
  });
  // Write-a-line Form Close
  writealineClose.on('click', function(event){
    event.preventDefault();
    writealine.addClass('animate-out');
    setTimeout(function(){
      contactSection.removeClass('writealine-is-visible');
      writealine.removeClass('animate-in animate-out');
      writealineClose.removeClass('is-scaled-up');
      $('body').removeClass('overflow-hidden');
    }, 800);
  });

});
