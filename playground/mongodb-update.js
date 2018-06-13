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

	// db.collection('Todos').findOneAndUpdate({
	// 	_id: new ObjectID('5b20b9bec34d6815d261a3bc')
	// }, {
	// 	$set: {
	// 		completed: true,
	// 	}
	// }, {
	// 	returnOriginal: false
	// }).then((result)=> {
	// 	console.log(result);
	// })

	db.collection('Users').findOneAndUpdate({
		name: 'Daniel'
	}, {
		$set: {
			name: 'Jennifer'
		},
		$inc: {
			age: 1
		}
	}, {
		returnOriginal: false
	}).then((result)=> {
		console.log(result);
	})

	// client.close();
});

