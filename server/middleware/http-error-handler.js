
export const err401 = () => async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = { message: 'Log In is require for this resource' }
    } else {
      throw err
    }
  }
}
