import { Elysia, t } from 'elysia'
import { supabase } from '../libs/supabase'

export const auth = new Elysia({ prefix: '/auth' }).group('/auth', (app) =>
	app
		.model({
			auth: t.Object({
				email: t.String({
					format: 'email',
				}),
				password: t.String({
					minLength: 8,
				}),
			}),
		})
		.guard({
			body: t.Object({
				email: t.String({
					format: 'email',
				}),
				password: t.String({
					minLength: 8,
				}),
			}),
		})
		.post(
			'/sign-up',
			async ({ body }) => {
				const { data, error } = await supabase.auth.signUp(body)

				if (error) return error

				return data.user
			},
			{ body: 'auth' },
		)
		.post(
			'/sign-in',
			async ({ body }) => {
				const { data, error } = await supabase.auth.signInWithPassword(body)

				if (error) return error

				return data.session.access_token
			},
			{ body: 'auth' },
		),
)
