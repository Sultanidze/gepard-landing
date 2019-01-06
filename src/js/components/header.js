const headerNode = document.querySelector('.js-header');

function headerScrollHandler(e){
    const scrollY = window.scrollY;
    
    if (scrollY >= 50){
        headerNode.classList.remove('position_top');
    } else {
        headerNode.classList.add('position_top');
    }
}

window.addEventListener('scroll', headerScrollHandler, {passive: true})

export default headerNode;