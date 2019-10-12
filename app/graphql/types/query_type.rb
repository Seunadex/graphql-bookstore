module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.
    description "root query"

    field :authors, [AuthorType], null: true do
      description "gets all authors"
    end

    def authors
      Author.all.order(:name)
    end

    field :author, AuthorType, null: true do
      description "Find a author by id"
      argument :id, ID, required: true
    end

    def author(id:)
      Author.find(id)
    end

    field :books, [BookType], null: true do
      description "gets all books"
    end

    def books
      Book.all.order(:title)
    end

    field :book, BookType, null: true do
      description "Find a book by id"
      argument :id, ID, required: true
    end

    def book(id:)
      Book.find(id)
    end
  end
end
