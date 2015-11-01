class CreateBoards < ActiveRecord::Migration
  def change
    create_table :boards do |t|
      t.text :card_order, null: false

      t.timestamps null: false
    end
  end
end
