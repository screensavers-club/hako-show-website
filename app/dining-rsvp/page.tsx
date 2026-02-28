import "./menu.css";

export default function DiningRSVP() {
  return (
    <div className="min-h-screen w-screen bg-white flex items-center justify-center px-4 py-16">
      <article className="max-w-md w-full space-y-10">
        <section className="menu-section">
          <h2 className="menu-heading">前菜</h2>
          <div className="menu-dish">
            <h3 className="menu-title">オタオタ</h3>
            <p className="menu-subtitle">魚のカスタード蒸し</p>
            <p className="menu-description">
              鯖のすり身とココナッツミルク、香草を合わせたなめらかなカスタード仕立て。バナナの葉包み蒸し。
            </p>
          </div>
          <div className="menu-dish">
            <h3 className="menu-title">バクワン・クピティン</h3>
            <p className="menu-subtitle">蟹と豚の肉団子スープ</p>
            <p className="menu-description">
              蟹と豚ふたつの肉団子、澄んだ滋味深いスープ仕立て。筍添え。
            </p>
          </div>
        </section>

        <hr />

        <section className="menu-dish">
          <h2 className="menu-heading">お口直し</h2>
          <h3 className="menu-title">
            Salad Slush{" "}
            <span className="text-xs font-normal ml-1">[ノンアル]</span>
          </h3>
          <p className="menu-description">
            ミニトマト、酸梅、オリーブオイル、かき氷
          </p>
        </section>

        <hr />

        <section className="menu-section">
          <h2 className="menu-heading">主菜</h2>
          <div className="menu-dish">
            <h3 className="menu-title">ブフ・レンダン</h3>
            <p className="menu-subtitle">ペラナカン伝統の牛肉スパイス料理</p>
            <p className="menu-description">
              スパイスとハーブ、ココナッツミルクでじっくりと煮詰めたドライカレー仕立て。
            </p>
          </div>
          <div className="menu-dish">
            <h3 className="menu-title">ニョニャ・チャプチャイ</h3>
            <p className="menu-subtitle">ニョニャ風野菜の炊き合わせ</p>
            <p className="menu-description">
              白菜、湯葉、木耳、緑豆春雨の味噌煮＊。
            </p>
          </div>
          <div className="menu-dish">
            <h3 className="menu-title">ソトン・ヒタム</h3>
            <p className="menu-subtitle">イカ／タコの墨炒め</p>
            <p className="menu-description">
              イカ墨とフレッシュハーブ、スパイスペースト炒め。
            </p>
          </div>
          <div className="menu-dish">
            <h3 className="menu-title">ナシ・ウラム</h3>
            <p className="menu-subtitle">ハーブ飯</p>
            <p className="menu-description">
              ジャスミン米のフレッシュハーブとローストココナッツ和え。
            </p>
          </div>
        </section>

        <hr />

        <section className="menu-section">
          <h2 className="menu-heading">お食事のお供</h2>
          <div className="menu-dish">
            <h3 className="menu-title">Herby Baby</h3>
            <p className="menu-description">レモングラス、生姜、ソーダ</p>
          </div>
        </section>

        <hr />

        <section className="menu-section">
          <h2 className="menu-heading">デザート</h2>
          <div className="menu-dish">
            <h3 className="menu-title">サゴ・グラ・マラッカ</h3>
            <p className="menu-subtitle">パームシュガーのサゴヤシスイーツ</p>
            <p className="menu-description">
              ココナッツミルクで寄せたサゴヤシパール、マラッカ産パームシュガーシロップがけ。
            </p>
          </div>
        </section>

        <hr />

        <section className="menu-section">
          <h2 className="menu-heading">食後の一杯</h2>
          <div className="menu-dish">
            <h3 className="menu-title">Orange Brew</h3>
            <p className="menu-description">
              ダックシット・ウーロン（鴨屎香烏龍）コールドブリュー、タンジェリンの皮エキス
            </p>
          </div>
        </section>
      </article>
    </div>
  );
}
