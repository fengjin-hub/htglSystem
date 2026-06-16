export default [
  {
    url: '/api/login',
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: {
          token: 'admin-token',
        },
      }
    },
  },
]
