
import { WebComponent } from '../../externals.js';

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

    _sideLength() {
        const r = parseInt(this._radius);
        return (2 * r) * Math.sin(Math.PI / this._sides);
    }

    _apothem() {
        const r = parseInt(this._radius);
        return r * Math.cos(Math.PI / this._sides);
    }

    _genFaces() {
        const w = this._sideLength();
        const h = this._height;
        const a = (Math.PI*2) / this._sides; 

        console.log(this._sideLength());
        console.log(this._apothem());
        // Generate sides
        // for (let i = 1; i <= this._sides; i++) {
        //     // Calculate face size
        //     // Calculate face angle
        //     // Calculate offset
        //     // Generate geometry
        //     // Build style
        // }
    }
}