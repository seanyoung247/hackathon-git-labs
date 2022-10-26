
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
    }
}