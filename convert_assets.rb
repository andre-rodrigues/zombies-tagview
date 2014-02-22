require "fileutils"

Dir["./assets/raw/**/*.png"].map do |file|
  _, _, _, folder, image = file.split("/")

  new_image = image.gsub(/(\D)(\d)(\d)\.png/, '\1\20\3.png')
  new_path = "./assets/#{folder}/#{new_image}"

  puts "Converting #{file} to #{new_path}"

  FileUtils.mkdir_p "./assets/#{folder}"

  system "convert #{file} -resize 50x50% #{new_path}"
end
