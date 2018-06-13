// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(url, (err, client) => {
	if (err) {
		// return prevent further messages
		return console.log('Unable to connect to MongoDB server.');
	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	// db.collection('Todos').insertOne({
	// 	text: 'Something to do',
	// 	completed: false
	// }, (err, result) => {
	// 	if (err) {
	// 		return console.log('Unable to insert todo.', err)
	// 	}

	// 	console.log(JSON.stringify(result.ops, undefined, 2))
	// });

	// Insert new doc into users (name, age, location)

	// db.collection('Users').insertOne({
	// 	name: 'Ann',
	// 	age: '23',
	// 	location: 'Canada'
	// }, (err, result) => {
	// 	if (err) {
	// 		return console.log('Unable to insert user', err)
	// 	}
	// 	// console.log(JSON.stringify(result.ops, undefined, 2))
	// });

	client.close();
});

