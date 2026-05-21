import { configManager } from "../config/ConfigManager.js"

export class SettingsOverlay {
    constructor() {
        this.element = null
        this.configManager = configManager
        this.currentCategory = "all" // 表示フィルター用
    }

    // どのコンテキスト（ページ）から開かれたかに応じてフィルターをかけて描画
    render(category = "all") {
        this.currentCategory = category

        // 既存の同一コンポーネントがあれば削除
        const existing = document.getElementById("settingsOverlay")
        if (existing) existing.remove()

        this.element = document.createElement("div")
        this.element.id = "settingsOverlay"
        this.element.classList.add("settings-overlay", "is-active")

        const schema = configManager.getSchema()

        //  1. 表示するカテゴリの定義（あなたのSchemaの表記に完全に合わせました）
        const sections = [
            { id: "general", label: "🌐 General Settings" },
            { id: "PLLTrainer", label: "⏱️ PLLTrainer Settings" },
            { id: "freeSim", label: "🧱 Free Simulator Settings" },
        ]

        //  2. カテゴリごとに仕分けしたHTMLを生成する
        let bodyHtml = ""

        sections.forEach(sec => {
            // このセクションに該当する設定項目を抽出
            const items = Object.entries(schema).filter(([_, item]) => item.category === sec.id)
            
            // 該当する項目がない、または指定されたカテゴリフィルターに合わない場合は飛ばす
            if (items.length === 0) return
            if (category !== "all" && category !== sec.id) return

            //  サブタイトル（見出し）を追加
            bodyHtml += `<h3 class="settings-section-title">${sec.label}</h3>`

            // そのセクションに属する設定行を追加
            items.forEach(([key, item]) => {
                bodyHtml += this.renderSettingRow(key, item)
            })
        })

        //  3. 全体のHTML構造を流し込む
        this.element.innerHTML = `
            <div class="glass settings-card">
                <div class="settings-header">
                    <h2>Settings</h2>
                    <button id="closeSettingsButton" class="close-button">✕</button>
                </div>
                <div class="settings-body">
                    ${bodyHtml}
                </div>
            </div>
        `

        this.setupEvents()
        return this.element
    }

    renderSettingRow(key, item) {
        const currentValue = configManager.get(key)
        let inputHtml = ""

        if (item.type === "select") {
            inputHtml = `
                <select data-key="${key}" class="settings-select">
                    ${item.options.map(opt => `<option value="${opt}" ${opt === currentValue ? "selected" : ""}>${opt}</option>`).join("")}
                </select>
            `
        } else if (item.type === "range") {
            inputHtml = `
                <div class="range-container">
                    <input type="range" data-key="${key}" min="${item.min}" max="${item.max}" step="${item.step}" value="${currentValue}" class="settings-range">
                    <span class="range-value" id="val-${key}">${currentValue}</span>
                </div>
            `
        } else if (item.type === "boolean") {
            inputHtml = `
            <label class="toggle-switch">
                <input type="checkbox" data-key="${key}" ${currentValue ? "checked" : ""} class="settings-checkbox">
                <span class="toggle-slider"></span>
            </label>
            `
        }

        return `
            <div class="settings-row">
                <label class="settings-label">${item.label}</label>
                <div class="settings-input-wrapper">${inputHtml}</div>
            </div>
        `
    }

    setupEvents() {
        // 閉じるボタン
        this.element.querySelector("#closeSettingsButton").addEventListener("click", () => this.close())

        // 背景クリックで閉じる
        this.element.addEventListener("click", (e) => {
            if (e.target === this.element) this.close()
        })

        // 変更イベントの一括補足
        this.element.querySelectorAll("select, input").forEach(input => {
            const key = input.dataset.key

            input.addEventListener("input", (e) => {
                let value = e.target.type === "checkbox" ? e.target.checked : e.target.value
                configManager.set(key, value)

                // レンジ入力時のリアルタイム数値反映
                const valueLabel = this.element.querySelector(`#val-${key}`)
                if (valueLabel) valueLabel.textContent = value
            })
        })
    }

    open(parent, category = "all") {
        const overlayElement = this.render(category)
        parent.appendChild(overlayElement)
    }

    close() {
        this.element.classList.remove("is-active")
        this.element.addEventListener("transitionend", () => {
            this.element.remove()
        }, { once: true })
    }
}