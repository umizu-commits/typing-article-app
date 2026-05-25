import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["text", "input","hint","timer"]

  connect() {
    const text = sessionStorage.getItem("typing_text")

    if (!text) {
      window.location.href = "/"
      return
    }

    this.chars = [...text] // handleInput() の中でも元のテキストを参照できるよう、this.chars に保存
    this.inputTarget.focus() // ページ表示と同時にフォーカスを当てる

    // 1文字ずつ span に変換して表示する
    this.textTarget.innerHTML = ""

    const fragment = document.createDocumentFragment()

    this.chars.forEach(char => {
      const span = document.createElement("span")
      span.textContent = char // textContent は HTML として解釈しない
      fragment.appendChild(span)
    })

    this.textTarget.appendChild(fragment)

    // 最初の入力でタイマーを開始するため、開始状態を未開始にしておく
    this.isStarted = false
  }

  handleInput() {
    // 最初の入力時だけ、開始済みにしてヒントを非表示にする
    if (!this.isStarted) {
      this.isStarted = true
      this.hintTarget.classList.add("hidden")
    }

    const typed = [...this.inputTarget.value]

    this.textTarget.querySelectorAll("span").forEach((span, index) => {
      if (typed[index] === this.chars[index]) {
        span.className = "text-gray-400" // 正しい文字は薄いグレーに
      } else {
        span.className = "" // 間違っている文字はデフォルトのスタイルに
      }
    })
  }

  // Enterキーのデフォルト動作をキャンセルするイベントハンドラ
  handleKeydown(event) {
    if (event.key === "Enter") {
      event.preventDefault()
    }
  }

  // リセットボタンのイベントハンドラ
  reset() {
    this.inputTarget.value = ""
    this.isStarted = false

    this.textTarget.querySelectorAll("span").forEach(span => {
      span.className = ""
    })

    this.hintTarget.classList.remove("hidden")
    this.timerTarget.textContent = "00:00"
    this.inputTarget.focus()
  }
}