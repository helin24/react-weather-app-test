class WelcomeController < ApplicationController
  def index
    @key = Rails.application.secrets.weather_key
  end
end
