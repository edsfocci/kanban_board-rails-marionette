json.array!(@cards) do |card|
  json.extract! card, :id, :title
  json.url card_url(card, format: :json)
end
