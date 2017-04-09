module.exports = function (env) {
  switch(env){
    case "test":
      return {
        url: 'mongodb://master:djqgldj1234@ds157040.mlab.com:57040/uphere_test',
      }
    case "development":
      return {
        url: 'mongodb://127.0.0.1:27017',
      };
      break;
    case "production":
      return {
        url: 'mongodb://master:doveloper@ds149040.mlab.com:49040/uphere-testdb',
      };
      break;
    default:
      return {
        url: 'mongodb://master:doveloper@ds149040.mlab.com:49040/uphere-testdb',
      };
  }
};
