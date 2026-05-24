// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "controllers/application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
eagerLoadControllersFrom("controllers", application)

// Stimulus コントローラーの登録
import TypingFormController from "./typing_form_controller"
application.register("typing-form", TypingFormController)