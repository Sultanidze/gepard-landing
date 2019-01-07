import { tns } from "tiny-slider/src/tiny-slider";
 
const slider = tns({
    container: '.js-responces__slider',
    items: 1,
    slideBy: 'page',
//    autoplay: true,
//    autoplayButtonOutput: false,
    mouseDrag: true,
});

export default slider;