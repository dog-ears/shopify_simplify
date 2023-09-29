"use strict";
class SectionHeader {
    constructor(rootEl) {
        this.rootEl = rootEl;
        this.rootId = rootEl.getAttribute("id") ?? '';
        this.init();
    }
    init() {
        // js-hamburger-state 初期化
        this.rootEl.setAttribute('js-hamburger-state', 'close');
        // メニューDOMの複製
        const menuEl = this.rootEl.querySelector('[js-menu]');
        if (menuEl) {
            let menuSpEl = menuEl.cloneNode(true);
            menuSpEl.className = 'menuSp';
            this.rootEl.appendChild(menuSpEl);
        }
        // メニュークリック処理
        this.rootEl.querySelectorAll('[js-menu] [js-menu-state] > a').forEach((el) => {
            el.addEventListener("click", (e) => {
                e.preventDefault();
                // 親要素が取得できなかったら、なにもしない
                if (!el.parentElement)
                    return false;
                // 現在の状態とlevelを取得
                let state = el.parentElement.getAttribute("js-menu-state");
                let level = el.parentElement.getAttribute("js-menu-level");
                // stateがclose、かつ、level1なら、開いているlevel1をcloseする
                if (state == 'close' && level == '1') {
                    el.closest('[js-menu]')?.querySelector('[js-menu] [js-menu-state="open"][js-menu-level="1"]')?.setAttribute('js-menu-state', 'close');
                }
                // open/closeのトグル
                el.parentElement.setAttribute('js-menu-state', state === 'open' ? 'close' : 'open');
            });
        });
        // メニュー外クリック処理
        document.addEventListener('click', (e) => {
            // 開いているlevel1メニューの取得
            let openedMenu = this.rootEl.querySelector('[js-menu] [js-menu-state="open"][js-menu-level="1"]');
            // 開いているlevel1メニューがなければ何もしない
            if (!openedMenu)
                return false;
            // targetの取得
            let target = e.target;
            // level1メニューをクリックしていたら、何もしない
            if (target.closest('li')?.getAttribute('js-menu-level') === '1')
                return false;
            // 開いているlevel1メニューの子以外をクリックしていたら、閉じる
            if (!target.closest(`#${this.rootId} [js-menu] [js-menu-state="open"][js-menu-level="1"] > ul`)) {
                this.rootEl.querySelector('[js-menu] [js-menu-state="open"][js-menu-level="1"]')?.setAttribute("js-menu-state", "close");
            }
        });
        // 検索ボタンクリック処理
        this.rootEl.querySelector('[js-search] > a')?.addEventListener("click", (e) => {
            e.preventDefault();
            this.rootEl.querySelector('[js-search]')?.setAttribute("js-search-modal-state", 'open');
            // スクロール固定
            document.getElementsByTagName('body')[0].setAttribute("js-overflow-hidden", "true");
        });
        // 検索モーダル閉じるボタンクリック処理
        this.rootEl.querySelector('[js-search-close]')?.addEventListener("click", (e) => {
            e.preventDefault();
            this.rootEl.querySelector('[js-search]')?.setAttribute("js-search-modal-state", 'close');
            // スクロール固定解除
            document.getElementsByTagName('body')[0].setAttribute("js-overflow-hidden", "false");
        });
        // ハンバーガーメニュー（開く）クリック処理
        this.rootEl.querySelector('[js-hamburger-open]')?.addEventListener("click", (e) => {
            console.log('ハンバーガーひらく');
            e.preventDefault();
            this.rootEl.setAttribute('js-hamburger-state', 'open');
            // スクロール固定
            document.getElementsByTagName('body')[0].setAttribute("js-overflow-hidden", "true");
        });
        // ハンバーガーメニュー（閉じる）クリック処理
        this.rootEl.querySelector('[js-hamburger-close]')?.addEventListener("click", (e) => {
            e.preventDefault();
            this.rootEl.setAttribute('js-hamburger-state', 'close');
            // スクロール固定
            document.getElementsByTagName('body')[0].setAttribute("js-overflow-hidden", "false");
        });
        // ハンバーガーメニュー外クリック処理
        document.addEventListener('click', (e) => {
            console.log('ハンバーガー以外がクリックされた');
            // 開いているハンバーガーメニューがなければ何もしない
            if (this.rootEl.getAttribute('js-hamburger-state') != 'open')
                return false;
            // targetの取得
            let target = e.target;
            // 開いているlevel1メニューの子以外、かつ、ハンバーガーメニュー以外をクリックしていたら、閉じる
            if (!target.closest(`#${this.rootId} .menuSp`) && !target.closest(`#${this.rootId} [js-hamburger-open]`)) {
                this.rootEl.setAttribute("js-hamburger-state", "close");
            }
        });
    }
}
//# sourceMappingURL=SectionHeader.js.map