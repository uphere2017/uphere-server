module.exports = function (env) {
  switch(env){
    case "development":
      return {
        url: 'mongodb://127.0.0.1:27017/upheredb/',
      };
      break;
    case "production":
      return {
        url: 'mongodb://master:djqgldj1234@ds137100.mlab.com:37100/upheredb/',
      };
      break;
    default:
      return {
        url: 'mongodb://master:djqgldj1234@ds137100.mlab.com:37100/upheredb/',
      };
  }
};
