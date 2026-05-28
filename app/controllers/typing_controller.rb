class TypingController < ApplicationController
    def show
    end

    def result
    end

    # ログイン中であるか確認、保存してJSONを返す
    def save_result
        # 未ログインならスキップ
        unless user_signed_in?
            render json: { status: "skipped" }
            return
        end

        # ログイン中ならDBに保存する
        result = current_user.typing_results.create(
            wpm: params[:wpm],
            accuracy: params[:accuracy],
            miss_count: params[:miss_count],
            elapsed_time: params[:elapsed_time],
            article_text: params[:article_text]
        )

        # 保存結果に応じてレスポンスを返す
        if result.persisted?
            render json: { status: "saved" }
        else
            render json: { status: "failed" }
        end
    end
end
