
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
            width: calc( ( 2 * var(--PI) * var(--radius) ) / var(--sides) );

            --a: calc( (360deg / var(--sides)) * var(--i) );

            transform: translate(-50%,-50%) rotateY(var(--a)) translateZ(var(--radius));
        }
    `;
    const html = `
        <div id="faces">
        </div>
    `;

    const generateFaces = count => {
        const fragment = new DocumentFragment();
        const faceTemp = document.createElement('div');
        const slotTemp = document.createElement('slot');
        faceTemp.classList.add('face');

        for (let i = 1; i <= count; i++) {
            const face = faceTemp.cloneNode();
            const slot = slotTemp.cloneNode();
            face.setAttribute('part', `face face-${i}`);
            face.style.setProperty('--i', i);
            slot.setAttribute('name', `face-${i}`);
            face.append(slot);
            fragment.append(face);
        }
        return fragment;
    }

    class Cylinder3D extends WebPrimitive3D {
        static get tagName() { return 'cylinder-3d'; }
        static get attributes() {
            return {
                'radius': {type: String, default: '50px'},
                'height': {type: String, default: '100px'},
                'sides': {type: Number, default: 16}
            }
        }

        get sides() { return this._sides; }
        set sides(val) { 
            this.style.setProperty(`--sides`, val);
            this._sides = this.attributes.sides.type(val);
            this._faces.innerHTML = '';
            this._faces.append(generateFaces(this._sides));
            this.setAttribute('sides', val);
        }

        constructor() {
            super();
            this._faces = this.shadowRoot.getElementById('faces');
        }

        connectedCallback() {
            this._faces.innerHTML = '';
            this._faces.append(generateFaces(this._sides));
        }
    }

    const template = createTemplate(html, styles);
    createComponent(Cylinder3D, template);
})();