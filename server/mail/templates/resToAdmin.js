exports.responseToAdmin = (
    email,
    firstname,
    lastname,
    message,
    phoneNo,
    countrycode
  ) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Contact Form Confirmation</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .cta {
                display: inline-block;
                padding: 10px 20px;
                background-color: #FFD60A;
                color: #000000;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href="https://studynotion-frontend-ntp78ge9l-rohans-projects-49308115.vercel.app"><img class="logo"
                    src="https://res.cloudinary.com/dcczqo4ig/image/upload/v1739446545/Mega%20Ed-tech%20Project/rowslpfdi2peyjidkcym.jpg" alt="StudyNotion Logo"></a>
            <div class="message">Contact Form</div>
            <div class="body">
                <p>To StudyNotion, By ${firstname} ${lastname},</p>
                <p>We have received a message from a user of StudyNotion.
                </p>
                <p>Here are the details provided:</p>
                <p>Name: ${firstname} ${lastname}</p>
                <p>Email: ${email}</p>
                <p>Phone Number:${countrycode} ${phoneNo}</p>
                <p>Message: ${message}</p>
                <p>Hope you find this message Appropriate, will revert back to it Shortly. </p>
            </div>
            <div class="support">If you have any further questions or need immediate assistance, please feel free to reach
                out to us at <a href="mailto:rohan2003.02.11@gmail.com">info@studynotion.com</a>. We are here to help!</div>
        </div>
    </body>
    
    </html>`
  }
