# LINE Things Starter - LIFF App

LINE Things Starter 向け LIFF アプリのサンプルコードです。
初期状態の Starter ファームウェアで動作する LIFF アプリのコードが含まれています。

IoTでより細かな動作をさせるためのNumberデータを送れるように改修しています。

## Setup

Developer Trial を利用して開発をするには、`liff.js` に書かれた `USER_SERVICE_UUID` を生成された Service UUID に書き換えてください。

## Publish LIFF App using GitHub Pages

このディレクトリに含まれる LIFF アプリは、GitHub Pages を利用して、LIFF アプリをホストして開発することも出来ます。

1. GitHub 上でリポジトリを Fork
2. GitHub Pages の設定から "Source" に "master branch" を選択
3. 公開された GitHub Pages の URL に `liff-app-temp-value/` を足したものを、LIFF エンドポイント URL に設定
(例: https://line.github.io/line-things-starter/liff-app/)

## obnizを動作させる

Developer Trial を利用して開発をするには、`obniz.js` に書かれた `USER_SERVICE_UUID` を生成された Service UUID に書き換えてください。

`YOUR_OBNIZ_ID_HERE` を動作させたいobniz IDに変更します。

`obniz.js` を実行して obniz を動作させます。

## Reference

LIFF 上で利用できる LINE Things 向け Bluetooth LE プラグイン API の詳細は、以下のドキュメントを参照してください。

https://developers.line.biz/ja/reference/line-things/
