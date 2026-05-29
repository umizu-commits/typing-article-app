require 'rails_helper'

RSpec.describe "タイピング履歴", type: :request do
  let(:user) { create(:user) }

  describe "GET /typing/histories" do
    context "未ログインの場合" do
      it "トップページにリダイレクトされる" do
        get typing_histories_path
        expect(response).to redirect_to(root_path)
      end
    end

    context "ログイン済みの場合" do
      it "正常にアクセスできる" do
        sign_in user
        get typing_histories_path
        expect(response).to have_http_status(:success)
      end
    end
  end
end
