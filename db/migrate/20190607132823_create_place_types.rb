class CreatePlaceTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :place_types do |t|
      t.string :name
      t.string :google_name
      t.timestamps
    end
  end
end
