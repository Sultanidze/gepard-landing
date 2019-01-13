import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
import videolazy from './videoLazyLoad';
import '@iconfu/svg-inject';
import objectFitImages from 'object-fit-images';
import jump from 'jump.js'

elementClosest(window);
videolazy();

SVGInject(document.querySelectorAll("img.svg_injectable"));

objectFitImages();

const anchorLinks = document.querySelectorAll('.js-link_anchor');
const anchorLinkClickHandler = function(e) {
    e.preventDefault();
    
    const href = this.hash;
    jump(href);
};
anchorLinks.forEach(link => link.addEventListener('click', anchorLinkClickHandler))