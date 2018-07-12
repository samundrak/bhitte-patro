# Domex (DOM & Express)

Browser base implementation of express.js like routing

# Why

Just & mostly helpful while making apps with redux as we don't have to write actions/reducers.
Also it doesn't affects browser url/routes, its just having express like routing on client side.

# Usage

import `Router` and `Domex`. Try to import it on root file and have instance per app.
`import { Router, Domex } from 'domex';`

Create instance of both router and domex.

```
const router = new Router();
const domex = new Domex();
```

Now define routes to be called later.

```
 router
    .post(
      '/todo',
      async req => {
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
      },
    )
    .patch('/todo', async req => {
      const todo = [].concat(req.state.app.todo);
      todo[req.body.index].value = req.body.value;
      return { todo };
    })
    .delete('/todo', async req => {
      const todo = [].concat(req.state.app.todo);
      todo.splice(req.body.index, 1);
      return { todo };
    });
```

Now add it to `Domex` instance.
`domex.addRouter(router);`

Now you can hit routes.

```
    // Create new item
    domex.resource.post('/todo', {
      data: { item: { id: Date.now(), value: this.state.currentTodo } },
    });

    // Update
    domex.resource.patch('/todo', {
            data: { value: event.target.value, index },
    });

    // Delete
    domex.resource.delete('/todo', {
        data: { index },
    });
```

##### If with react then you can pass it as props.

```
    ReactDOM.render(
    <Provider store={store}>
    <App domex={domex} />
    </Provider>,
    document.getElementById('root'),
    );
```
