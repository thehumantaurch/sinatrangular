class Scripts < ActiveRecord::Base
  
  validates :title, presence: true
  
  
  validates :author, presence: true
  
  
end
