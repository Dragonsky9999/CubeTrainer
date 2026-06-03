export class DescriptionManager {
    constructor(){
        if (DescriptionManager.instance){
            return DescriptionManager.instance
        }

        this.descriptions = {
            CubeTrainer: {
                title: "Cube Trainer",
                features: [
                    {
                        label: "summary",
                        content: [
                            "CubeTrainerは、ルービックキューブ競技者向けに設計された学習支援アプリです。",
                            "3Dシミュレータとトレーニング機能を組み合わせ、実際のキューブが手元になくても練習できる環境を目指しています。",
                            "通学中・空き時間など、場所を選ばず学習できることを目標としています。"
                        ]
                    },
                    {
                        label: "ターゲット",
                        content: [
                            "主にCFOP（Cross / F2L / OLL / PLL の4ステップからなる解法）を学習している中級者〜上級者を想定しています。",
                            "将来的には初心者向け機能も追加し、幅広いレベルに対応できるアプリへ発展させる予定です。"
                        ]
                    },
                    {
                        label: "目的",
                        content: [
                            "PLL・OLLなどのアルゴリズムを反復練習し、手に馴染ませる。",
                            "状態認識のスピードを上げ、競技でのタイムロスを減らす。",
                            "「実機練習」と「シミュレータ練習」の両方に対応し、練習環境を選ばない。"
                        ]
                    },
                    {
                        label: "UIデザイン",
                        content: [
                            "dark theme をベースとした没入感のあるデザイン。",
                            "glassmorphism（半透明表現）による視認性と洗練された見た目の両立。",
                            "不要な情報を省いたミニマル構成で、競技練習中の集中を妨げません。",
                            "モバイル環境を意識したレイアウト設計。"
                        ]
                    },
                    {
                        label: "今後の拡張",
                        content: [
                            "設定の追加",
                            "学習記録・正答率の統計表示。",
                            "苦手ケースの重点出題。",
                            "タイム計測との連携。",
                            "OLL Trainer など他トレーニングモードへの展開。"
                        ]
                    }
                ]
            },

            PLLTrainer: {
                title: "PLL Trainer",
                features: [
                    {
                        label: "summary",
                        content: [
                            "PLL（最終層のコーナーとエッジの置換）を反復練習するトレーニングモードです。",
                            "3Dキューブ表示と2D展開図UIを組み合わせ、直感的な状態認識と学習効率の両立を目指しています。"
                        ]
                    },
                    {
                        label: "使い方",
                        content: [
                            "画面にPLLケースが3D表示されます。",
                            "対応するアルゴリズムをキーボードで入力してください。",
                            "正誤判定が即座に行われ、次の問題へ進みます。"
                        ]
                    },
                    {
                        label: "現在の機能",
                        content: [
                            "ランダムなPLLケースの出題。",
                            "キーボード入力による解答と正誤判定。",
                            "全21パターン対応（a/b バリアント含む）。",
                            "3Dキューブと2D展開図による視覚的なPLL認識。"
                        ]
                    },
                ]
            },

            FreeSim: {
                title: "Free Simulator",
                features: [
                    {
                        label: "summary",
                        content: [
                            "自由にルービックキューブを操作できる3Dシミュレータです。",
                            "アルゴリズムの確認・手順の練習・状態の視覚確認などに利用できます。"
                        ]
                    },
                    {
                        label: "基本操作",
                        content: [
                            "U D F B R L M E S X Y Z キーで各面を操作します。",
                            "キーを押すと反時計回りに回転。Shift を押しながらで時計回りになります。",
                            "左上に表示されている色が現在のF面で、すべての入力はこのF面を基準に処理されます。"
                        ]
                    },
                    {
                        label: "視点依存操作",
                        content: [
                            "カメラ方向を基準に回転を自動変換するため、視点を変えても直感的に操作できます。",
                            "従来のキューブアプリにはない、視点回転後でも自然な操作感を実現しています。"
                        ]
                    },
                    {
                        label: "PLL入力",
                        content: [
                            "Space を押しながらPLL名に対応するキーを入力すると、そのPLLが適用されます。",
                            "矢印キー（← ↑ → ↓ = a / b / c / d）でバリアントを指定できます。",
                            "例：Space + U → Ua Perm、Space + ↑ + U → Ub Perm"
                        ]
                    },
                    {
                        label: "機能",
                        content: [
                            "Scramble：ランダムな手順でキューブをシャッフルします。",
                            "Reset：キューブを初期状態に戻します。",
                            "Undo / Redo：直前の操作を取り消し・やり直しができます。",
                            "Stop：実行中の手順・アニメーションを強制終了します。"
                        ]
                    }
                ]
            }
        }
        
        DescriptionManager.instance = this
    }

    get(pageName){
        return this.descriptions[pageName]
    }

    getTitle(pageName){
        return this.descriptions[pageName].title
    }

    getSummary(pageName){
        return this.descriptions[pageName].summary
    }

    getFeatures(pageName){
        return this.descriptions[pageName].features
    }
}

export const descriptionManager = new DescriptionManager()