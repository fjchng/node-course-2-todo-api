const expect = require('chai').expect
const request = require('supertest')


const {ObjectID} = require('mongodb')
const {app} = require('./../server.js')
const {Todo} = require('./../models/todo')

const todos = [{
	_id: new ObjectID(),
	text: 'first test todo'
}, {
	_id: new ObjectID(),
	text: 'second test todo',
	completed: true,
	completedAt: 333
}]


beforeEach((done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos)
	}).then(() => done())
})

describe('POST /todos', () => {
	it('should create a new todo', (done) => {
		var text = 'Test todo text'

		request(app)
		.post('/todos')
		.send({text})
		.expect(200)
		.expect((res) => {
			expect(res.body.text).to.equal(text)
		})
		.end((err,res) => {
			if (err) {
				return done(err);
			}
			Todo.find({text}).then((todos) => {
				expect(todos.length).to.equal(1)
				expect(todos[0].text).to.equal(text)
				done()
			}).catch((e) => done(e))
		})
	})

	it('should not create todo with invalid body data', (done) => {
		request(app)
		.post('/todos')
		.send({})
		.expect(400)
		.end((err,res)=> {
			if (err) {
				return done(err)
			}
			Todo.find().then((todos) => {
				expect(todos.length).to.equal(2);
				done();
			}).catch((e) => done(e));
		})
	})
})

describe('GET /todos', () => {
	it('should get all todos', (done) => {
		request(app)
		.get('/todos')
		.expect(200)
		.expect((res) => {
			expect(res.body.todos.length).to.equal(2)
		})
		.end(done)
	})

	it('should return todo doc', (done) => {
		request(app)
		.get(`/todos/${todos[0]._id.toHexString()}`)
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).to.equal(todos[0].text)
		})
		.end(done)
	})

	it('should return 404 if todo not found', (done) => {
		var hexId = new ObjectID().toHexString()
		request(app)
		.get(`/todos/${hexId}`)
		.expect(404)
		.end(done)
	})


	it('should return 404 for non-object ids', (done) => {
		request(app)
		.get('/todos/123abc')
		.expect(404)
		.end(done)
	})

})

describe('DELETE /todos', () => {
	it('should return deleted todo doc', (done) => {
		var id = todos[0]._id.toHexString()
		request(app)
		.delete(`/todos/${id}`)
		.expect(200)
		.expect((res) => {
			expect(res.body.todo._id).to.equal(id)
		})
		.end((err, res) => {
			if (err) {
				return done(err);
			}
			Todo.findById(id).then((todo) => {
				expect(todo).to.not.exist
				done()
			}).catch((e) => done(e))
		})
	})

	it('should return 404 if for todo not found', (done) => {
		var id = '5b29c6f405355631ba9967dz'
		request(app)
		.delete(`/todos/${id}`)
		.expect(404)
		.end(done)
	})

	it('should return 404 for invalid id', (done) => {
		var id = '123abc'
		request(app)
		.delete(`/todos/${id}`)
		.expect(404)
		.end(done)
	})
})

describe('PATCH /todos', () => {
	it('should update the todo doc', (done) => {
		var id = todos[0]._id.toHexString()
		var text = 'New todo name'
		request(app)
		.patch(`/todos/${id}`)
		.send({
			text,
			completed: true
		})
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).to.equal(text)
			expect(res.body.todo.completed).to.equal(true)
			expect(res.body.todo.completedAt).to.be.a('number')
		})
		.end(done)
	})

	it('should clear completedAt when todo is not completed', (done) => {
		var id = todos[1]._id.toHexString()
		var text = 'New todo name 2'
		request(app)
		.patch(`/todos/${id}`)
		.send({
			text,
			completed: false
		})
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).to.equal(text)
			expect(res.body.todo.completed).to.equal(false)
			expect(res.body.todo.completedAt).to.not.exist
		})
		.end(done)
	})
})