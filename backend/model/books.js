import mongoose from "mongoose"

const bookSchema = mongoose.Schema({
    title: {
        type:String,
        required: [true, 'please add book title'],
        maxlength:50
    },
    genre: {
        type:String,
        required: [true, 'please add a genre'],
        maxlength:50
    },
    author: {
        type:String,
        required: [true, 'please add an author'],
        maxlength: 50
    },
},
{
    timestamps: true
}
)

export const Book = mongoose.model('Book', bookSchema)