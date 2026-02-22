/**
 * glow-bg.js
 * スクロール位置（画面1枚分ごと）が変わるたびに
 * default.vue と同系色のランダムなグロー背景を生成する
 * 2枚のオーバーレイをクロスフェードして途切れなく切り替える
 */
(function () {
  // 軽量疑似乱数 (mulberry32)
  function rng(seed) {
    seed = seed | 0;
    seed = (seed + 0x6D2B79F5) | 0;
    var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  // default.vue の glow-1/2/3 と同系色
  var COLORS = [
    [241, 78,  50,  0.10],  // $text-header (#F14E32)
    [3,   136, 166, 0.15],  // $link        (#0388A6)
    [255, 229, 102, 0.18],  // $highlight   (#FFE566)
  ];

  var FADE_DURATION = 2000; // ms：クロスフェードの長さ

  function buildBg(section) {
    return COLORS.map(function (c, i) {
      var s = section * 10 + i;
      var x = Math.round(rng(s * 3)     * 100);
      var y = Math.round(rng(s * 3 + 1) * 100);
      var w = Math.round(35 + rng(s * 3 + 2) * 30);
      var h = Math.round(w * 0.8);
      return (
        'radial-gradient(ellipse ' + w + '% ' + h + '% at ' + x + '% ' + y + '%, ' +
        'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + c[3] + '), transparent)'
      );
    }).join(', ');
  }

  function makeLayer() {
    var el = document.createElement('div');
    el.style.cssText = [
      'position:fixed',
      'inset:0',
      'pointer-events:none',
      'z-index:-1',
      'opacity:0',
      'transition:opacity ' + (FADE_DURATION / 1000) + 's ease',
    ].join(';');
    document.body.appendChild(el);
    return el;
  }

  // 2枚のレイヤーを交互に使ってクロスフェード
  var layers = [null, null];
  var active = 0; // 現在表示中のレイヤー番号

  function crossfade(section) {
    var next = 1 - active;

    // 次のレイヤーに新しいグラデーションをセットしてフェードイン
    layers[next].style.backgroundImage = buildBg(section);
    layers[next].style.opacity = '1';

    // 現在のレイヤーをフェードアウト
    layers[active].style.opacity = '0';

    active = next;
  }

  var current = -1;

  function onScroll() {
    var section = Math.floor(window.scrollY / window.innerHeight);
    if (section === current) return;
    current = section;
    crossfade(section);
  }

  function init() {
    layers[0] = makeLayer();
    layers[1] = makeLayer();

    // 初期グラデーションをフェードなしで即表示
    layers[0].style.transition = 'none';
    layers[0].style.backgroundImage = buildBg(0);
    layers[0].style.opacity = '1';
    // 次フレームでトランジションを戻す
    requestAnimationFrame(function () {
      layers[0].style.transition = 'opacity ' + (FADE_DURATION / 1000) + 's ease';
    });

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
