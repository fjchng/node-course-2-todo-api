
const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose.js')
const {Todo} = require('./../server/models/todo.js')
const {User} = require('./../server/models/user.js')

var id = '5b21f80f7f67361f05462014'

// if (!ObjectID.isValid(id)) {
// 	console.log('ID not valid')
// } else {
// 	Todo.findById(id).then((todo) => {
// 		if (!todo) {
// 			return console.log('Id not found')
// 		}
// 		console.log('Todo By Id', todo)
// 	}).catch((e) => console.log(e))
// }
// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log('Todos', todos)
// })

// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	console.log('Todo', todo)
// })

if (!ObjectID.isValid(id)) {
	console.log('User ID not valid')
} else {
	User.findById(id).then((user) => {
		if (!user){
			return console.log('User not found')
		}
		console.log('User by ID found: ', user)
	})
}