class CreateTypingResults < ActiveRecord::Migration[7.2]
  def change
    create_table :typing_results do |t|
      t.references :user, null: false, foreign_key: true
      t.float :wpm
      t.float :accuracy
      t.integer :miss_count
      t.integer :elapsed_time
      t.text :article_text

      t.timestamps
    end
  end
end
