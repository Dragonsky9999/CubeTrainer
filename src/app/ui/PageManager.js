export class PageManager {

    constructor(root) {
        this.root = root
        this.pages = {}
    }

    register(name, page) {

        this.pages[name] = page

        const element = page.render()
        page.element = element

        element.classList.add("page")
        element.style.display = "none"

        this.root.appendChild(element)

        page.mount?.()
    }

    show(name) {

        Object.values(this.pages).forEach(page => {
            page.element.style.display = "none"
            page.deactivate?.()
        })

        const page = this.pages[name]

        page.element.style.display = "flex"
        page.activate?.()
    }
}