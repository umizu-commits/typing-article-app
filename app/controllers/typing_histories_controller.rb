class TypingHistoriesController < ApplicationController
    # 未ログインユーザーがアクセスした場合はログイン画面へ遷移
    before_action :authenticate_user!

    def index
      # ログインユーザーの履歴取得（全件・サマリーカード用）
      @all_typing_results = current_user.typing_results
      # ページネーション適用（テーブル表示用）
      @typing_results = @all_typing_results.order(created_at: :desc).page(params[:page]).per(10)
    end
end
