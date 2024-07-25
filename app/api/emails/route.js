const { Resend } = require("resend");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const Email = require("./emails/index");

const resend = new Resend(process.env.RESEND_API_KEY);

async function POST() {
  const emailHtml = ReactDOMServer.renderToString(React.createElement(Email, { url: "https://example.com" }));
  
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'claudiananjala7@gmail.com',
    subject: 'hello world',
    html: emailHtml,
  });
}

module.exports = { POST };
