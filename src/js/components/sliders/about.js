import { tns } from "tiny-slider/src/tiny-slider";

const sliderNode = document.querySelector('.js-slider_about');

const slider = sliderNode ? tns({
    container: sliderNode,
    items: 1,
    slideBy: 'page',
//    autoplay: true,
//    autoplayButtonOutput: false,
    mouseDrag: true,
}) : null;

export default slider;