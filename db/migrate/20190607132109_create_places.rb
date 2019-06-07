class CreatePlaces < ActiveRecord::Migration[5.1]
  def change
    create_table :places do |t|
      t.string :name
      t.decimal :latitude
      t.decimal :longitude
      t.text :address
      t.references :city, foreign_key: true
      t.timestamps
    end
  end
end
