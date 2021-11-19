import css from 'dom-css';
let scrollbarWidth = false;

export default function getScrollbarWidth(cacheEnabled = true) {
    if (cacheEnabled && scrollbarWidth !== false) return scrollbarWidth;
    /* istanbul ignore else */
    if (typeof document !== 'undefined') {
        const div = document.createElement('div');
        css(div, {
            width: 100,
            height: 100,
            position: 'absolute',
            top: -9999,
            overflow: 'scroll',
            MsOverflowStyle: 'scrollbar'
        });

        const divInner = document.createElement('div');
        css(divInner, {
            width: '100%',
            height: '100%',
        });

        div.appendChild(divInner);
        document.body.appendChild(div);

        const divWidth = div.getBoundingClientRect().width;
        const divInnerWidth = divInner.getBoundingClientRect().width;
        scrollbarWidth = divWidth - divInnerWidth;

        document.body.removeChild(div);
    } else {
        scrollbarWidth = 0;
    }
    return scrollbarWidth || 0;
}
