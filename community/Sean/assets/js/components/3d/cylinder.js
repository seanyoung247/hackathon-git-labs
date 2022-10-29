
import { clamp } from '../../externals.js';
import { createRegularPolygon, RegularPolygon3D } from './primitive.js';


createRegularPolygon(
    class extends RegularPolygon3D {
        static get tagName() { return 'cylinder-3d'; }

        static get attributes() {
            return {
                ...super.attributes,
                'sides': {type: Number, default: 16}
            }
        }

        get sides() { return this._sides; }
        set sides(val) {
            if (val != this._sides) {
                // Lets keep the number of sides sane
                val = clamp(val, 8, 32);
                this._sides = this.attributes.sides.type(val);
                this._genFaces(this._faces);
                this.setAttribute('sides', val);
            }
        }
    }
);

