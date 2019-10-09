class Mutations::UpdateBook < Mutations::BaseMutation
  null true

  argument :id, ID, required: true
  argument :title, String, required: false
  argument :genre, String, required: false

  field :book, BookType, null: true
  field :errors, [String], null: false

  def resolve(id:, title:, genre:)
    book = Book.find(id)
    if book.update(title: title, genre: genre)
      { book: book, errors: book.errors.full_messages }
    end
  end

end
