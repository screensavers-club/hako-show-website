export type EmbeddedQuote = {
  title_en: string;
  title_ja: string;
  en: string;
  ja: string;
  insertAfterParagraph: number;
};

export type Section = {
  id: number;
  title_en: string;
  title_ja: string;
  author: string | null;
  english: string;
  japanese: string;
  embeddedQuote?: EmbeddedQuote;
};

export const sections: Section[] = [
  {
    id: 1,
    title_en: "About This Exhibition",
    title_ja: "この展示について",
    author:
      "Lisa Yamamoto / 山本梨沙 (Kotomath Hyogomachi / コトマス兵庫町)",
    english:
      'This exhibition began with a meeting with Singaporean artist Kelly Jin Mei. I first met her when my family visited Singapore before the pandemic. Later, in 2024, she held a solo exhibition at Kotomath Hyogomachi. The following year, while staying at my guesthouse, she introduced me to a number of creatives from Singapore. The conversations and connections that grew out of those exchanges led to this group exhibition, "HAKO". This exhibition is not just about the artworks. It is a project that arose from the relationships between people.',
    japanese:
      "本展は、シンガポールのアーティスト、ケリー・ジン・メイとの出会いから始まりました。コロナ前、家族でシンガポールを訪れた際に彼女と出会い、その後、2024年にコトマス兵庫町にて個展を開催。さらに翌年には、私のゲストハウスに滞在しながら、シンガポールのクリエイターたちを紹介してくれました。その交流の中で生まれた会話とつながりが、今回のグループ展「はこ」へとつながっています。この展示は、作品だけでなく、人と人との関係から立ち上がったプロジェクトです。",
  },
  {
    id: 2,
    title_en: "The Box as a Metaphor for Self",
    title_ja: "箱──自己のメタファーとして",
    author: "TEXT BY Kelly Jin Mei / テキスト：ケリー・ジン・メイ",
    english:
      'In this exhibition titled HAKO（はこ）held in Kotomath Hyogomachi in Takamatsu (Japan) from 24 March - 19 April 2026, 6 Singaporean creatives: Chong Wah (graphic design / graffiti), Wu Yanrong (painting), Kelly Jin Mei (sculpture), Siah (interactive), Gravy Baby aka Carmen Chen (culinary) and Ken (drinks) were invited to respond to the theme, "BOX".\n\nThe eternal attempt to understand and determine the mystique behind someone\'s behavior is what gives "Personality Tests" their unwavering appeal. "Imagine a cube," one begins, "its size, appearance, and where it is."*¹ No two answers seem to be exact. Regardless of its accuracy, one thing this test proves is that a seemingly basic object can take on countless iterations. Now, replace the cube in that question with a "box". Must it still have 6 sides? What is its shape? How large is it?\n\nWhile each of the participating creatives expresses themselves in a different medium for this show, they hold one similarity: their past experience spans various disciplines that inform their current practice. Considering the exhibition site in Takamatsu, Japan, the exhibition is named HAKO（はこ） ("box" in Japanese). The choice of writing in Japanese Hiragana is deliberate: the phonetic characters are less definitive than the Japanese Kanji, with a seemingly fluid boundary that inspires various interpretations of this platonic form.\n\nTo move. To keep away. To contain. To house.\n\nBoxes, in their functional form, are ultimately vessels. While they exist to contain or protect their contents, they also keep their contents from knowing the world outside. Boxes are metaphorical boundaries that can be drawn and reshaped; wide as a nation, small enough to fit on your palm. They could be flimsy and disposable; more valuable than that which sits within; invisible but strong enough to motivate behaviour and ascribe identity. They could even develop meaning only after they have been opened, or only if they remain closed.',
    japanese:
      "本展「HAKO（はこ）」は、2026年3月24日から4月19日まで、高松市のコトマス兵庫町にて開催されます。シンガポールから6名のクリエイターが参加しています。チョン・ワー（グラフィックデザイン／グラフィティ）、ウー・イェンロン（絵画）、ケリー・ジン・メイ（彫刻）、シア（インタラクティブ）、グレイビー・ベイビーことカルメン・チェン（料理）、そしてケン（ドリンク）。それぞれが「BOX（箱）」というテーマに応答するよう招かれました。\n\n人の行動の背後にある神秘を理解し、見極めようとする永遠の試み。それこそが「性格テスト」の揺るぎない魅力の源です。あるテストはこう始まります。「一つの立方体を思い浮かべてください。その大きさ、見た目、そしてそれがどこにあるかを。」*¹ 同じ答えは二つとないようです。その正確さはさておき、このテストが証明していることが一つあります。それは、一見シンプルな物体が、無数のかたちをとりうるということです。では、その問いの中の「立方体」を「箱」に置き換えてみてください。それは6つの面を持たなければならないでしょうか？ どんな形をしていますか？ どのくらいの大きさですか？\n\n参加クリエイターたちはそれぞれ異なる表現媒体を用いていますが、一つの共通点があります。それは、現在の実践の土台となる多様な分野での経験を持っているということです。展示会場が日本の高松であることを踏まえ、本展は「HAKO（はこ）」と名付けられました。ひらがなで表記したのは意図的な選択です。表音文字であるひらがなは、漢字ほど意味が限定されず、その流動的な境界線が、このプラトン的形態に対するさまざまな解釈を喚起してくれるからです。\n\n運ぶ。仕舞う。込める。宿す。\n\n箱は、その機能的な形において、究極的には器です。中身を収め、守るために存在する一方で、中にあるものを外の世界から遠ざける役割も果たしています。箱は比喩的な境界線であり、描き直すことも、形を変えることもできます。国ほど広くもなれば、手のひらに収まるほど小さくもなる。脆くて使い捨てのものもあれば、中身よりも価値のあるものもある。目に見えなくとも、行動を動機づけ、アイデンティティを規定するほどの強さを持つこともあります。開けられて初めて意味を持つものもあれば、閉じられたままでこそ意味を持つものもあるのです。",
  },
  {
    id: 3,
    title_en: "Reshaping functionality",
    title_ja: "機能の再構築",
    author: null,
    english:
      'Incidentally, the box has always held a special place in Japanese society since historical times, redefining what could be known as "packaging". From those in everyday uses such as the bento-bako (lunch box), to the lacquered tomobako (accompanying box) bestowed as a form of respect to the aristocracy, the Japanese Box extends far beyond its function as a vessel, becoming a symbol of Japanese craftsmanship, culture, and philosophy².',
    japanese:
      "箱は、歴史的にも日本社会において特別な位置を占めてきました。それは「包装」という概念そのものを再定義するものでもあります。日常的に使われる弁当箱から、貴族への敬意を込めて贈られた漆塗りの共箱に至るまで、日本の箱は器としての機能をはるかに超え、日本の職人技、文化、そして哲学の象徴となっています²。",
  },
  {
    id: 4,
    title_en: "A box, housing knowledge",
    title_ja: "知を宿す箱",
    author: "Siah / シア",
    english:
      'For many children in the 90s, encountering our first PC (Personal Computer) was magical. The decidedly dull-looking grey box housed whole new worlds; as we grew up alongside technology watching the form of that box transform over time, it has become almost an extension of our bodies, similar also in the way few of us understand what makes things tick beneath the surface.\n\nSquare is a reflection on this relationship we have with technology, and Siah\'s interpretation of the "black box"—an entity which inner workings remain elusive. From afar, the audience is drawn to a pulsing choreography of dancing light illuminating concentric circle patterns, reminding one of the touch of breeze upon a silent lake. What they are seeing is in fact an LED "screen", which cues connections between each "pixel" emulating the surface of water—a liquid veil obscuring its depths.\n\nAs one who learns through the act of making, Siah revels in the act of creating "badly", valuing experience and embodied knowledge over the "efficiency" we have learnt to expect from technology. Using packing staples such as cardboard, tape and hot glue, the rudimentary structure holds 3D-printed squares and electronic parts purchased from hobby shops. By reducing the "black box" to a spectacle with its structure deliberately exposed, Siah offers an illuminating peek into comprehending the inaccessible world behind technology.',
    japanese:
      "90年代に子ども時代を過ごした多くの人にとって、初めてPC（パーソナルコンピュータ）に出会った体験は魔法のようなものでした。あの無骨な灰色の箱の中には、まったく新しい世界が広がっていたのです。テクノロジーとともに成長し、その箱の形が変貌していくのを見守るうちに、それは私たちの身体の延長のような存在になりました。その内部で何が動いているのか、ほとんどの人が理解していないという点においても、私たちの身体と似ています。\n\nSquare は、私たちとテクノロジーとの関係を映し出す作品であり、シアによる「ブラックボックス」の解釈です。その内部の仕組みは依然として謎に包まれた存在。遠くから見ると、観客は同心円のパターンを照らしながら踊る光の脈動する振り付けに引き寄せられます。それは静かな湖面にそよ風が触れたかのようです。実際に見ているのはLEDの「スクリーン」であり、各「ピクセル」間の接続が水面を模倣しています。深淵を覆い隠す液体のヴェールのように。\n\nつくる行為を通じて学ぶ人であるシアは、「下手に」つくることを楽しみ、テクノロジーに期待するようになった「効率」よりも、経験と身体化された知を大切にしています。段ボール、テープ、ホットグルーといった梱包の定番素材を使い、3Dプリントされた正方形と趣味の店で購入した電子部品を収めた素朴な構造体をつくり上げました。「ブラックボックス」を、その構造をあえて露出させたスペクタクルへと還元することで、シアはテクノロジーの背後にあるアクセス不可能な世界を理解するための、示唆に富んだ一瞥を提供しています。",
  },
  {
    id: 5,
    title_en: "A box, confining Nothingness",
    title_ja: "無を閉じ込める箱",
    author: "Wu Yanrong / ウー・イェンロン",
    english:
      'In Wu Yanrong\'s painting, the eye is drawn immediately to each singular object centred within the confines of the paper edge. Yet, these sea creatures seemingly pulse with life through the ebb and flow of deliberate brushstrokes, holding an energy undeterred by the canvas framing them. The "box" thus serves only to "catch" them as we would catch a glimpse. This momentary gaze travels naturally from the dense coalescence of paint in a tight curve forming the octopus\'s head in GUN, following the flick of each individual arm flaunting their dexterity, before landing on the menacing glint of the lively eye. The unrestrained spattering of dots on the fish in 1100 is a fleeting reflection of light on scales. In her creatures, reality is secondary; essence is paramount.\n\nWu Yanrong\'s background in Chinese calligraphy shines through the confidence of each stroke—no doubt the result of countless experiments. What looms before us is the concentration of practice, extended from mind to body, and finally through the tip of the brush.\n\nChinese painting has often been defined by its use of "虚", translated to mean the "void" or "nothingness"—one of the cornerstones of Dao philosophy⁴. Similarly, the use of a box is in the space it "contains". Allowing space for the audience to interpret meaning from a lack of detail is seen as genius, and achievable only through stoic observation of the living subject. Ironically, the artist encountered these subjects at the seafood wholesale marketplace in Takamatsu—chaos to the unfamiliar observer, systematic to those whose livelihoods depend on it, and a death sentence to the beings confined to their styrofoam prisons. Yet, she erases these physical boundaries with the calm of the void, lifting only the vitality of the creatures in a moment where their future remains unknown, and laying them down on a sheet.',
    japanese:
      "ウー・イェンロンの絵画では、紙の縁という境界の中に据えられた一つひとつの対象に、視線がすぐに引き寄せられます。しかし、それらの海の生きものたちは、意図的な筆致の満ち引きを通じて生命の脈動を感じさせ、キャンバスという枠に阻まれることのないエネルギーを宿しています。ここでの「箱」は、ちらりと目に留めるように、ただそれらを「捉える」ためだけに存在しています。この束の間のまなざしは、GUNにおけるタコの頭を形づくる絵具の密な集積から自然に移動し、それぞれの腕がしなやかさを誇示するように跳ねる動きを追い、やがて生き生きとした目の不穏な輝きへとたどり着きます。1100における魚の上に奔放に散らされた点は、鱗に映る光の一瞬の反射です。彼女の描く生きものにおいて、写実は二の次であり、本質こそが最も重要なのです。\n\nウー・イェンロンの中国書道の素養は、一筆一筆の確信に満ちた運びに表れています。それは無数の実験の結果であることに疑いはありません。私たちの前に立ち現れるのは、精神から身体へ、そして最後に筆先を通じて延びてゆく、鍛錬の凝縮です。\n\n中国絵画はしばしば「虚」の使用によって定義されてきました。「虚」とは「空（くう）」あるいは「無」を意味し、道教哲学の礎石の一つです⁴。同様に、箱の用途は、それが「内包する」空間にあります。細部の欠如から意味を読み取る余白を鑑賞者に委ねることは、天才的な技とされ、生きた対象に対する禁欲的な観察によってのみ到達しうるものです。皮肉なことに、このアーティストは高松の水産物卸売市場でこれらの対象と出会いました。馴染みのない者にとっては混沌であり、生計を立てる者にとっては秩序であり、発泡スチロールの牢獄に閉じ込められた生きものたちにとっては死の宣告である場所です。しかし彼女は、虚の静けさをもってその物理的な境界を消し去り、未来がまだ定まらぬ一瞬における生きものたちの生命力だけを掬い上げ、一枚の紙の上に置くのです。",
    embeddedQuote: {
      title_en: "The Uses of Not",
      title_ja: "「無」の用",
      en: "Hollowed out,\nclay makes a pot.\nWhere the pot's not,\nis where it's useful.\n\nCut doors and windows\nto make a room.\nWhere the room isn't\nthere's room for you.\n\nSo the profit in what is\n*Is in the use of what isn't.*³",
      ja: "うつろにして\n土は器となる。\n器でないところにこそ\n器の用がある。\n\n戸や窓をうがって\n部屋をつくる。\n部屋でないところにこそ\n人の居場所がある。\n\n「有」の利は\n*「無」の用にある。*³",
      insertAfterParagraph: 2,
    },
  },
  {
    id: 6,
    title_en: "A box, objectifying risk and motion",
    title_ja: "リスクと動きを物象化する箱",
    author: "Chong Wah / チョン・ワー",
    english:
      'Inversely, one might struggle to locate the void in Chong Wah\'s work; or even the subject, at first glance. Slipping from the minimalism in Wu Yanrong\'s canvases to his dynamic lines that ping from edge to edge is akin to waking from a meditative state straight into a sports arena. Drawing from the flow of motion, the sharp angles and tight intersections of his lines are an exercise in ordered randomness, holding excitement brinking on an anxiety barely contained within its frame. Using his current obsession with motorcycles as a point of fascination, Chong Wah captures the machine not just as a stationary lump of metal, but as a presence encapsulating its noise, motion, and individual character.\n\nThe common warning in Chinese to those who ride motorcycles in Singapore is this: "駕車是鐵包人，駕摩托車是人包鐵"—in a car the human is "wrapped" in a metal box; but on the motorbike, the metal is "wrapped" by the human, unprotected outside the enclosure. The thrill that comes with this risk is echoed in the spontaneity of the artist\'s lines, a style cultivated from his ongoing graffiti practice. The limited lifespan of graffiti in public spaces is of unsaid consensus among the players; sparking from an impromptu decision during set-up, Chong Wah\'s lines splay out from his "canvases" with painter\'s tape, forming a temporary "mural" that unapologetically inhabits the exhibition space.\n\nLooking at his busy compositions that strain against stillness, one might recall the Futurism movement in art (1909). Perceiving the world to be in constant movement, it was the only modern art movement that used motorcycles as a subject matter, commonly expressing "lines of force", which intend to convey the directional tendencies of objects through space; "simultaneity," which combines memories, present impressions and anticipation of future events; and "emotional ambience" in which the artist seeks by intuition to link sympathies between the exterior scene and interior emotion⁵. While it is clear the Futurists celebrated the abstract expression of speed and noise like Chong Wah, the latter\'s artworks seem to deviate in its containment of this energy; lines bounding around, then returning into a single entity. Ironically, while the Futurists fought to leave the canvas explosively, Chong Wah has shaped that box around his solitary compositions by redefining the canvas itself.',
    japanese:
      "逆に、チョン・ワーの作品の中に虚を見出すのは難しいかもしれません。それどころか、一見しただけでは対象すら判然としないでしょう。ウー・イェンロンのキャンバスのミニマリズムから、端から端へと弾け飛ぶ彼のダイナミックな線へと移ることは、瞑想の状態からいきなりスポーツアリーナに目覚めるようなものです。動きの流れに着想を得て、鋭い角度と緊密に交差する線は、秩序ある無作為の実践であり、フレームの中にかろうじて収まった、不安すれすれの興奮を宿しています。現在のバイクへの執着を魅了の起点として、チョン・ワーはマシンを単なる静止した金属の塊としてではなく、その騒音、動き、個性を内包する存在として捉えます。\n\nシンガポールでバイクに乗る人に向けた中国語の定番の警告はこうです。「駕車是鐵包人，駕摩托車是人包鐵」。車では人間が金属の箱に「包まれ」ているが、バイクでは金属が人間に「包まれ」ており、囲いの外で無防備だということです。このリスクに伴うスリルは、アーティストの線の即興性に反映されており、それは現在も続くグラフィティの実践から培われたスタイルです。公共空間におけるグラフィティの限られた寿命は、プレイヤーたちの間での暗黙の了解です。設営中の即興的な判断から生まれたチョン・ワーの線は、ペインターズテープを用いて「キャンバス」の外へと広がり、展示空間を堂々と占拠する一時的な「壁画」を形成しています。\n\n静止に抗うかのような彼の躍動的な構図を見ると、芸術における未来派の運動（1909年）を想起する人もいるかもしれません。世界は常に運動しているという認識に立ち、バイクを主題として用いた唯一の近代芸術運動でした。未来派が一般的に表現したのは、空間を通じた物体の方向的傾向を伝える「力線」、記憶と現在の印象と未来の予測を統合する「同時性」、そして外部の情景と内面の感情の間に直感的に共感を結ぼうとする「感情的雰囲気」です⁵。未来派がチョン・ワーと同様にスピードと騒音の抽象的表現を礼賛したことは明らかですが、後者の作品はそのエネルギーの封じ込め方において異なります。線は跳ね回り、やがて一つの実体へと回帰します。皮肉なことに、未来派が爆発的にキャンバスから飛び出そうとしたのに対し、チョン・ワーはキャンバスそのものを再定義することで、孤独な構図の周囲に箱を形づくったのです。",
  },
  {
    id: 7,
    title_en: "A box, a fragile conundrum",
    title_ja: "脆い難問としての箱",
    author: "Kelly Jin Mei / ケリー・ジン・メイ",
    english:
      'Boxes might house a delicate item, protecting it; but what about boxes which are precious in themselves, such as Fabergé eggs? Kelly Jin Mei\'s sculpture titled JPY50,000 (SGD414.94) is a contemplation on the value of Time. This "box" holds 5 JPY10,000 bank notes, visible through the gap in its "walls", and is selling for the price stated in its title⁶. The catch: the box has to be destroyed in order for you to access the bank notes. While this sounds like a simple enough feat, a closer look would reveal the nature of its uncanny material—a familiar, squeaky sheen, hundreds if not thousands of fibre ends sticking out rebelliously—it is hair. The artist used strands of her own hair collected over a period of 2 years, which were braided into a web encapsulating the trapped money. While hair costs nothing and is accessible to most human beings, its length is a reflection of time having passed, and its intricate braids evidence of laborious craft.\n\nIn her practice, Jin Mei often plays with paradoxes that nudge the audience into questioning their own perception of value. If hair and labour have no material value, why would one hesitate to purchase the sculpture, then destroy it to recoup losses? Does having ownership give you the right to destroy something? The artist has often played both the role of maker and destroyer in previous work, using that to observe empathy in the viewers. Now, she invites the audience to be in that position, sitting on the fulcrum. What would have to be sacrificed in exchange for the JPY50,000? The artist uses this conundrum to demonstrate "Soft Power" over "Hard Power", hinting at the effectiveness of emotional manipulation over aggression.',
    japanese:
      "箱は繊細なものを守るために収めることもあります。しかし、ファベルジェの卵のように、箱そのものが貴重な場合はどうでしょうか？ ケリー・ジン・メイの彫刻作品「JPY50,000（SGD414.94）」は、時間の価値についての瞑想です。この「箱」は5枚の1万円札を内包しており、「壁」の隙間から中身が見えています。そしてタイトルに記された金額で販売されています⁶。ただし条件があります。紙幣を手にするには、箱を破壊しなければならないのです。一見簡単に思えますが、よく見ると、その不思議な素材の正体に気づきます。見覚えのあるきしむような光沢、何百、何千もの繊維の端が反抗的に突き出ている。それは髪の毛です。アーティストは2年間にわたって集めた自身の髪を使い、それを編み込んで閉じ込められたお金を包む網をつくりました。髪は無料であり、ほとんどの人間が持っているものですが、その長さは経過した時間の反映であり、精緻な編み込みは手間のかかる工芸の証です。\n\nジン・メイの実践では、鑑賞者に自らの価値認識を問い直させるようなパラドックスがしばしば用いられます。もし髪と労働に物質的な価値がないのであれば、なぜ彫刻を購入し、それを壊して損失を取り戻すことを躊躇するのでしょうか？ 所有しているという事実は、何かを破壊する権利を与えるのでしょうか？ このアーティストは過去の作品においてもつくる者と壊す者の両方の役割を演じ、鑑賞者の共感を観察してきました。今回、彼女は鑑賞者をその立場に招き入れ、支点の上に座らせます。5万円と引き換えに、何を犠牲にしなければならないのか？ アーティストはこの難問を通じて「ハードパワー」に対する「ソフトパワー」を示し、攻撃よりも感情的操作の有効性を示唆しています。",
  },
  {
    id: 8,
    title_en: "A box, holding heritage and conversation",
    title_ja: "遺産と対話を宿す箱",
    author:
      "Carmen Chen (Gravy Baby) / カルメン・チェン (グレイビー・ベイビー)",
    english:
      'Takamatsu has seen its fair share of foreigners due to it being one of the host cities of the Setouchi Art Triennale, and part of the Shikoku Pilgrimage (Henro). Despite that, the "Peranakan" identity is still unfamiliar locally. Carmen Chen of Gravy Baby introduces their unique cuisine to Takamatsu, embracing the flavours and methods from her heritage yet venturing outside the traditional framework. Using a fusion of Malay and Chinese cooking methods with spices and key ingredients like coconut milk naturally available in the Southeast Asia region, Peranakan food is recognised for their rich gravies, fragrance, and attention to detail.\n\nIf there is one coincidence between Japanese and Peranakan culture, it would be their obsession with "packaging". Both cultures seem to delight in whetting appetites through concealment, though in the case of Peranakan kuehs (bite-sized snacks usually made of rice flour or tapioca starch), the "packaging" serves as part of the cooking method. Uncooked ingredients are wrapped securely in Pandan or bamboo leaves before being steamed, allowing the fragrance of the leaves to infuse. These wrapped "food parcels" mirror the birth of Peranakan heritage, borne through migration of people who settle, then absorb the local influences. In this instance, the "box" is not a boundary, but a vessel—more a boat than a container—that carries, absorbs, and becomes that which it envelopes.\n\nWhile less common in Japan, private dining experiences have been popular in Singapore ever since the global pandemic in 2020⁷. With the post-lockdown surge of commercial rent and sharpening of culinary skills came the natural progression of people opening their dining rooms to the public. People kept coming back, not only for unique menus but for the conversations. In modern society where people are increasingly facing screens or eating takeout meals alone, communal dining experiences force you out of your comfortable shell, seating you next to a stranger. Doused in the light of new spaces, exotic flavours and very importantly, unfamiliar aesthetic tastes, one finds that the tongue naturally relaxes into conversations. Gravy Baby\'s dining experience spanning a long communal table and sharing plates runs almost like a performance, with dishes interspersed with candid sharing about the art by the artists, served alongside the remedy to jittery conversation—drinks.',
    japanese:
      "高松は、瀬戸内国際芸術祭の開催都市の一つであり、四国遍路の一部でもあることから、これまでにも多くの外国人を迎えてきました。それにもかかわらず、「プラナカン」のアイデンティティは地元ではまだあまり知られていません。グレイビー・ベイビーのカルメン・チェンは、その独自の料理を高松に紹介します。自身のルーツに根ざした味と技法を大切にしながらも、伝統の枠を超えた挑戦を試みています。マレーと中国の調理法を融合させ、ココナッツミルクをはじめとする東南アジアで自然に手に入るスパイスや重要な食材を用いるプラナカン料理は、濃厚なグレービー、豊かな香り、そして細部へのこだわりで知られています。\n\n日本とプラナカンの文化に一つの共通点があるとすれば、それは「包装」への執着でしょう。両文化とも、隠すことで食欲をそそることを喜びとしているようです。ただしプラナカンのクエ（米粉やタピオカ澱粉でつくられる一口サイズの菓子）の場合、「包装」は調理法の一部でもあります。生の材料をパンダンの葉や竹の葉でしっかりと包んでから蒸すことで、葉の香りが中に移ります。これらの包まれた「食の小包」は、プラナカンの遺産の誕生を映し出しています。移住した人々が定着し、現地の影響を吸収していった歴史です。ここでの「箱」は境界ではなく、器です。容器というよりもむしろ船であり、運び、吸収し、包んだものそのものになっていくのです。\n\n日本ではまだあまり一般的ではありませんが、プライベートダイニングの体験は、2020年の世界的パンデミック以降、シンガポールで人気を博しています⁷。ロックダウン後の商業賃料の高騰と料理技術の研鑽が重なり、自宅のダイニングルームを一般に開放する人々が自然と増えていきました。人々が繰り返し訪れたのは、独自のメニューだけでなく、そこで交わされる会話のためでもありました。画面に向き合うことが増え、一人でテイクアウトの食事を取ることが多くなった現代社会において、共同の食事体験は、居心地のよい殻から人を引き出し、見知らぬ人の隣に座らせます。新しい空間の光、異国の味わい、そして何より馴染みのない美的感覚に浸される中で、舌は自然と会話へとほぐれていきます。長いテーブルを囲み、大皿を分かち合うグレイビー・ベイビーのダイニング体験は、まるでパフォーマンスのように進行します。料理の合間にアーティストたちが作品について率直に語り、ぎこちない会話をほぐす処方箋であるドリンクとともに供されます。",
  },
  {
    id: 9,
    title_en: "A box, as something you think out of",
    title_ja: "箱の外で考えるということ",
    author: "Ken / ケン",
    english:
      "Ken whips up thoughtful accompaniments to the dishes based on each flavour profile, delightful bursts of intrigue that bring the dishes together into a harmonious concerto. Classic drinks act as a launchpad for experimentation; ingredients are defined beyond their common usage. The experience opens with tomato, shiso and olive oil—except not in a salad as you might expect, but a slushie that shocks the palate with its temperature and acidity. The traditional Paloma cocktail with its citrusy notes leans into its Japanese environment with a local Sake. You may choose to end your night in two ways: Italian, with a dark roast coffee made with beans from a Singapore roastery, or Chinese, with the highly sought-after Duckshit tea.\n\nNeither the ingredients nor the style are new; yet drawers have been pulled out and exchanged between different chests, considering classics in new contexts.",
    japanese:
      "ケンは、それぞれの料理の味わいに合わせた心のこもった飲み物を用意します。料理を一つのハーモニーある協奏曲へとまとめ上げる、楽しい驚きの連続です。クラシックな飲み物を実験の出発点とし、素材は通常の用途を超えて再定義されます。\n\n最初に登場するのは、トマト、紫蘇、オリーブオイル。サラダを想像するかもしれませんが、実際にはその温度と酸味で味覚を衝撃するスラッシーです。柑橘系のパロマ・カクテルは、日本の環境に寄り添い、地元の日本酒を取り入れています。夜の締めくくりは二つの選択肢があります。イタリア式に、シンガポールの焙煎所の豆を使ったダークローストのコーヒーか、中国式に、珍重される鴨屎香茶（おうしこうちゃ）か。\n\n素材もスタイルも新しいわけではありません。しかし引き出しが入れ替えられ、異なる箪笥の間で交換され、古典が新しい文脈の中で考え直されているのです。",
  },
  {
    id: 10,
    title_en: "",
    title_ja: "",
    author: null,
    english:
      "Defining, classifying and organising things as a means of comprehension is a survival skill that continues to bemuse humans, evident even in the aforementioned personality test. Such taxonomies can be, however, subjective and limiting especially in living creatures that continue to evolve. Challenging the expectation of streamlining, the participating creatives cross freely between mediums and disciplines. The format of the exhibition itself breaks down the white walls of a gallery space, converting passive observation to engaging discussion via one thing that transcends languages: nourishment.\n\nThe outlines of a quintessential box have been reworked, whether by thinking out of it, about the space within it, or transcending it altogether. Spontaneous strokes link Wu Yanrong's and Chong Wah's compositions. The dinner served by Gravy Baby and Ken is a product of taking things apart and putting them together differently, echoing Chong Wah's re-interpretation of a motorbike. Ironically protected by its human rider, his unlikely armour resonates with Kelly's fragile enclosure of hair, which develops meaning through exposing its contents just as Siah's open \"box\" allows us to encounter technology more intimately.\n\nIn a world where we gradually separate ourselves into boxes, physically with rooms and psychologically with labels, HAKO demonstrates using them to initiate rather than impede imagination, include rather than exclude; thus inviting the audience into a conversation contemplating the form of their own metaphorical boxes.",
    japanese:
      "物事を定義し、分類し、整理することで理解しようとするのは、前述の性格テストにも見られるように、人間を魅了し続ける生存の技です。しかしそうした分類体系は主観的であり、とりわけ進化し続ける生きた存在に対しては限定的なものになりかねません。効率化の期待に挑みながら、参加クリエイターたちは媒体や分野の間を自由に横断しています。展覧会そのものの形式もまた、ギャラリー空間の白い壁を取り払い、受動的な鑑賞を、言語を超えた一つのものを通じた能動的な対話へと変えています。それは、食という営みです。\n\n典型的な箱の輪郭は、その外で考えることによって、その内部の空間について考えることによって、あるいはそれを完全に超越することによって、つくり変えられてきました。即興的な筆致がウー・イェンロンとチョン・ワーの作品をつないでいます。グレイビー・ベイビーとケンによるディナーは、物事を分解し、異なるかたちで組み直すという営みの産物であり、チョン・ワーによるバイクの再解釈と響き合います。皮肉にもライダーという人間に守られた彼の意外な鎧は、ケリーの髪による脆い囲いと共鳴しています。その囲いは中身を見せることで意味を帯びるのであり、それはシアの開かれた「箱」が私たちにテクノロジーとより親密に出会わせてくれるのと同じです。\n\n私たちが部屋という物理的な箱に、レッテルという心理的な箱に、次第に自らを閉じ込めていく世界において、HAKOは箱を想像力を妨げるものではなく喚起するものとして、排除ではなく包摂のために使うことを実践しています。そうして鑑賞者を、自分自身の比喩的な箱のかたちについて思いを巡らせる対話へと招き入れるのです。",
  },
  {
    id: 11,
    title_en: "Footnotes",
    title_ja: "脚注",
    author: null,
    english:
      "¹ Nagao, T., & Saitō, I. (2003). Kokology: The game of self-discovery. Barnes & Noble Books.\n² Haramis, N. (2025, April 22). Boxes Almost as Valuable as What They Contain. The New York Times Style Magazine.\n³ Le Guin, U. K. (1997). The Uses of Not. In Lao Tzu: Tao Te Ching (pp. 28–28). Shambhala.\n⁴ Zettl, F. (2021, May 30). The Essence of Chinese Painting (IX). Zen Art and Dao.\n⁵ Humphreys, R. (2006). Futurism. Tate Gallery Publishing.\n⁶ Only with certain non-monetary conditions or \"sacrifices\" specified by the artist\n⁷ Teo, J. (2025, December 16). Home-based Dinners are Bringing Back the Missing Soul in S'pore F&B Scene. Vulcan Post.\n\n*According to this \"Cube Test\", the first image you have of a cube represents yourself; its size, your ego.",
    japanese:
      "¹ Nagao, T., & Saitō, I. (2003). Kokology: The game of self-discovery. Barnes & Noble Books.\n² Haramis, N. (2025, April 22). Boxes Almost as Valuable as What They Contain. The New York Times Style Magazine.\n³ Le Guin, U. K. (1997). The Uses of Not. In Lao Tzu: Tao Te Ching (pp. 28–28). Shambhala.\n⁴ Zettl, F. (2021, May 30). The Essence of Chinese Painting (IX). Zen Art and Dao.\n⁵ Humphreys, R. (2006). Futurism. Tate Gallery Publishing.\n⁶ アーティストが指定する非金銭的な条件または「犠牲」を伴う場合のみ\n⁷ Teo, J. (2025, December 16). Home-based Dinners are Bringing Back the Missing Soul in S'pore F&B Scene. Vulcan Post.\n\n*この「キューブテスト」によると、最初に思い浮かべた立方体のイメージはあなた自身を表しており、その大きさはあなたの自我を示しています。",
  },
];
