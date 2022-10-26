
import { createComponent, createTemplate, WebComponent } from '../../externals.js';

(() => {

    const styles = `
        slot {
            display: flex;
            perspective: 1500px;
            transform-style: preserve-3d;
        }
    `;

    const html = `<slot></slot>`;

    class Scene3D extends WebComponent {
        static get tagName() { return 'scene-3d'; }
        constructor() {
            super();
            this._createShadow({mode: 'open'});
        }
    }

    const template = createTemplate(html, styles);
    createComponent(Scene3D, template);

})();