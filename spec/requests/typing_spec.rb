require 'rails_helper'

RSpec.describe "タイピング", type: :request do
  describe "GET /typing" do
    it "未ログインでもタイピング練習画面にアクセスできる" do
      get typing_path
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /typing/result" do
    it "未ログインでも結果画面にアクセスできる" do
      get typing_result_path
      expect(response).to have_http_status(:success)
    end
  end
end
