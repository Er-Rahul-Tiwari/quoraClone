export default function activate(req, res) {
  return new Promise((resolve, reject) => {
    const url = "https://server.collectanea.co/api/auth/activate/";
    switch (req.method) {
      case "GET":
        fetch(url + req.query.foo + "/" + req.query.id)
          .then((response) => {
            if (response.status == 200) {
              res.statusCode = 200;
              res.setHeader("Content-Type", "text/html");
              res.end(
                "<html>" +
                  "<head><link href='https://fonts.googleapis.com/css2?family=Manrope:wght@200&display=swap' rel='stylesheet'>" +
                  "<style>h1 {font-family: 'Manrope', sans-serif;}</style> </head>" +
                  "<body><h1 style='text-align: center;'>Account activated <a href='localhost:3000'>return to the site</a></h1></body>" +
                  "</html>"
              );
              resolve();
            } else {
              let error = new Error();
              error.response = response;
              throw error;
            }
          })
          .catch((error) => {
            if (error.response.status == 401) {
              res.statusCode = 401;
              res.setHeader("Content-Type", "text/html");
              res.end(
                "<html>" +
                  "<head><link href='https://fonts.googleapis.com/css2?family=Manrope:wght@200&display=swap' rel='stylesheet'>" +
                  "<style>h1 {font-family: 'Manrope', sans-serif;}</style> </head>" +
                  "<body><h1 style='text-align: center;'>You are unauthorized, either the token has expired or you are unauthorized <a href='localhost:3000'>return to the site</a></h1></body>" +
                  "</html>"
              );
            } else {
              res.statusCode = 500;
              res.setHeader("Content-Type", "text/html");
              res.end(
                "<html>" +
                  "<head><link href='https://fonts.googleapis.com/css2?family=Manrope:wght@200&display=swap' rel='stylesheet'>" +
                  "<style>h1 {font-family: 'Manrope', sans-serif;}</style> </head>" +
                  "<body><h1 style='text-align: center;'>There was some problem, please try again <a href='localhost:3000'>return to the site</a></h1></body>" +
                  "</html>"
              );
            }
          });
        break;
      case "POST":
        res.status(405).end();
        reject();
        break;
      default:
        res.status(405).end();
        reject();
        break;
    }
  });
}
