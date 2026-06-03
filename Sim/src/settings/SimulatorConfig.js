export class SimulatorConfig {
    constructor() {
        // Sim側の初期値
        this.schema = {
        duration: { type: "number", value: 250, apply: (v, sim) => { sim.renderer.setDuration(v) }},       
        enableKeyboard: { type:"boolean", value: true, apply: (v, sim) => { sim.enableKeyboard = v}},
        renderFrontFace: { type:"boolean", value: true, apply: (v, sim) => { sim.setShowFrontFace(v)}}
        };

        this.settings = {}

        for (const [key, value] of Object.entries(this.schema)) this.settings[key] = value

        this.listeners = new Map();
    }

    get(key) {
        return this.settings[key];
    }

    // 値を書き換えて、Sim内部の3Dレンダラー等に即座に通知する
    set(key, value) {
        if (!(key in this.settings)) {
            console.warn(`SimulatorConfig: unknown key "${key}"`)
            return
        }

        const coerced = this.coerce(key, value)
        if (this.settings[key] === coerced) return

        this.settings[key] = coerced

        if (this.listeners.has(key)) {
            this.listeners.get(key).forEach(callback => callback(coerced));
        }
    }

    // Sim内部での監視用フック
    onChange(key, callback) {
        if (!this.listeners.has(key)) {
            this.listeners.set(key, []);
        }
        this.listeners.get(key).push(callback);
    }

    applyPatch(patch) {
        for (const [key, value] of Object.entries(patch)) {
            this.set(key, value)
        }
    }

    coerce(key, value) {
        const type = this.schema[key].type
        if (type === "number")  return Number(value)
        if (type === "boolean") return value === true || value === "true"
        return value
    }
}