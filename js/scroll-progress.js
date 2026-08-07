<script>
/**
 * scroll-progress.js
 * 記事下の #entry-end に到達するまでのスクロール量を
 * 画面右下の円形プログレスバーで表示する。
 * #entry-end が存在しないページでは何も表示しない。
 */
(function () {
    var RADIUS = 20; // SVG の viewBox 0 0 48 48 に対する半径
    var CIRCUMFERENCE = 2 * Math.PI * RADIUS;

    function init() {
        var entryEnd = document.getElementById("entry-end");
        if (!entryEnd) {
            return;
        }

        var wrap = document.createElement("div");
        wrap.className = "scroll-progress";
        wrap.setAttribute("role", "progressbar");
        wrap.setAttribute("aria-label", "記事の読了率");
        wrap.setAttribute("aria-valuemin", "0");
        wrap.setAttribute("aria-valuemax", "100");
        wrap.innerHTML =
            '<svg class="scroll-progress-ring" viewBox="0 0 48 48" aria-hidden="true">' +
            '<circle class="scroll-progress-track" cx="24" cy="24" r="' + RADIUS + '"></circle>' +
            '<circle class="scroll-progress-bar" cx="24" cy="24" r="' + RADIUS + '"></circle>' +
            "</svg>" +
            '<span class="scroll-progress-label"></span>';
        document.body.appendChild(wrap);

        var bar = wrap.querySelector(".scroll-progress-bar");
        var label = wrap.querySelector(".scroll-progress-label");
        bar.style.strokeDasharray = CIRCUMFERENCE;
        bar.style.strokeDashoffset = CIRCUMFERENCE;

        var lastPercent = -1;

        function update() {
            var scrollY = window.pageYOffset;
            // #entry-end が画面下端に現れた時点を読了（100%）とみなす
            var endOffset = entryEnd.getBoundingClientRect().top + scrollY;
            var goal = endOffset - window.innerHeight;
            var ratio = goal <= 0 ? 1 : Math.min(Math.max(scrollY / goal, 0), 1);
            // 100% は本当に読み終えたときだけ（99.6% などを切り上げない）
            var percent = ratio >= 1 ? 100 : Math.min(99, Math.floor(ratio * 100));

            bar.style.strokeDashoffset = CIRCUMFERENCE * (1 - ratio);

            if (percent !== lastPercent) {
                lastPercent = percent;
                wrap.setAttribute("aria-valuenow", percent);
                if (percent === 100) {
                    label.textContent = "🚀";
                    label.classList.add("completed");
                } else {
                    // 2桁固定（例: 5% -> 05%）
                    label.textContent =
                        (percent < 10 ? "0" + percent : percent) + "%";
                    label.classList.remove("completed");
                }
            }

            wrap.classList.add("visible");
        }

        var ticking = false;
        function onScroll() {
            if (ticking) {
                return;
            }
            ticking = true;
            requestAnimationFrame(function () {
                ticking = false;
                update();
            });
        }

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        // 画像の読み込みで記事の高さが変わるため再計算する
        window.addEventListener("load", onScroll);

        update();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
</script>
