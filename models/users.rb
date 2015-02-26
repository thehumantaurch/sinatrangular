class Users < ActiveRecord::Base
  has_secure_password
  validates :email, presence: true
  validates :access_level, presence: true
end
