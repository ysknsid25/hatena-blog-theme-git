/**
 * insert-ads.js
 * .archive-entries 内の <section> 要素の 3 つおきに
 * Google AdSense 広告ユニットを挿入する
 */
(function () {
    var AD_CLIENT = "ca-pub-5013277787942432";
    var AD_SLOT = "5107587794";
    var INTERVAL = 4; // 何 section おきに広告を挿入するか

    function createAdUnit() {
        var wrap = document.createElement("div");
        wrap.style.marginBottom = "32px";

        var ins = document.createElement("ins");
        ins.className = "adsbygoogle";
        ins.style.display = "block";
        ins.dataset.adClient = AD_CLIENT;
        ins.dataset.adSlot = AD_SLOT;
        ins.dataset.adFormat = "auto";
        ins.dataset.fullWidthResponsive = "true";
        wrap.appendChild(ins);

        return wrap;
    }

    function insertAds() {
        var container = document.querySelector(".archive-entries");
        if (!container) return;

        var sections = container.querySelectorAll(":scope > section");
        if (sections.length === 0) return;

        // adsbygoogle スクリプトをまだ読み込んでいなければ 1 回だけ挿入
        if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
            var s = document.createElement("script");
            s.async = true;
            s.src =
                "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" +
                AD_CLIENT;
            s.crossOrigin = "anonymous";
            document.head.appendChild(s);
        }

        // section の INTERVAL 番目の直後に広告を挿入（末尾には挿入しない）
        for (var i = INTERVAL - 1; i < sections.length - 1; i += INTERVAL) {
            var ad = createAdUnit();
            sections[i].insertAdjacentElement("afterend", ad);
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", insertAds);
    } else {
        insertAds();
    }
})();
