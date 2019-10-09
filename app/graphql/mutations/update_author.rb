class Mutations::UpdateAuthor < Mutations::BaseMutation
  null true

  argument :id, ID, required: true
  argument :name, String, required: true
  argument :age, Integer, required: false

  field :author, AuthorType, null: true
  field :errors, [String], null: false

  def resolve(id:, name:, age:)
    author = Author.find(id)
    if author.update(name: name, age: age)
      { author: author, errors: author.errors.full_messages }
    end
  end
end
