export default [
  {
    url: '/api/login',
    method: 'post',
    response: ({ body }) => {
      return {
        code: 200,
        data: {
          token: body.username === 'test' ? 'test-token' : 'admin-token',
        },
      }
    },
  },
]
