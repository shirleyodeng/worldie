require 'net/http'

class GooglePlaces

  def initialize(params)
    @base_url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    # @base_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    @api_key = "AIzaSyA_MOzp5SL-Pr38Q8c4B2vm11acHA7Q3LU"
    @next_page_token = nil
    @city_id = params[:city_id]
    @lat = params[:lat]
    @lng = params[:lng]
    @type = params[:type]
  end

  def nearby_search
    url = "#{@base_url}?query=museum&location=#{@lat},#{@lng}&type=#{@type}&radius=50000&key=#{@api_key}"
    # url = "#{@base_url}?location=#{@lat},#{@lng}&type=#{@type}&radius=50000&key=#{@api_key}"
    uri = URI(url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_PEER
    request = Net::HTTP::Get.new(uri)
    response = http.request(request)
    if response.is_a?(Net::HTTPSuccess)
      results = JSON.parse(response.body)["results"]
      results.each do |result|
        name = result["name"]
        latitude = result["geometry"]["location"]["lat"]
        longitude = result["geometry"]["location"]["lng"]
        address = result["formatted_address"]
        Place.create(name: name, latitude: latitude, longitude: longitude, address: address, city_id: @city_id, place_type_id: 1)
      end
    end
  end
end
