import "./App.css";
import { useState } from "react";
import AWS from "aws-sdk";

function App() {
  //State
  const [email, setEmail] = useState("");

  //Handlers

  const handleSubmit = (e) => {
    e.preventDefault();

    var creds = new AWS.Credentials({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    });

    var myConfig = new AWS.Config({
      credentials: creds,
      region: "us-east-1",
    });

    AWS.config = myConfig;

    // Create subscribe/email parameters

    var params = {
      Protocol: "EMAIL" /* required */,
      TopicArn:
        "arn:aws:sns:us-east-1:807515211770:aws_notifications" /* required */,
      Endpoint: email,
    };

    // Create promise and SNS service object
    var subscribePromise = new AWS.SNS({ apiVersion: "2010-03-31" })
      .subscribe(params)
      .promise();

    // Handle promise's fulfilled/rejected states
    subscribePromise
      .then(function (data) {
        alert(
          "Tu correo ha sido enviado a la oficina 39 en pyeongjang Korea del Norte, Te enviaremos un correo de confirmación"
        );

        console.log("Subscription ARN is " + data.SubscriptionArn);
        setEmail("");
      })
      .catch(function (err) {
        console.error(err, err.stack);
      });
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="App">
      <div className="div-main">
        <h1>AWS NEWSLETTER</h1>
        <img
          src="https://www.cerner.com/-/media/cerner-media-united-states/solutions/managed-services-provider-aws-image.png?vs=1&h=1252&w=1272&la=en&hash=680EB1898C2831E4429562F12242D63F"
          width={200}
          alt="AWS LOGO"
        />
        <form onSubmit={handleSubmit}>
          <div className="form-email">
            <input
              type="email"
              value={email}
              placeholder="Ingresa tu correo electrónico"
              onChange={handleChange}
              required
            ></input>
            <input type="submit" value="Enviar"></input>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
