class CreateCities < ActiveRecord::Migration[5.1]
  def change
    create_table :cities do |t|
      t.string :name
      t.references :country, foreign_key: true
      t.decimal :latitude
      t.decimal :longitude
      t.timestamps
    end
  end
end
