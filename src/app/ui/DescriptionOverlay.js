import { descriptionManager } from "../Descriptions/DescriptionManager"

export class DescriptionOverlay{
    constructor(){
        this.element = null
    }

    render(pageName = "CubeTrainer") {
        this.currentPage = pageName

        const existing = document.getElementById("DescriptionOverlay")
        if (existing) existing.remove()

        this.element = document.createElement("div")
        this.element.id = "DescriptionOverlay"

        this.element.classList.add("description-overlay","is-active")

        let bodyHtml = ""

        const title = descriptionManager.getTitle(this.currentPage)
        const features = descriptionManager.getFeatures(this.currentPage)

        features.forEach(feature => {
            bodyHtml += `
                <div class="description-section">
                    <h3 class="description-subtitle">${feature.label}</h3>
                    <div class="descriptions-content">
                        ${feature.content.map(line =>
                                    `<p>${line}</p>`
                        ).join("")}
                    </div>
                </div>
            `
        })

        this.element.innerHTML = `
            <div class="glass description-card">
                <div class="description-header">
                    <h2>Description - ${title}</h2>
                    <button id="closeDescriptionButton" class="close-button">✕</button>
                </div>
                <div class="description-body">${bodyHtml}</div>
            </div>
        `

        this.setupEvents()
        return this.element
    }

    setupEvents() {
        // 閉じるボタン
        this.element.querySelector("#closeDescriptionButton").addEventListener("click", () => this.close())

        // 背景クリックで閉じる
        this.element.addEventListener("click", (e) => {
            if (e.target === this.element) this.close()
        })
    }

    open(parent, pageName = "CubeTrainer"){
        const overlayElement = this.render(pageName)
        parent.appendChild(overlayElement)
    }

    close() {
        this.element.classList.remove("is-active")
        this.element.addEventListener("transitionend", () => {
            this.element.remove()
        }, { once: true })
    }
}