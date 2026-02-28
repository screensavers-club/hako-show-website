"use client";

import { useState, useEffect } from "react";
import DrinkPicker from "./DrinkPicker";

export default function MenuPopover() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-base underline underline-offset-2 hover:text-gray-600 cursor-pointer transition-colors"
      >
        メニューを見る
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] bg-white shadow-2xl overflow-y-auto overscroll-contain animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="sticky top-0 z-10 bg-white pt-3 pb-2">
              <div className="mx-auto h-1 w-10 rounded-full bg-gray-300" />
            </div>

            <div className="px-6 pb-10 space-y-8">
              <div className="px-6 pb-10">
                <h1 className="menu-main-heading">
                  プライベートダイニング
                  <br />
                  コースメニュー
                  <br />
                  ¥10,700 / おひとり様
                </h1>
              </div>

              <hr />
              <section className="menu-section">
                <h2 className="menu-heading">前菜</h2>
                <div className="menu-dish">
                  <h3 className="menu-title">Otak-Otak オタオタ</h3>
                  <p className="menu-subtitle">魚のカスタード蒸し</p>
                  <p className="menu-description">
                    鯖のすり身とココナッツミルク、香草を合わせたなめらかなカスタード仕立て。バナナの葉包み蒸し。
                  </p>
                </div>
                <div className="menu-dish">
                  <h3 className="menu-title">
                    Bakwan Kepiting Soup バクワン・クピティン
                  </h3>
                  <p className="menu-subtitle">蟹と豚の肉団子スープ</p>
                  <p className="menu-description">
                    蟹と豚ふたつの肉団子、澄んだ滋味深いスープ仕立て。筍添え。
                  </p>
                </div>
              </section>

              <hr />

              <section className="menu-section">
                <h2 className="menu-heading">お口直し</h2>
                <DrinkPicker
                  items={[
                    {
                      title: "Salad Slush",
                      description: "ミニトマト、酸梅、オリーブオイル、かき氷",
                      badge: "ノンアル",
                    },
                  ]}
                />
              </section>

              <hr />

              <section className="menu-section">
                <h2 className="menu-heading">主菜（シェアプレート）</h2>
                <p className="menu-heading-note">
                  テーブルを囲んでお分けしながら
                </p>
                <div className="menu-dish">
                  <h3 className="menu-title">Beef Rendang ブフ・レンダン</h3>
                  <p className="menu-subtitle">
                    ペラナカン伝統の牛肉スパイス料理
                  </p>
                  <p className="menu-description">
                    スパイスとハーブ、ココナッツミルクでじっくりと煮詰めたドライカレー仕立て。
                  </p>
                </div>
                <div className="menu-dish">
                  <h3 className="menu-title">
                    Nyonya Chap Chye ニョニャ・チャプチャイ
                  </h3>
                  <p className="menu-subtitle">ニョニャ風野菜の炊き合わせ</p>
                  <p className="menu-description">
                    白菜、湯葉、木耳、緑豆春雨の味噌煮。
                  </p>
                </div>
                <div className="menu-dish">
                  <h3 className="menu-title">Sotong Hitam ソトン・ヒタム</h3>
                  <p className="menu-subtitle">イカ／タコの墨炒め</p>
                  <p className="menu-description">
                    イカ墨とフレッシュハーブ、スパイスペースト炒め。
                  </p>
                </div>
                <div className="menu-dish">
                  <h3 className="menu-title">Nasi Ulam ナシ・ウラム</h3>
                  <p className="menu-subtitle">ハーブ飯</p>
                  <p className="menu-description">
                    ジャスミン米のフレッシュハーブとローストココナッツ和え。
                  </p>
                </div>
              </section>

              <hr />

              <section className="menu-section">
                <h2 className="menu-heading">お食事のお供</h2>
                <DrinkPicker
                  items={[
                    {
                      title: "Herby Baby",
                      description: "レモングラス、生姜、ソーダ",
                      badge: "ノンアル",
                    },
                    {
                      title: "Bitter Sour",
                      description:
                        "ゴーヤ、酸梅、氷砂糖、ジン、エッグホワイトフォーム",
                      badge: "アルコル",
                    },
                    {
                      title: "Fresh Paloma",
                      description:
                        "純米大吟醸酒、みかん、ソーダ、アガベシロップ、ライム",
                      badge: "アルコル",
                    },
                  ]}
                />
              </section>

              <hr />

              <section className="menu-section">
                <h2 className="menu-heading">手仕込み薬味</h2>
                <div className="menu-dish">
                  <h3 className="menu-title">
                    Seasonal Nyonya Achar ニョニャ・アチャール
                  </h3>
                  <p className="menu-subtitle">季節の甘辛漬け</p>
                  <p className="menu-description">
                    季節野菜の漬物、落花生、胡麻、スパイスペースト和え。
                  </p>
                </div>
                <div className="menu-dish">
                  <h3 className="menu-title">
                    Shishito Sambal Ijo シシトウ・サンバル・イジョ
                  </h3>
                  <p className="menu-subtitle">
                    シシトウ仕立てのチリレリッシュ
                  </p>
                  <p className="menu-description">
                    シシトウ、トマト、エシャロット、ニンニク、ライムを合わせたチリレリッシュ。
                  </p>
                </div>
                <div className="menu-dish">
                  <h3 className="menu-title">
                    Sambal Belacan サンバル・ブラチャン
                  </h3>
                  <p className="menu-subtitle">赤唐辛子のサンバル</p>
                  <p className="menu-description">
                    鷹の爪とニンニク、発酵海老ペースト仕立てのチリレリッシュ。
                  </p>
                </div>
              </section>

              <hr />

              <section className="menu-section">
                <h2 className="menu-heading">デザート</h2>
                <div className="menu-dish">
                  <h3 className="menu-title">
                    Sago Gula Melaka サゴ・グラ・マラッカ
                  </h3>
                  <p className="menu-subtitle">
                    パームシュガーのサゴヤシスイーツ
                  </p>
                  <p className="menu-description">
                    ココナッツミルクで寄せたサゴヤシパール、マラッカ産パームシュガーシロップがけ。
                  </p>
                </div>
              </section>

              <hr />

              <section className="menu-section">
                <h2 className="menu-heading">食後の一杯</h2>
                <DrinkPicker
                  items={[
                    {
                      title: "Orange Brew",
                      description:
                        "ダックシット・ウーロン（鴨屎香烏龍）コールドブリュー、タンジェリンの皮エキス",
                      badge: "ノンアル",
                    },
                    {
                      title: "Dark Roast Coffee",
                      description: "深煎りコーヒー",
                      badge: "ノンアル",
                    },
                  ]}
                />
              </section>

              <hr />

              <p className="foot">
                本メニューには以下のアレルゲンが含まれます。
                <br />
                えび・貝類／ナッツ類（ピーナッツ、カシューナッツ）／小麦／大豆／卵／ごま
                アレルギーをお持ちのお客様は、スタッフまでお申し付けください。
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
