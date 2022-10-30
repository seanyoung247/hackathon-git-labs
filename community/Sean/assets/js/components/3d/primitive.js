
import { createTemplate, createComponent, WebComponent, createFragment } from '../../externals.js';


export class WebPrimitive3D extends WebComponent {

    static get attributes() {
        return {
            'width': {type: Number, default: 100},
            'height': {type: Number, default: 100},
            'sides': {type: Number, default: 0},
            'unit': {type: String, default: 'px'}
        }
    }

    constructor() {
        super();
        this._createShadow({mode: 'open'});
        this._faces = this.shadowRoot.getElementById('faces');
    }

    get sides() { return this._sides; }

    get height() { return this._height; }
    set height(val) {
        this._height = this.attributes.height.type(val);
        this._faces.style.setProperty('--height', `${this._height}${this._unit}`);
        this.setAttribute('height', val);
    }

    get width() { return this._width; }
    set width(val) {
        this._width = this.attributes.width.type(val);
        this._faces.style.setProperty('--width', `${this._width}${this._unit}`);
        this.setAttribute('width', val);
    }

    connectedCallback() {
        this._faces.style.setProperty('--height', `${this._height}${this._unit}`);
        this._faces.style.setProperty('--width', `${this._width}${this._unit}`);
    }
}


const style = `
    :host {
        transform-style: preserve-3d;
    }
    #faces {
        position: relative;
        width: var(--width);
        height: var(--height);
        transform-style: preserve-3d;
    }
    .face {
        position: absolute;
        left: 50%; top: 50%;
        height: 100%;
        width: calc(var(--l) + 1px);
        transform:
            translate(-50%,-50%)
            rotateY(calc(var(--a) * var(--i)))
            translateZ(var(--off));
    }
    .cap {
        height: var(--width);
        width: var(--width);
        border-radius: 50%;
    }
    #top {
        transform: 
            translate(-50%,-50%) 
            rotateX(90deg) 
            translateZ( calc(var(--height) / 2) );
    }
    #bottom {
        transform: 
            translate(-50%,-50%) 
            rotateX(-90deg) 
            translateZ( calc(var(--height) / 2) );
    }
`;
const html = '<div id="faces"></div>';


export class RegularPolygon3D extends WebPrimitive3D {

    connectedCallback() {
        super.connectedCallback();
        this._genFaces(this._faces);
    }

    /* Face properties and generation */
    _sideLength() {
        return (this._width * Math.sin(Math.PI / this._sides)).toFixed(4);
    }

    _faceOffset() {
        return (this._width / 2) * Math.cos(Math.PI / this._sides).toFixed(4);
    }

    _genFace(id, cls='', style=null) {
        return createFragment(
            `<div id="${id}" 
                part="face ${id}" 
                class="face ${cls}"
                ${style ? `style="${style}"` : ''}>
                <slot name="${id}"></slot>
            </div>`, 
        );
    }

    _genFaces(container) {
        const a = (Math.PI * 2) / this._sides; 
        const l = this._sideLength();
        const off = this._faceOffset();

        const fragment = new DocumentFragment();

        this._faces.style.setProperty('--a', `${a}rad`);
        this._faces.style.setProperty('--l', `${l}${this._unit}`);
        this._faces.style.setProperty('--off', `${off}${this._unit}`);
        // Generate sides
        for (let i = 1; i <= this._sides; i++) {
            fragment.append(this._genFace(`face-${i}`, '', `--i:${i}`));
        }
        // Generate caps
        fragment.append(this._genFace('top', 'cap'));
        fragment.append(this._genFace('bottom', 'cap'));
        container.replaceChildren(fragment);
    }
}

export const createRegularPolygon = (poly) => {
    const template = createTemplate(html, style);
    createComponent(poly, template);
}