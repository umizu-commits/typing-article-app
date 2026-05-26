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
    // タイピング開始時は先頭の文字から判定する
    this.currentIndex = 0

    // ミスのカウント
    this.missCount = 0

    // タイピング完了のフラグ
    this.isCompleted = false

    this.skipNonTypableChars()

    //現在地にカーソルを表示する
    this.updateCursor()
  }

  // キーが押されたときの処理
  // Enterキーを無効にする部分
  handleKeydown(event) {
    // textareaへの文字蓄積を防ぐ
    event.preventDefault() // デフォルトのキー入力を無効にする

    if (this.isCompleted) return // タイピング完了後はキー入力を無視する
    if (event.key === "Enter") {
      event.preventDefault()
    }

    // ShiftやCtrlなどを無視する部分
    if (event.key.length !== 1) return
    //スペースキーは無視する
    if (event.key === " ") return

    // 最初の入力時だけ、開始済みにしてヒントを非表示にする
    if (!this.isStarted) {
      this.isStarted = true
      this.hintTarget.classList.add("hidden")
    }

    // 入力されたキーと期待される文字を取得する部分
    const key = event.key // event.key は押されたキーの文字を返す（例: "a": Key A)
    const expectedChar = this.chars[this.currentIndex] // 本来入力してほしい文字

    // 入力されたキーが期待される文字と一致する場合、次の文字に進む
    const spans = this.textTarget.querySelectorAll("span")
    if (key === expectedChar) {
      spans[this.currentIndex].className = "text-gray-400"
      this.currentIndex++
      this.skipNonTypableChars()
      this.updateCursor()

      if (this.currentIndex >= this.chars.length) {
        this.isCompleted = true // タイピング完了のフラグを立てる
      }
    } else {
      this.missCount++ // ミスをカウントする
      spans[this.currentIndex].className = "text-red-500"
    }
  }

  // リセットボタンのイベントハンドラ
  reset() {
    this.inputTarget.value = ""
    this.isStarted = false
    this.currentIndex = 0
    this.missCount = 0
    this.isCompleted = false

    this.textTarget.querySelectorAll("span").forEach(span => {
      span.className = ""
    })

    this.skipNonTypableChars()
    this.updateCursor()
    this.hintTarget.classList.remove("hidden")
    this.timerTarget.textContent = "00:00"
    this.inputTarget.focus()
  }

  // 現在の入力位置がスペースや改行の場合、入力済み扱いにして次の文字へ進める
  skipNonTypableChars() {
    while (
      this.currentIndex < this.chars.length &&
      (this.chars[this.currentIndex] === " " || this.chars[this.currentIndex] === "\n")
    ) {
      this.currentIndex++
    }
  }

  //テキストエリア部分をクリックするとフォーカスが戻る
  focusInput() {
    this.inputTarget.focus()
  }

  // 現在地にカーソルを表示する
  updateCursor() {
    if (this.currentIndex >= this.chars.length) return // タイピング完了後はカーソルを表示しない
    const spans = this.textTarget.querySelectorAll("span")
    spans[this.currentIndex].className = "cursor-blink"
  }
}