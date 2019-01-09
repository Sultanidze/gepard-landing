//--------------------------------------
// VIDEO BG LAZYLOAD LOGIC
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import isMobile from 'is-mobile';

function videoLazyLoad(){
    if(isMobile()) return;  // do nothing if mobile browser
    
    var videos = document.querySelectorAll('.js-lazy__video');
    if (videos.length){
        videos.forEach = [].forEach;
        videos.forEach(function(video){
            video.setAttribute('src', video.getAttribute('data-src'));
            video.removeAttribute('data-src');

            video.play();    // start playing video
        });
    }
}

export default videoLazyLoad;