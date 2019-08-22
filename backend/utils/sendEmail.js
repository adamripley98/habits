const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');

// Import env variables
const { HOST_URL } = process.env;

// Helper method to send user a welcome email
const sendWelcomeEmail = (user, cb) => {
  // Generate a random token
  crypto.randomBytes(20, (errCrypto, buf) => {
    if (errCrypto) {
      cb({
        success: false,
        error: 'Error generating a token.',
      });
      return;
    }
    const token = buf.toString('hex');
    // If registration is successful, send an email welcoming to Nalda.
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // Email addresses them by first name
    const displayName = user.name.split(' ').length > 1 ? user.name.split(' ')[0] : user.name;

    // Create message
    const msg = {
      to: user.email,
      from: process.env.SENDGRID_EMAIL,
      subject: `Welcome to Dayli, ${displayName}! Verify your account.`,
      text: `Hi ${displayName}, \n Welcome to Dayli! Please verify your account at the following link:\n\n
      ${HOST_URL}/verify/${token}\n\n`,
    };

    // Send message
    sgMail.send(msg, (errEmail) => {
      if (errEmail) {
        console.log('err', errEmail);
        cb({
          success: false,
          error: errEmail,
        });
        return;
      }
      cb({
        success: true,
        error: '',
        token,
      });
    });
  });
};

module.exports = {
  sendWelcomeEmail,
};
