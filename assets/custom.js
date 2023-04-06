/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 */
 $(document).ready(function () {
  var scrollBtm = '.scroll-to-top';

$(window).scroll(function () {
    if ($(this).scrollTop() > $(window).height() ) {
        $(scrollBtm).fadeIn().attr('aria-hidden', false);
    } else {
        $(scrollBtm).fadeOut().attr('aria-hidden', true);
    }
});

$(scrollBtm).click(function () {
    $("html, body").animate({
        scrollTop: 0
    }, 600);
  $('.announcement_head').focus();
    return false;
});

});

$('.CollectionToolbar__Item .CollectionToolbar__LayoutSwitch .CollectionToolbar__LayoutType').click(function(){
$(this).attr('aria-pressed', 'true').siblings('.CollectionToolbar__LayoutType').attr('aria-pressed', 'false');
});

if($('.ProductItem').length) {
var productItem = '.ProductItem';
var producthoverVideoWrapper = '.video__container';
var hoverVideo = '.hover_video';

$(document).on('mouseenter',productItem,function() {
  if($(this).find(hoverVideo).length) {
    var me = $(this);
    var myVideo = $(this).find(hoverVideo);
    var myWrapper = $(this).find(producthoverVideoWrapper);
    var videoFile = myVideo.find('source').data('src');
    var myPreloader = me.find('.video-preloader');

    myWrapper.stop().fadeIn('fast');

    if(!myVideo.hasClass('video-loaded')) {
      //myPreloader.fadeIn('fast');
      myVideo.find('source').attr('src',videoFile);
      myVideo[0].load();

      myVideo[0].onplaying = function() {
        myPreloader.removeClass('loading');
        myVideo.addClass('video-loaded');
      };
      myWrapper.stop().fadeIn();
      myVideo[0].load();
      myVideo[0].play();
    } else {
      if(myVideo[0].readyState === 4) {
        myPreloader.removeClass('loading');
        myVideo.stop().fadeIn('fast');
        myVideo[0].load();
        myVideo[0].play();
      }
    }
  }
});

$(document).on('mouseleave',productItem,function() {
  if($(this).find(hoverVideo).length) {
    var myVideo = $(this).find(hoverVideo);
    var myWrapper = $(this).find(producthoverVideoWrapper);
    if(myVideo[0].readyState === 4) {
      myVideo[0].pause();
    }
    myWrapper.stop().fadeOut();
  }
});
}

setInterval(function(){ 
var prebtn = $('[data-flickity-config] .flickity-viewport + button.flickity-prev-next-button.previous');
var parentElem = prebtn.closest('[data-flickity-config]'); 
prebtn.prependTo(parentElem)
if(document.querySelectorAll('.product-carousel-sr-text').length < 1 && document.querySelectorAll('.Product__Slideshow').length > 0){
  document.querySelector('.Product__Slideshow').insertAdjacentHTML('afterbegin', '<p class="product-carousel-sr-text sr-only">This is a product carousel. Use slide dot buttons to navigate, or jump to a slide.</p>');
}
}, 1000);

$('.pswp').appendTo('body');

$(document).on('click','.shopify-section--slideshow button.slider-play-button',function() {
  var playerStatus = $(this).attr('data-player'),
  thisSlider = $(this).siblings('[data-flickity-config]');
  console.log(thisSlider);
  thisSlider.flickity();
  if( playerStatus == 'playing') {
    $(this).attr('data-player', 'stoped');
    $(this).attr('aria-label', 'Start Slide Rotation');
    thisSlider.flickity('pausePlayer');
  } else {
    $(this).attr('data-player', 'playing');
    $(this).attr('aria-label', 'Stop Slide Rotation');
    thisSlider.flickity('unpausePlayer');
  }
});
$(document).on('click', 'button.ProductForm__Item',function() {
  console.log(this);
  setTimeout(function(){ 
    $('.Popover[aria-hidden="false"] .Popover__ValueList button.is-selected').focus()
  }, 100);
});
// 


$(document).on('click', '.Search__Close',function() {
setTimeout(function(){ 
$('.Drawer[aria-hidden=false] .Drawer__Close').trigger('focus');
$('.header_search').focus();
}, 100);
});
$(document).on('click', '[data-action="open-drawer"]',function() {
setTimeout(function(){ 
$('.Drawer[aria-hidden=false] .Drawer__Close').trigger('focus');
}, 100);
});

$(document).on('click', '[data-drawer-id="sidebar-cart"]',function() {
setTimeout(function(){ 
$('.header_cart').focus();
}, 100);
});

$(document).on('click', '.Product__Slideshow--zoomable',function() {
setTimeout(function(){ 
$('.pswp .pswp__button.pswp__button--close').trigger('focus');
}, 300);
});

$(document).on('click', '[data-action="close-drawer"]',function() {
var closedElement = $(this).data('drawer-id');
var targetFocusElement = $('.Header__Icon[data-action="open-drawer"][data-drawer-id="'+closedElement+'"]');
setTimeout(function(){ 
 //console.log(targetFocusElement);
targetFocusElement.focus();
}, 500);
});



$(document).on('click', '.ProductItem__Wrapper .carousel .slide-dots button.slide-dot-button',function() {
var thisElem = $(this);
var index = thisElem.index();
var thisElemclosest = thisElem.closest('.carousel');
var slides =  thisElemclosest.find('.ProductItem__ImageWrapper');
var targetindex =  thisElemclosest.find('.ProductItem__ImageWrapper').eq(index);
console.log(targetindex);
slides.removeClass('is-active');
targetindex.addClass('is-active');
thisElem.siblings('button.slide-dot-button').attr('aria-current', null);
thisElem.attr('aria-current', true);
});



function trapFocus(element, namespace) {
var focusableEls = element.find('a, object, :input, iframe, [tabindex]'),
  firstFocusableEl = focusableEls.first()[0],
  lastFocusableEl = focusableEls.last()[0],
  TABKEYCODE = 9;

$(element).on('keydown', function(e) {
  var isTabPressed = (e.key === 'Tab' || e.keyCode === TABKEYCODE );

  if (!isTabPressed) { 
      return; 
  }

  if ( e.shiftKey ) /* shift tab keypress */ {
      if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
      }
  } else /* tab keypress */ {
      if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          e.preventDefault();
      }
  }
});
}

$('.Product__Slideshow--zoomable [data-fancybox]').fancybox({ 
margin: [44, 0, 22, 0],
buttons: ['slideShow', 'zoom', 'close'],
baseClass: "product-zoomable-fancybox-modal",
/*
thumbs: {
autoStart: true,
axis: 'x'
}, 
*/
caption: function (instance, item) {
  // var caption = $(this).data('caption') || '';
  // return (caption.length ? caption + '<br />' : '') + 'Image <span data-fancybox-index></span> of <span data-fancybox-count></span>';
},
afterLoad : function(instance, current) {
console.log(current.$image.attr);
current.$image.attr('alt', current.opts.$orig.find('img').attr('alt') );
}
});



document.addEventListener("DOMContentLoaded", function () {
  $(document).on('click', '#sizeChartBtn', function () {
    $.fancybox.open($('#sizeChart'), {
      touch: false,
      infobar: false
      , smallBtn: false,
      modal: true  
    }); 
  });
  $(document).on('click', '.tabWrap .tabMenu button.tabiteam', function () {
    var thisElem = $(this);
    var targetEl = $('.tabWrap .tab-container .tab-box.tab-' + thisElem.val());
    thisElem.addClass('active').closest('.tabiteam-wrp').siblings('.tabiteam-wrp').find('.tabiteam').removeClass('active');

    targetEl.addClass('active').show().siblings('.tab-box').removeClass('active').hide();
    console.log(targetEl);
  });
  $(document).on('click', '.tabWrap .tabMenu .buttonGroup button.size-unit-switch', function () {
    var targetEl = $(this).text();
    targetEl = targetEl.toLowerCase();
    $(this).addClass('active').siblings('.size-unit-switch').removeClass('active');
    $('#sizeChart.fancybox-content .table-unite').removeClass('active');
    $('#sizeChart.fancybox-content .table-unite[id="' + targetEl + '"]').addClass('active');
  });
});
$(document).ready(function () {
  $('#sizeChart [data-fancybox-close]').click(function () {
    setTimeout(function () {
      $('#sizeChartBtn').focus();
    }, 100);
  });
  $('.Cart__OffscreenNoteContainer [data-action="toggle-cart-note"]').click(function(){
    var parent_node = $(this).closest('.Drawer__Footer').find('.Cart__NoteButton[data-action="toggle-cart-note"]');
    parent_node.focus();
  });
  $(".PageSkipLink").click(function () {
    $("#main").focus();
  });
  var shopTheLook_Product = $('.ShopTheLook__ProductList[data-flickity-config]');
  if (shopTheLook_Product.attr('tabindex') != "") {
    shopTheLook_Product.removeAttr('tabindex');
  }
  var elem = ".MegaMenu";
  $(document).on('keydown', function (e) {
    //console.log('that:', e.keyCode, ' this:', this);
    if (e.keyCode === 27) { // ESC       
      $(elem).addClass('menu_hidden');
      $(elem).siblings('li.HorizontalList__Item.menu_item_dropdown .toggle-button').removeClass('active').attr('aria-expanded', false);
    } else {
      $(elem).removeClass('menu_hidden');
    }
  });
});

$('.Search__Form .Search__Input').on('keydown', function (e) {
 var key = e.keyCode; 
 if(key == 13)  // the enter key code
  {
    document.querySelector(".Search__Close").click(); 
    console.log("sadas");
    return false;  
  }
}); 