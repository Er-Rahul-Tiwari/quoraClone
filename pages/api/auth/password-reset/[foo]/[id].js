export default function activate(req, res) {
  return new Promise((resolve, reject) => {
    const url =
      "https://server.collectanea.co/api/auth/password-reset-complete/";
    switch (req.method) {
      case "GET":
        let uidb64 = req.query.foo;
        let id = req.query.id;

        /*fetch(url, {
          method: "PATCH",
        })
          .then((response) => {
            if (response.status == 200) {
              res.statusCode = 200;
              res.setHeader("Content-Type", "text/html");
              res.end();
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
              res.end();
            } else {
              res.statusCode = 500;
              res.setHeader("Content-Type", "text/html");
              res.end();
            }
          });*/
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");        
        res.end(
          "<!DOCTYPE html>" +
            "<html>" +
            "<head>" +
            "<title>Change password</title>" +
            '<meta name="viewport" content="width=device-width, initial-scale=1">' +
            '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">' +
            '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>' +
            '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>' +
            '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>' +
            "</head>" +
            "<body>" +
            '<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 40vh; margin-bottom: auto;">' +
            '<div class="spinner-border"></div>' +
            "</div>" +
            "</body>" +
            "</html>"
        );        
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
