class CreateCountries < ActiveRecord::Migration[5.1]
  def change
    create_table :countries do |t|
      t.string :name
      t.string :iso_code
      t.string :country_prefix
      t.string :currency_code
      t.timestamps
    end
  end
end
