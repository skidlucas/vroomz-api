import swagger from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import { auth } from './modules/auth'

const app = new Elysia()
	.use(swagger())
	.onTransform(function log({ body, params, path, request: { method } }) {
		console.log(`${method} ${path}`, {
			body,
			params,
		})
	})
	.use(auth)
	.get('/', async () => {
		return 'Hello Elysia'
	})
	.listen(3000)

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
