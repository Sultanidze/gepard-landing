import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
import videolazy from './videoLazyLoad';
import '@iconfu/svg-inject';
import objectFitImages from 'object-fit-images';
elementClosest(window);
videolazy('.js-lazy__video');

SVGInject(document.querySelectorAll("img.svg_injectable"));

objectFitImages();