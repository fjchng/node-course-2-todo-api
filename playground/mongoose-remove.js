
const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose.js')
const {Todo} = require('./../server/models/todo.js')
const {User} = require('./../server/models/user.js')

Todo.findOneAndRemove

Todo.findByIdAndRemove