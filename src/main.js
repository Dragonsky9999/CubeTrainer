import { CubeController } from "../Sim/src/app"
import { PllAlgs } from "../Sim/src/domain"

const AUF = ["U","U'","U2",""]

window.addEventListener("DOMContentLoaded", () => {

    const sceneContainer = document.getElementById("sceneContainer")
    const app = new CubeController(sceneContainer,{enableKeyboard:false,RenderFrontFace:false})
    app.start()

    // const randomAUF = AUF[Math.floor(Math.random()*AUF.length)]
    // if (randomAUF != "") app.orchestrator.applyMove(randomAUF)
    // PllAlgs.T[0].forEach((m) => {
    //     app.orchestrator.applyMove(m)
    // })
    // const random2 = AUF[Math.floor(Math.random()*AUF.length)]
    // if (random2 != "") app.orchestrator.applyMove(random2)


    const homePage = document.getElementById("homePage")
    const menuPage = document.getElementById("menuPage")
    const PLLTrainerPage = document.getElementById("PLLTrainerPage")
    const freeSimulatorPage = document.getElementById("freeSimulatorPage")

    const startBtn = document.getElementById("startBtn")
    const backToHomeBtns = document.querySelectorAll(".backToHomeBtn")
    const backToMenuBtns = document.querySelectorAll(".backToMenuBtn")
    const PllTrainerBtn = document.getElementById("PllTrainerBtn")
    const freeSimulatorBtn = document.getElementById("freeSimulatorBtn")

    

    startBtn.addEventListener("click",() => showPage(menuPage))
    backToHomeBtns.forEach(btn => btn.addEventListener("click",() => showPage(homePage)))
    backToMenuBtns.forEach(btn => btn.addEventListener("click",() => showPage(menuPage)))
    PllTrainerBtn.addEventListener("click",() => {
        const trainerCubeArea = document.getElementById("trainerCubeArea")
        
        trainerCubeArea.appendChild(sceneContainer)
        sceneContainer.classList.remove("hidden")
        showPage(PLLTrainerPage)
        app.resize(trainerCubeArea)

    })
    freeSimulatorBtn.addEventListener("click",() => showPage(freeSimulatorPage))



    function showPage(page) {
        homePage.classList.add("hidden")
        menuPage.classList.add("hidden")
        PLLTrainerPage.classList.add("hidden")
        freeSimulatorPage.classList.add("hidden")
        page.classList.remove("hidden")
    }

})


