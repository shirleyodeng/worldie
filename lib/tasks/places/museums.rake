namespace :places do
  namespace :museums do
    desc "Create museums in London from the Google Places API"
    task :london => :environment do
      puts "Creating museums in London.."
      city = City.find_by_name("London")
      google_places = GooglePlaces.new({city_id: city.id, lat: city.latitude, lng: city.longitude, type: "museum"})
      google_places.nearby_search
      puts "Museums in London created!"
    end
  end
end
