export default function(router) {
  return router
    .post('/change_year_cursor', async (req, res) => {
      return { cursorYear: req.body.year };
    })
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
}
