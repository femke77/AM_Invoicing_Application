// some errors I like to really customize for the front end to display nicely to the user
// the invoice errors are fine how they are. The user won't see them anyway. I've protected the route to the page.

/* {
	"statusCode": 403,
	"message": "Forbidden resource",
	"error": "Forbidden",
	"timestamp": "2024-11-03T09:04:55.693Z",
	"path": "/api/invoices",
	"correlationId": "89299253-bcee-4be0-90b5-dd10cfd14ca9"
}*/

const errors = {
  loginFailed: {
    statusCode: 401,
    message: "There was a problem with your login, try again.",
    error: "Unauthorized",
    details: {
      requiredAuth: true,
      authType: "Bearer Token",
    },
  },
};

export default errors;
