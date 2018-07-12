router
  .post(
    '/todo',
    async (req) => {
      // Do some network task
      return {};
    },
    async (req, res) => {
      // transform payload, normalize, filter or sanitze data here
      return {};
    },
    async (req, res) => {
      // return this final state which can be used by reducer
      // we can get state on req.state
      return { todo: [req.body.item].concat(req.state.app.todo) };
    }
  )
  .patch('/todo', async (req) => {
    const todo = [].concat(req.state.app.todo);
    todo[req.body.index].value = req.body.value;
    return { todo };
  })
  .delete('/todo', async (req) => {
    const todo = [].concat(req.state.app.todo);
    todo.splice(req.body.index, 1);
    return { todo };
  });
