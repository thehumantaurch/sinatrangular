# encoding: utf-8
class Linecall < Sinatra::Application
  get '/linecall/users' do
    format_response(Users.all, request.accept)
  end

  get '/linecall/users/:id' do
    entity ||= Users.find(params[:id]) || halt(404)
    format_response(entity, request.accept)
  end

  post '/linecall/users' do
    body = MultiJson.load request.body.read
    entity = Users.create(
      
      email: body['email'],
      
      password: body['password'],
      
      access_level: body['access_level'],
      
    )
    status 201
    format_response(entity, request.accept)
  end

  put '/linecall/users/:id' do
    body = MultiJson.load request.body.read
    entity ||= Users.find(params[:id]) || halt(404)
    halt 500 unless entity.update(
      
      email: body['email'],
      
      password: body['password'],
      
      access_level: body['access_level'],
      
    )
    format_response(entity, request.accept)
  end

  delete '/linecall/users/:id' do
    entity ||= Users.find(params[:id]) || halt(404)
    halt 500 unless entity.destroy
    status 204
  end
end
