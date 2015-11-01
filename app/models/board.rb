class Board < ActiveRecord::Base
  has_many :cards, dependent: :destroy

  serialize :card_order
end
