class Place < ApplicationRecord
  belongs_to :city
  belongs_to :place_type
end
