import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["text"]

  connect() {
    const text = sessionStorage.getItem("typing_text")

    if (!text) {
      window.location.href = "/"
      return
    }

    this.textTarget.textContent = text
  }
}
