class Mutations::CreateAuthor < Mutations::BaseMutation
  null true

  argument :name, String, required: true
  argument :age, Int, required: false

  field :author, AuthorType, null: true
  field :errors, [String], null: false

  def resolve(name:, age:)
    author = Author.new(name: name, age: age)
    if author.save
      { author: author, errors: author.errors.full_messages }
    end
  end
end
