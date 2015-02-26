# encoding: utf-8
require 'multi_json'
require 'sinatra'
require 'sinatra/activerecord'

class Linecall < Sinatra::Application
  enable :sessions

  configure :development do
    set :database, {adapter: "sqlite3", database: "linecall.sqlite3"}
    if (RUBY_PLATFORM == "java")
      require 'jdbc/sqlite3'
      Jdbc::SQLite3.load_driver
    end
  end

  configure :production do
    set :database, {adapter: "postgres", database: "linecall.posgres"}
    if (RUBY_PLATFORM == "java")
      require 'jdbc/postgres'
      Jdbc::Postgres.load_driver
    end
  end
end

require_relative 'helpers/init'
require_relative 'models/init'
require_relative 'routes/init'
