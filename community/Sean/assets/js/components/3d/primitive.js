
import { WebComponent, createFragment } from '../../externals.js';

export class WebPrimitive3D extends WebComponent {
    static _createDefaultAccessor(self, attr, prop) {
        Object.defineProperty(self, attr, {
            get() { return self[prop]; },
            set(val) {
                self.style.setProperty(`--${attr}`, val);
                self[prop] = self.attributes[attr].type(val);
                self.setAttribute(attr, val);
            }
        });
    }
    constructor() {
        super();
        this._createShadow({mode: 'open'});

        this._sides = 0;
        this._radius = 0;
        this._height = 0;
    }

    /* NGon helpers */
    _sideLength() {
        const r = parseInt(this._radius);
        return (2 * r) * Math.sin(Math.PI / this._sides);
    }

    _apothem() {
        const r = parseInt(this._radius);
        return r * Math.cos(Math.PI / this._sides);
    }

    _genFace(id, cls='', i=0) {
        return createFragment(
            `<div id="${id}" 
                part="face ${id}" 
                class="face ${cls}" 
                ${i ? `style="--i:${i}"` : ''}>
                <slot name="${id}"></slot>
            </div>`, 
        );
    }

    _genFaces(container) {
        const l = this._sideLength();
        const a = (Math.PI*2) / this._sides; 
        const offset = this._apothem();

        const fragment = new DocumentFragment();

        // Pass shared face properties to faces container
        container.style.setProperty('--a', a+'rad');        // face angles
        container.style.setProperty('--l', l+'em');        // face length
        container.style.setProperty('--off', offset+'em'); // face offsets

        // Generate sides
        for (let i = 1; i <= this._sides; i++) {
            fragment.append(this._genFace(`face-${i}`, '', i));
        }
        // Generate caps
        fragment.append(this._genFace('top', 'cap'));
        fragment.append(this._genFace('bottom', 'cap'));
        container.append(fragment);
    }
}