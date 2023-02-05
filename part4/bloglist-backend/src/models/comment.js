const { default: mongoose } = require("mongoose");

const commentSchema = mongoose.Schema({
    blogId: mongoose.Schema.Types.ObjectId,
    comment: String
});

commentSchema.set("toJSON", {
    transform: (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

module.exports = new mongoose.model("comments", commentSchema);