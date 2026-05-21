// SimulatorConfig.js (Sim側の独立した設定管理)
export class SimulatorConfig {
    static instance = null;

    constructor() {
        if (SimulatorConfig.instance) {
            return SimulatorConfig.instance;
        }

        // Sim側の初期値
        this.settings = {
            animationSpeed: 150,
            tpsLimit: "Unlimited",
            showFrontIndicator: true
        };

        this.listeners = new Map();
        SimulatorConfig.instance = this;
    }

    get(key) {
        return this.settings[key];
    }

    // 値を書き換えて、Sim内部の3Dレンダラー等に即座に通知する
    set(key, value) {
        if (this.settings[key] === value) return;
        this.settings[key] = value;

        if (this.listeners.has(key)) {
            this.listeners.get(key).forEach(callback => callback(value));
        }
    }

    // Sim内部での監視用フック
    onChange(key, callback) {
        if (!this.listeners.has(key)) {
            this.listeners.set(key, []);
        }
        this.listeners.get(key).push(callback);
    }
}

export const simConfig = new SimulatorConfig();