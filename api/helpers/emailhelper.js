const nodemailer = require('nodemailer');


var transport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 't.e.s.t.a.a.p.p.p@gmail.com',
      pass: 'testapp123'
    }
});

exports.getSmpt = function() {
    return transport;
};