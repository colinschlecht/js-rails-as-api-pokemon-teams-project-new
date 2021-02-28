class PokemonsController < ApplicationController

    def index
        pokemon = Pokemon.all 
        render json: pokemon
    end
    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params["pokemon"]["trainer_id"].to_i)
        render json: pokemon
    end
    def destroy
       Pokemon.find(params[:id]).destroy
       render json: {}
    end

end
