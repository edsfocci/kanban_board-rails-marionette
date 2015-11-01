class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :title, null: false
      t.references :board, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
