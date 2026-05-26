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
                        content: ["CubeTrainerは、競技者向けに設計されたルービックキューブ学習支援アプリです。3Dシミュレータとトレーニング機能を組み合わせ、効率的な練習環境を目指しています。"],
                    },
                    {
                        label: "目的",
                        content: ["アルゴリズム学習", "状態認識の向上", "効率的な反復練習"]
                    },
                    {
                        label: "特徴",
                        content: ["3Dキューブシミュレータ", "競技練習向けUI", "Trainer拡張対応"]
                    }
                ]
            },

            PLLTrainer: {
                title: "PLL Trainer",
                features: [
                    {
                        label: "summary",
                        content: ["PLLを反復練習できるトレーニングモードです。問題を解きながらアルゴリズムの定着をサポートします。"],
                    },
                    {
                        label: "現在の機能",
                        content: ["問題表示", "解答入力", "正誤判定"]
                    },
                    {
                        label: "今後の拡張",
                        content: ["学習記録", "統計表示", "苦手ケース分析"]
                    }
                ]
            },

            FreeSim: {
                title: "Free Simulator",
                features: [
                    {
                        label: "summary",
                        content: ["自由にルービックキューブを操作できる3Dシミュレータです。練習やアルゴリズム確認に利用できます。"],
                    },
                    {
                        label: "操作",
                        content: ["キーボード入力", "Scramble", "Reset", "Undo / Redo"]
                    },
                    {
                        label: "システム",
                        content: ["視点依存操作", "3D表示", "自然なキューブ操作"]
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