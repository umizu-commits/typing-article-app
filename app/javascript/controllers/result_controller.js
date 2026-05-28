import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["accuracy", "cpm", "wpm", "missCount", "elapsedTime"]

    connect() {
        const raw = sessionStorage.getItem("typing_result")

        if (!raw) {
            window.location.href = "/"
            return
        }

        const result = JSON.parse(raw)

        this.accuracyTarget.textContent = `${result.accuracy}%`
        this.cpmTarget.textContent = result.cpm
        this.wpmTarget.textContent = result.wpm
        this.missCountTarget.textContent = result.missCount
        this.elapsedTimeTarget.textContent = this.formatTime(result.elapsedSeconds)
    }

    formatTime(seconds) {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0")
        const s = (seconds % 60).toString().padStart(2, "0")
        return `${m}:${s}`
    }

    // sessionStrageの削除を行ってから、TOPページに遷移する
    goToTop() {
        sessionStorage.removeItem("typing_text")
        sessionStorage.removeItem("typing_result")
        window.location.href = "/"
    }
}