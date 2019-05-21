// exports.handler = function (event, context) { //eslint-disable-line
//   // event.body
//   console.log(`value1 = ${event.key1}`);
//   console.log(`value2 = ${event.key2}`);
//   console.log(`value3 = ${event.key3}`);
//   context.done(null, 'Hello World'); // SUCCESS with message
// };

exports.handler = function (event, context) {
  console.log('event: ', event)
  const body = {
    message: "Hello world!"
  }
  const response = {
    statusCode: 200,
    body
  }
  context.done(null, response);
}
