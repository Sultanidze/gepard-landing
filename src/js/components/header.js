const headerNode = document.querySelector('.js-header');

function headerScrollHandler(e){
    const scrollY = window.scrollY;
    
    if (scrollY >= 144){
        headerNode.classList.add('state_scrolled');
    } else {
        headerNode.classList.remove('state_scrolled');
    }
}

window.addEventListener('scroll', headerScrollHandler, {passive: true})

export default headerNode;