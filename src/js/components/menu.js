import {headerNode as header} from "@comp/header";

const firstLevelLinks = header.querySelectorAll('.b-nav__link');
const linkClickHandler = function(e){
    this.classList.add('is-submenu_open');
}
firstLevelLinks.forEach(link => link.addEventListener('click', linkClickHandler))

const openMenu = () => document.body.classList.add('is-menu_open');
const closeMenu = () => document.body.classList.remove('is-menu_open');

const state = {
    _isOpen: false,
    
    get isOpen() {
        return this._isOpen
    },
    set isOpen(_isOpen){
        if (_isOpen){
            openMenu()
        } else {
            closeMenu()
        }
        this._isOpen = _isOpen;
    }
}

const toggler = header.querySelector('.js-toggler_menu');

const togglerClickHandler = function(e){
    state.isOpen = !state.isOpen; 
}

toggler.addEventListener('click', togglerClickHandler);