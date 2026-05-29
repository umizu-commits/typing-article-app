require 'rails_helper'

RSpec.describe "ユーザー登録", type: :request do
  describe "POST /users" do
    context "有効な情報の場合" do
      it "登録に成功しトップページにリダイレクトされる" do
        post user_registration_path, params: {
          user: {
            email: "newuser@example.com",
            password: "password123",
            password_confirmation: "password123"
          }
        }
        expect(response).to redirect_to(root_path)
      end
    end

    context "無効な情報の場合" do
      it "パスワードが一致しなければ登録に失敗する" do
        post user_registration_path, params: {
          user: {
            email: "newuser@example.com",
            password: "password123",
            password_confirmation: "wrongpassword"
          }
        }
        expect(response).to have_http_status(:unprocessable_content)
      end
    end
  end
end
