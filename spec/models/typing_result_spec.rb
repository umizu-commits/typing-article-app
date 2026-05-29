require 'rails_helper'

RSpec.describe TypingResult, type: :model do
  describe "アソシエーション" do
    it "ユーザーに紐づいている" do
      typing_result = create(:typing_result)
      expect(typing_result.user).to be_present
    end

    it "ユーザーがいなければ無効" do
      typing_result = build(:typing_result, user: nil)
      expect(typing_result).not_to be_valid
    end
  end

  describe "バリデーション" do
    it "すべての属性が揃っていれば有効" do
      typing_result = build(:typing_result)
      expect(typing_result).to be_valid
    end

    it "wpmがなければ無効" do
      typing_result = build(:typing_result, wpm: nil)
      expect(typing_result).not_to be_valid
    end

    it "wpmが0未満であれば無効" do
      typing_result = build(:typing_result, wpm: -1)
      expect(typing_result).not_to be_valid
    end

    it "accuracyがなければ無効" do
      typing_result = build(:typing_result, accuracy: nil)
      expect(typing_result).not_to be_valid
    end

    it "accuracyが0未満であれば無効" do
      typing_result = build(:typing_result, accuracy: -1)
      expect(typing_result).not_to be_valid
    end

    it "miss_countがなければ無効" do
      typing_result = build(:typing_result, miss_count: nil)
      expect(typing_result).not_to be_valid
    end

    it "miss_countが0未満であれば無効" do
      typing_result = build(:typing_result, miss_count: -1)
      expect(typing_result).not_to be_valid
    end

    it "elapsed_timeがなければ無効" do
      typing_result = build(:typing_result, elapsed_time: nil)
      expect(typing_result).not_to be_valid
    end

    it "elapsed_timeが0未満であれば無効" do
      typing_result = build(:typing_result, elapsed_time: -1)
      expect(typing_result).not_to be_valid
    end

    it "article_textがなければ無効" do
      typing_result = build(:typing_result, article_text: nil)
      expect(typing_result).not_to be_valid
    end
  end
end
