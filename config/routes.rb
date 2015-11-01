Rails.application.routes.draw do

  resources :boards, except: [:index, :new, :create, :edit] do
    resources :cards, except: [:index, :show]
  end

  root 'boards#show', id: 1
end
