import "./App.css";
import { useState } from "react";
import AWS from "aws-sdk";

function App() {
  //State
  const [email, setEmail] = useState("");

  //Handlers

  //Subscribe Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    var creds = new AWS.Credentials({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
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
        console.log("Subscription ARN is " + data.SubscriptionArn);
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
        <form onSubmit={handleSubmit}>
          <div className="form-email">
            <input type="email" value={email} onChange={handleChange}></input>
            <input type="submit" value="Enviar"></input>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
