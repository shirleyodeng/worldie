class AddPlaceTypeToPlaces < ActiveRecord::Migration[5.1]
  def change
    add_reference :places, :place_type, index: true
  end
end
