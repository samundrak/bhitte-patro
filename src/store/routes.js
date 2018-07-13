export default function(router) {
  return router
    .post('/change_year_cursor', async (req, res) => {
      return { cursorYear: req.body.year };
    })
    .post('/change_calendar_view', async req => {
      return { calendarView: req.body.view };
    })
    .post('/change_cursor', async req => {
      const date = { ...req.body.date };
      date.year = parseInt(date.year);
      return { cursor: date };
    });
}
