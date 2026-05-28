import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["accuracy", "cpm", "wpm", "missCount", "elapsedTime", "saveSuccess", "saveFailed", "saveSkipped"]

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

        // fetchのPOST送信
        const csrfToken = document.querySelector('meta[name="csrf-token"]').content
        // fetchより前にarticle_text の取得
        const articleText = sessionStorage.getItem("typing_text")

        fetch("/typing/results", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken
            },
            body: JSON.stringify({ wpm: result.wpm, accuracy: result.accuracy, miss_count: result.missCount, elapsed_time: result.elapsedSeconds, article_text: articleText })
        })

        // レスポンスの処理
        .then(res => res.json())
        .then(data => {
            if (data.status === "saved") {
                this.saveSuccessTarget.classList.remove("hidden")
            } else if (data.status === "skipped") {
                this.saveSkippedTarget.classList.remove("hidden")
            } else {
                this.saveFailedTarget.classList.remove("hidden")
            }
        })
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