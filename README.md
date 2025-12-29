# Hatena Blog Theme Git

Hatena Blog Theme Gitは[Gitの公式ページ](https://git-scm.com/about)を参考にしたデザインテーマです。

# Getting Start

デザインテーマの制作にあたっては下記ヘルプページも参考にしてください。

- [デザインテーマ制作の手引き - はてなブログ ヘルプ](https://help.hatenablog.com/entry/theme/custom-theme)

## 必須コンポーネント

- [Node.js](https://nodejs.org/)

## モジュールのインストール

``` console
$ npm install
```

## 開発サーバーの利用

開発サーバーを利用することで、SCSSの変更をリアルタイムにブログに反映させながらテーマの開発を行えます。

まずは[はてなブログ](https://blog.hatena.ne.jp/)の設定を行います。

1. テーマの動作確認に使うブログを1つ用意します。（普段お使いのブログとは別にブログを作成してください。）
2. 1.のブログの「デザイン設定」にアクセスし、「カスタマイズ」タブの「デザインCSS」の内容を下記に置き換えて保存します。
    ``` css
    /* Responsive: yes */
    ```
3. 1.のブログの「設定」->「詳細設定」にアクセスし、「&lt;head&gt;要素にメタデータを追加」を下記に置き換えて保存します。
    ``` html
    <script type="module" src="http://localhost:5173/@vite/client" crossorigin="anonymous"></script>
    <link rel="stylesheet" type="text/css" href="http://localhost:5173/scss/boilerplate.scss" crossorigin="anonymous" />
    ```

つづいて下記のコマンドで、開発サーバーを起動します。`BLOG_DOMAIN_NAME` の部分には、上で用意した動作確認に使うブログのドメイン名 (例: `example.hatenablog.com`) を入力してください。

``` console
$ npm start -- BLOG_DOMAIN_NAME
```

コマンド実行例:

``` console
$ npm start -- example.hatenablog.com
```

以上が完了すると、動作確認用のブログに開発中のテーマが反映されます。ブログにアクセスし、表示を確認しながらテーマの開発を行なってください。

## コンパイル

テーマの開発が完了したら、下記のコマンドでSCSSをコンパイルします。コンパイルの結果は `build/boilderplate.css` に出力されます。

``` console
$ npm run build
```
