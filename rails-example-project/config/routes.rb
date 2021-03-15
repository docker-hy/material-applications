Rails.application.routes.draw do
  root "presses#new"

  resources :presses
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
