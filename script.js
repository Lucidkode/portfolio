$(document).ready(function() {
    
    
    /* Smooth scroll by Chris Coyier https://css-tricks.com/snippets/jquery/smooth-scrolling/
  Scroll to specific section on front page */
        $(function() {
            $('a[href*=#]:not([href=#])').click(function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname)              {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: (target.offset().top)
                }, 1000);
                    return false;
                }
                }
            });
        });
    
    
    var windowWidth = $(window).width();
    var previewWidth = $(window).width();
    var previewHeight = window.innerHeight;
    
    // Display modal
    function modal() {
    
        $("body").css({ overflow: 'hidden' });
        $('#modal div.preview').css('width', previewWidth);
        $('#modal div.preview').css('height', previewHeight);
        $('#modal div.preview div.PFBox').css('height', (previewHeight * .9));
        console.log('previewWidth: ' + previewWidth);
        console.log('previewHeight: ' + previewHeight);
        console.log('previewHeight PFBox: ' + (previewHeight * .9));
        
        $('#modal div.preview').css('opacity', '1');
        $('#modal').fadeIn(600);
        setTimeout(function() {
            $('#modal div.preview div.PFBox').addClass('openPreview');
        }, 600);

        $('button.closePreviewButt').click(function() {
            fadeModal();
        }); // $('button.closePreviewButt').click()
        $('button#contactMe').click(function() {
            fadeModal();
        }); // $('button.closePreviewButt').click()
        
        function fadeModal() {
        
            $('#modal div.preview div.PFBox').addClass('closePreview');
            $("body").css({ overflow: 'inherit' })
                
            setTimeout(function() {
                $('#modal div.preview').css('opacity', '0');
            }, 200);
            setTimeout(function() {
                $('#modal').css('display', 'none'); 
            }, 700);
        
        } // function fadeModal()
        
    } // function modal()
    
    // Add flower image on bigger screens
    
    $(window).resize(function() {
        var newWidth = $(window).width();
        if (newWidth > 680 && windowWidth < 680) {
            addFlower();
        } else if (newWidth < 680 && windowWidth > 680) {
            removeFlower();
        }
        windowWidth = newWidth;
        if (windowPos < header.outerHeight()-120) {
            $('img#flower').css('z-index', '20');
        }
        
        previewWidth = $(window).width();
        previewHeight = $(window).height();
        $('div.preview').css('width', previewWidth);
        $('div.preview').css('height', previewHeight);
        $('div.preview div.PFBox').css('height', (previewHeight * .9));
    });
    
    
    var windowPos = $(window).scrollTop();
    var header = $('header');
    
    var pfOffset = $('section#portfolio').offset();
    var aboutOffset = $('section#about').offset();
    var contactOffset = $('section#contact').offset();
    var index = $('main').attr('class');
    var index = $('main').attr('class');
    if (index === 'index') {
        navSelectSection();
    }
    
    $(window).resize(function() {
        pfOffset = $('section#portfolio').offset();
        aboutOffset = $('section#about').offset();
        contactOffset = $('section#contact').offset();
        if (index === 'index') {
            navSelectSection();
        }
    });
    
    // Change brand position on scroll and verify which section is in viewport
    $(window).scroll(function() {
            windowPos = $(window).scrollTop();
            var name = $('header h1');
            var tagline = $('header img#tagline');
            var brand = $('header div#brand');
            if (windowPos >= header.outerHeight()-120) {
                $('img#flower').css('z-index', '1');
                name.fadeOut(200);
                tagline.fadeOut(200);
                brand.removeClass('moveCenter');
                brand.addClass('moveLeft');
                header.removeClass('moveDown');
                header.addClass('moveUp');
            } else { 
                if (brand.hasClass('moveLeft')) {
                    brand.removeClass('moveLeft');
                    brand.addClass('moveCenter');
                    name.hide().delay(1000).fadeIn(2000);
                    tagline.hide().delay(1000).fadeIn(2000);
                    header.removeClass('moveUp');
                    header.addClass('moveDown');  
                    window.setTimeout(function() {
                        $('img#flower').css('z-index', '20');
                    }, 500);
                }
            } 
        
            if (index === 'index') {
                navSelectSection();
            }
           
    });
    
    
    function navSelectSection() {
        
       
        if ((windowPos >= pfOffset.top - 50) && (windowPos < aboutOffset.top - 350)) {
            deselectNavLinks();
            $('nav ul li a#pfLink').addClass('navSelected');
        } else if ((windowPos >= aboutOffset.top - 50) && (windowPos < contactOffset.top - 350)) {
            deselectNavLinks();
            $('nav ul li a#aboutLink').addClass('navSelected');
        } else if ((windowPos >= contactOffset.top - 50)) {
            deselectNavLinks();
            $('nav ul li a#contactLink').addClass('navSelected');
        } else {
            deselectNavLinks();
        }
    
    } // function navSelectSection()
    
    var menu = $('nav ul.menu');
    $(menu).removeClass('expand');
    $(menu).removeClass('transAfter');
    //Controls the expansion of the menu for small screens
    $('div#mainMenu').click(function() {
        $(menu).toggleClass('expand');
        $(menu).toggleClass('transAfter');
        $('div.shopToggleMenu h3').toggleClass('toggled');
    
    });
    
    //Close the menu when one of its element is clicked
    $('ul.menu li a').click(function() {
        $(menu).removeClass("expand");
        $(menu).removeClass('transAfter');
    });
    //Close the top menu when top bar is clicked
    $('div#brand').click(function() {
        $(menu).removeClass("expand");
        $(menu).removeClass('transAfter');
    });
    
    // Selected menu link style
    $('nav ul li a').click(function() {
    
        deselectNavLinks();
        $(this).addClass('navSelected');
    
    }); // $('nav ul li a').click()
    
    
    function deselectNavLinks() {
    
        $('nav ul li a').each(function() {
            if ($(this).hasClass('navSelected')) {
                $(this).removeClass('navSelected');
            }
        });
        
    } // function deselectNavLinks()
    
    
    // Portfolio select section Portfolio
    $('div#PFMenu button').click(function() {
    
        $('div#PFMenu button').each(function() {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                    var sctToRemove = $(this).attr('id');
                    sctToRemove = sctToRemove.slice(6);
                    $('section#Portfolio' + sctToRemove).addClass('hidden');
                }
            });
        $(this).addClass('selected');
        
        var sctToDisplay = $(this).attr('id');
        sctToDisplay = sctToDisplay.slice(6);
        $('section#Portfolio' + sctToDisplay).removeClass('hidden');
    
    }); // $('div#PFMenu button').click()
    
    // Disable/Enable links of the portfolio
    $('div.PFthumb a').click(function() {
    
        if ($(this).hasClass('disabled')) {
            
            if ($(this).hasClass('newPF')) {
            
                var link = $(this).attr('href');
                var toAppend = $(this).children('div').html();
                var titlesToAppend = toAppend.slice(toAppend.indexOf('<h3>'), (toAppend.indexOf('</h4>') + 6));
                var parToAppend = toAppend.slice(toAppend.indexOf('<div class="PFText">') + 20, (toAppend.lastIndexOf('</p>') + 4));
                if ($(this).hasClass('fcc')) {
                    var parToAppend1 = parToAppend.slice(0, parToAppend.lastIndexOf('freeCodeCamp'));
                    var parToAppend2 = parToAppend.slice(parToAppend.lastIndexOf('freeCodeCamp') + 12);
                    parToAppend = parToAppend1 + '<a href="https://www.freecodecamp.com/" target="_blank" title="Vist the site of freeCodeCamp">freeCodeCamp</a>' + parToAppend2;
                } else {

                }
                createPreviewNewPF();
                return false; // Disable link of PFthumb
                
            } else {
            
                var link = $(this).attr('href');
                var toAppend = $(this).children('div').html();
                var imgToAppend = toAppend.slice(0, (toAppend.indexOf('>') + 1));
                var titlesToAppend = toAppend.slice(toAppend.indexOf('<h3>'), (toAppend.indexOf('</h4>') + 6));
                var parToAppend = toAppend.slice(toAppend.indexOf('<p>'), (toAppend.lastIndexOf('</p>') + 4));
                if ($(this).hasClass('fcc')) {
                    var parToAppend1 = parToAppend.slice(0, parToAppend.lastIndexOf('freeCodeCamp'));
                    var parToAppend2 = parToAppend.slice(parToAppend.lastIndexOf('freeCodeCamp') + 12);
                    parToAppend = parToAppend1 + '<a href="https://www.freecodecamp.com/" target="_blank" title="Vist the site of freeCodeCamp">freeCodeCamp</a>' + parToAppend2;
                } else {

                }
                createPreview();
                return false; // Disable link of PFthumb
            
            }
            
        }
        
        function createPreview() {
            
            previewWidth = $(window).width();
            previewHeight = $(window).height();
            $('div.preview').css('width', previewWidth);
            $('div.preview').css('height', previewHeight);
        
            var htmlToAppend = '';
            htmlToAppend += '<div class="preview">';
            htmlToAppend += '<div class="old PFBox noClose cf">';
            htmlToAppend += '<a href="' + link + '" target="_blank">';
            htmlToAppend += imgToAppend;
            htmlToAppend += '</a>';
            htmlToAppend += '<div class="PFTitles noClose">';
            htmlToAppend += '<a href="' + link + '" target="_blank">';
            htmlToAppend += titlesToAppend;
            htmlToAppend += '</a>';
            htmlToAppend += '<div class="PFText noClose">';
            htmlToAppend += parToAppend;
            htmlToAppend += '</div>';
            htmlToAppend += '</div>';
            htmlToAppend += '<button class="closePreviewButt" type="button">x</button>';
            htmlToAppend += '</div>';
            htmlToAppend += '</div>';
            $('div.PFWrapper').append(htmlToAppend);
            $("body").css({ overflow: 'hidden' });
            $("html").css({ overflow: 'hidden' });
            
            setTimeout(function() {
                $('div.preview').css('opacity', '1');
                $('div.preview div.PFBox').addClass('openPreview');
            }, 200);
            
            
            $('button.closePreviewButt').click(function() {
                
                $('div.preview div.PFBox').addClass('closePreview');
                $("body").css({ overflow: 'inherit' });
                $("html").css({ overflow: 'auto' });
                
                setTimeout(function() {
                    $('div.preview').css('opacity', '0');
                }, 200);
                setTimeout(function() {
                    $('div.preview').remove(); 
                }, 700);
                
            }); // $('button.closePreviewButt').click()
        
        } // function createPreview()
        
        function createPreviewNewPF() {
        
            var htmlToAppend = '';
            htmlToAppend += '<div class="preview">';
            htmlToAppend += '<div class="newPFBox noClose cf">';
            htmlToAppend += '<a href="' + link + '" target="_blank">';
            htmlToAppend += '</a>';
            htmlToAppend += '<div class="PFTitles noClose">';
            htmlToAppend += '<a href="' + link + '" target="_blank">';
            htmlToAppend += titlesToAppend;
            htmlToAppend += '</a>';
            htmlToAppend += '<div class="PFText noClose cf">';
            htmlToAppend += parToAppend;
            htmlToAppend += '</div>';
            htmlToAppend += '</div>';
            htmlToAppend += '<button class="closePreviewButt" type="button">x</button>';
            htmlToAppend += '</div>';
            htmlToAppend += '</div>';
            $('div.PFWrapper').append(htmlToAppend);
            $("body").css({ overflow: 'hidden' });
            $("html").css({ overflow: 'hidden' });
            $("img.PFImage").addClass('hideImage');
            
            resizePreview();
            
            setTimeout(function() {
                $('div.preview').css('opacity', '1');
                $('div.preview div.newPFBox').addClass('openPreview');
            }, 200);
            
            
            function resizePreview() {
            
                previewWidth = $(window).width();
                previewHeight = window.innerHeight;
                $('div.preview').css('width', previewWidth);
                $('div.preview').css('height', previewHeight);
                var widthNewPFBox = (previewWidth * .9);
                var heightNewPFBox = (previewHeight * .9);
                $('div.preview div.newPFBox').css('width', widthNewPFBox);
                $('div.preview div.newPFBox').css('height', heightNewPFBox);
                $('div.preview div.newPFBox').css('margin-top', (previewHeight * .05));
                var heightPFTitles = (heightNewPFBox * .9);
                $('div.newPFBox div.PFTitles').css('height', heightPFTitles);
                $('div.newPFBox div.PFTitles').css('margin-top', (heightNewPFBox * .05));
            
            } // function resizePreview()
            
            $(window).resize(function() {
                resizePreview();
            }); // $(window).resize() in Preview
            
            $('span.linkToPreview').click(function() {
            
                if ($(this).hasClass('linkToYigWebsite')) {
                    var linkTo = 'linkToYigWebsite';
                } else if ($(this).hasClass('linkToYigBrand')) {
                    var linkTo = 'linkToYigBrand';
                } else if ($(this).hasClass('linkToEgkWebsite')) {
                    var linkTo = 'linkToEgkWebsite';
                } else if ($(this).hasClass('linkToEgkBrand')) {
                    var linkTo = 'linkToEgkBrand';
                } else if ($(this).hasClass('linkToSlickjs')) {
                    var win = window.open('https://kenwheeler.github.io/slick/', '_blank');
                    win.focus();
                }
                
                $('button.closePreviewButt').trigger( "click" );
                
                setTimeout(function() {
                    
                    if (linkTo === 'linkToYigWebsite') {
                        $('div.PFthumb a.newPFYigWebsite').trigger( "click" );
                    } else if (linkTo === 'linkToYigBrand') {
                        $('div.PFthumb a.newPFYigBrand').trigger( "click" );
                    } else if (linkTo === 'linkToEgkWebsite') {
                        $('div.PFthumb a.newPFEgkWebsite').trigger( "click" );
                    } else if (linkTo === 'linkToEgkBrand') {
                        $('div.PFthumb a.newPFEgkBrand').trigger( "click" );
                    }
                    
                }, 700);
            
            }); // $('span.linkToPreview').click()
            
            $('button.closePreviewButt').click(function() {
                
                $('div.preview div.newPFBox').addClass('closePreview');
                $("body").css({ overflow: 'inherit' });
                $("html").css({ overflow: 'auto' });
                $("img.PFImage").removeClass('hideImage');
                
                setTimeout(function() {
                    $('div.preview').css('opacity', '0');
                }, 200);
                setTimeout(function() {
                    $('div.preview').remove(); 
                }, 700);
                
            }); // $('button.closePreviewButt').click()
        
        } // function createPreviewNewPF()
        
        
    }); // $('div.PFthumb a').click()
    
    
});

function addFlower() {
    var flowerImg = '<img id="flower" src="http://www.annemariedufour.com/_img/BlackberryFlowerShadow.png" alt="Flower Image">';
    $('main.index').append(flowerImg);
    $('img#flower').fadeIn("slow");
}
function removeFlower() {
    $('img#flower').fadeOut(500);
    setTimeout(function() {
        $('img#flower').remove();
    }, 600);
}

$(window).load(function(){
    $('section#banner').removeClass('faded');
    $('section#banner').addClass('fadeIn');
    
    // Add flower image on bigger screens
    var windowWidth = $(window).width();
    if (windowWidth > 680) {
        addFlower();
    }
    var windowPos = $(window).scrollTop();
    var header = $('header');
    if (windowPos < header.outerHeight()-120) {
        $('img#flower').css('z-index', '20');
    }
    
    // Load portfolio high resolution images
    $('div.PFthumb img').each(function() {
        
        if (!$(this).hasClass('previewImg')) {
            var bkgd = $(this).css('background-image');
            var bkgdHighRes = bkgd.slice(0, bkgd.indexOf('LowRes')) + 'HighRes.jpg")';
            $(this).css('background-image', bkgdHighRes);

            $(this).css('-webkit-filter', 'blur(0)');
            $(this).css(   '-moz-filter', 'blur(0)');
            $(this).css(     '-o-filter', 'blur(0)');
            $(this).css(        'filter', 'blur(0)');
        }
        
    }); // $('div.PFthumb img').each()
    
    $('div.preview img').each(function() {
        
        if (!$(this).hasClass('previewImg')) {
            var bkgdPrev = $(this).css('background-image');
            var bkgdHighResPrev = bkgdPrev.slice(0, bkgdPrev.indexOf('LowRes')) + 'HighRes.jpg")';
            $(this).css('background-image', bkgdHighResPrev);
        }
        
    }); // $('div.PFthumb img').each()
    
}); // $(window).load()