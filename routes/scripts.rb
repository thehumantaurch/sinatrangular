# encoding: utf-8
class Linecall < Sinatra::Application
  get '/linecall/scripts' do
    format_response(Scripts.all, request.accept)
  end

  get '/linecall/scripts/:id' do
    entity ||= Scripts.find(params[:id]) || halt(404)
    format_response(entity, request.accept)
  end

  post '/linecall/scripts' do
    body = MultiJson.load request.body.read
    entity = Scripts.create(
      
      title: body['title'],
      
      author: body['author'],
      
    )
    status 201
    format_response(entity, request.accept)
  end

  put '/linecall/scripts/:id' do
    body = MultiJson.load request.body.read
    entity ||= Scripts.find(params[:id]) || halt(404)
    halt 500 unless entity.update(
      
      title: body['title'],
      
      author: body['author'],
      
    )
    format_response(entity, request.accept)
  end

  delete '/linecall/scripts/:id' do
    entity ||= Scripts.find(params[:id]) || halt(404)
    halt 500 unless entity.destroy
    status 204
  end
end
