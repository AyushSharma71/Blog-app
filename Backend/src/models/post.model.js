import mongoose from 'mongoose';
import slugify from 'slugify';
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    coverimage: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft",
    },
    likescount:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ]
}, { timestamps: true })

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
}, { timestamps: true })


// mongodb ka middleware hai jisme slug ko save hone se pehle save krege title koslug me convert krke save krdega
postSchema.pre("save", function() {
    if (!this.isModified("title")){
        return;
    }

    this.slug = slugify(this.title, { lower: true });
});

export const Post = mongoose.model("Post", postSchema);
export const Like = mongoose.model("Like", likeSchema);