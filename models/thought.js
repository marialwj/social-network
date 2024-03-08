const mongoose = require('mongoose');
const { Schema } = mongoose;

// Reaction subdocument schema
const ReactionSchema = new Schema({
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Getter method to format the timestamp
        get: timestamp => timestamp.toLocaleString()
    }
}, {
    toJSON: {
        getters: true,
        virtuals: true // If you decide to use virtuals
    },
    id: false // since it's a subdocument, it typically doesn't need its own id
});

// Thought schema
const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => timestamp.toLocaleString()
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
}, {
    toJSON: {
        getters: true,
        virtuals: true
    },
    id: false
});

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Create the Thought model from the schema
const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;
