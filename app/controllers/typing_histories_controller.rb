class TypingHistoriesController < ApplicationController
    def index
      # 未ログインなら Pundit::NotAuthorizedError が発生し、user_not_authorized にフォールバック
      authorize TypingResult, :index?
      # 現在のユーザーの結果だけを返す
      @all_typing_results = policy_scope(TypingResult)
      # ページネーション適用（テーブル表示用）
      @typing_results = @all_typing_results.order(created_at: :desc).page(params[:page]).per(10)
    end
end
