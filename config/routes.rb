Rails.application.routes.draw do

  resources :boards, except: [:index, :new, :create, :edit]

  resources :cards, except: [:show, :new, :edit]

  root 'boards#show', id: 1
end
