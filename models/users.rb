class Users < ActiveRecord::Base
  
  validates :email, presence: true
  
  
  validates :password, presence: true
  
  
  validates :access_level, presence: true
  
  
end
