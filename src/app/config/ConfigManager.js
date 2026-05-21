export class ConfigManager {
    constructor() {
        if (ConfigManager.instance) {
            return ConfigManager.instance;
        }

        // 1. 全設定項目の一元定義 (ここを編集するだけで項目を追加・変更可能)
        this.configSchema = {
            // 一般設定
            theme: { category: "general", label: "UI Theme", type: "select", options: ["Dark Glass", "Pure Dark", "Light Glass"], value: "Dark Glass" },
            soundVolume: { category: "general", label: "Sound Volume", type: "range", min: 0, max: 100, step: 5, value: 50 },
            
            // freeSim設定
            tpsLimit: { category: "freeSim", label: "TPS Limit (UPS)", type: "select", options: ["60", "120", "Unlimited"], value: "Unlimited" },
            animationSpeed: { category: "freeSim", label: "Rotation Speed (ms)", type: "range", min: 50, max: 500, step: 25, value: 150 },
            showFrontIndicator: { category: "freeSim", label: "Show Front Guide", type: "boolean", value: true },

            // PLLTrainer設定
            scrambleLength: { category: "PLLTrainer", label: "Scramble Length", type: "range", min: 10, max: 30, step: 1, value: 20 },
            inspectionTime: { category: "PLLTrainer", label: "Inspection (sec)", type: "select", options: ["None", "8", "15"], value: "None" },
            showTimerMillis: { category: "PLLTrainer", label: "Show Milliseconds", type: "boolean", value: true }
        };

        // 実行時状態の保存
        this.settings = {};
        Object.keys(this.configSchema).forEach(key => {
            this.settings[key] = this.configSchema[key].value;
        });

        // リスナー（コールバック群）の保持
        this.listeners = new Map();

        ConfigManager.instance = this;
    }

    // 値の取得
    get(key) {
        return this.settings[key];
    }

    // 値の設定とリスナーへの通知
    set(key, value) {
        if (this.settings[key] === value) return;
        
        // 型の整合性を維持
        if (this.configSchema[key].type === "range") {
            value = Number(value);
        } else if (this.configSchema[key].type === "boolean") {
            value = value === true || value === "true";
        }

        this.settings[key] = value;

        // 個別キーの変更を通知
        if (this.listeners.has(key)) {
            this.listeners.get(key).forEach(callback => callback(value));
        }
        // 全体変更リスナーの通知
        if (this.listeners.has("*")) {
            this.listeners.get("*").forEach(callback => callback(key, value));
        }
    }

    // スキーマの取得（UI生成用）
    getSchema() {
        return this.configSchema;
    }

    // 設定変更時のフック処理（各ページやSimから登録する）
    onChange(key, callback) {
        if (!this.listeners.has(key)) {
            this.listeners.set(key, []);
        }
        this.listeners.get(key).push(callback);
    }
}

export const configManager = new ConfigManager();