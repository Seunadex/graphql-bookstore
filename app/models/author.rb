class Author < ApplicationRecord
  has_many :books, dependent: :destroy
  validates :name, presence: true, uniqueness: { case_sensitive: false }
  validates :age, numericality: true
end
