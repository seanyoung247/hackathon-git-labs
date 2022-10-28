
import { createComponent, createTemplate } from '../../externals.js';
import { WebPrimitive3D } from './primitive.js';

(() => {

    const styles = `
        :host {
            --radius: 50px;
            --height: 100px;
            --sides: 16;

            --PI: 3.14;

            height: var(--height);
            width: calc(var(--radius) * 2);
            transform-style: preserve-3d;
        }
        #faces {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
        }
        .face {
            position: absolute;
            left: 50%; top: 50%;
            height: 100%;
            width: var(--l);

            transform: 
                translate(-50%,-50%) 
                rotateY(calc(var(--a) * var(--i))) 
                translateZ(var(--off));
        }
        .cap {
            height: calc(var(--radius) * 2);
            width: calc(var(--radius) * 2);
            clip-path: circle(50% at 50% 50%);
        }
        #top {
            transform: 
                translate(-50%,-50%) 
                rotateX(90deg) 
                translateZ(calc(var(--height) / 2));
        }
        #bottom {
            transform: 
                translate(-50%,-50%) 
                rotateX(-90deg) 
                translateZ(calc(var(--height) / 2));
        }
    `;
    const html = `
        <div id="faces">
        </div>
    `;

class Cylinder3D extends WebPrimitive3D {
    static get tagName() { return 'cylinder-3d'; }

    static get attributes() {
        return {
            ...super.attributes,
            'sides': {type: Number, default: 16}
        }
    }

        get sides() { return this._sides; }
        set sides(val) { 
            this.style.setProperty(`--sides`, val);
            this._sides = this.attributes.sides.type(val);
            this._faces.innerHTML = '';
            this._genFaces(this._faces);
            this.setAttribute('sides', val);
        }

        constructor() {
            super();
            this._faces = this.shadowRoot.getElementById('faces');
        }

        connectedCallback() {
            
            this._faces.innerHTML = '';
            this._genFaces(this._faces);
        }
    }

    const template = createTemplate(html, styles);
    createComponent(Cylinder3D, template);
})();