const functions = require('firebase-functions');
var sha256 = require("sha256");
const fetch = require('node-fetch');
var ip = require('ipaddr.js')

const admin = require("firebase-admin");
const nodemailer = require('nodemailer');
var _nanoid = require("nanoid");
const nanoid = (0, _nanoid.customAlphabet)('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10);
const cors = require('cors')({
  origin: true
})

admin.initializeApp();

function cleanupAddress(str) {
  // if it's a valid ipv6 address, and if its a mapped ipv4 address,
  // then clean it up. otherwise return the original string.
  if (ip.IPv6.isValid(str)) {
    var addr = ip.IPv6.parse(str);
    if (addr.isIPv4MappedAddress())
      return addr.toIPv4Address().toString();
  }
  return str
}

function emailOptions(title, content) {
  return {
    from: "firstspecialisedmedicalcenter@gmail.com",
    replyTo: "firstspecialisedmedicalcenter@gmail.com",
    to: "firstspecialisedmedicalcenter@gmail.com",
    subject: `${title}`,
    text: content,
    html: `
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td style="padding: 20px 0 30px 0;">

                <table align="center" border="0" cellpadding="0" cellspacing="0" width="90%"
                    style="border-collapse: collapse;">
                    <tr>
                        <td align="right" bgcolor="#fff" style="padding: 20px 0 10px 0;">
                            <img src="https://fsmc360.com/static/media/logo.e429f2d1.png" alt="Creating Email Magic."
                                width="300" height="77" style="display: block;" />
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" style="padding: 20px 10px 20px 10px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                style="border-collapse: collapse;">
                                <tr>
                                    <td style="color: #929292; font-family: Arial, sans-serif; text-align: right;">
                                        <h6 style="font-size: 16px; margin: 0;">: المحتوى</h6>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="color: #000; font-family: Arial, sans-serif; text-align: right; line-height: 24px; font-size: 24px; padding: 0 0 30px 0;">
                                        <h5 style="margin: 0;">${content}</h5>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
             
                </table>

            </td>
        </tr>
    </table>
        `,
  }
}

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});


const urwayPassword = functions.config().urway.password;
const urwayTerminalId = functions.config().urway.termindalid;
const urwayUrl = functions.config().urway.url;
const urwayMerchantKey = functions.config().urway.mechantkey;

// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = 'المركز الإختصاصي الطبي الأول';

// [START sendWelcomeEmail]
/**
 * Sends a welcome email to new user.
 */
// [START onCreateTrigger]
exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  // [END onCreateTrigger]
  // [START eventAttributes]
  const email = user.email; // The email of the user.
  const displayName = user.displayName; // The display name of the user.
  // [END eventAttributes]

  return sendWelcomeEmail(email, displayName);
});
// [END sendWelcomeEmail]

// [START sendByeEmail]
/**
 * Send an account deleted email confirmation to users who delete their accounts.
 */
// [START onDeleteTrigger]
exports.sendByeEmail = functions.auth.user().onDelete((user) => {
  // [END onDeleteTrigger]
  const email = user.email;
  const displayName = user.displayName;

  return sendGoodbyeEmail(email, displayName);
});
// [END sendByeEmail]

// Sends a welcome email to the given user.
async function sendWelcomeEmail(email, displayName) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email,
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = `مرحباً بك في ${APP_NAME}!`;
  mailOptions.text = `مرحباً ${displayName || ''}! مرحباً بك في ${APP_NAME}. تم إنشاء حساب خاص بك.`;
  await mailTransport.sendMail(mailOptions);
  //console.log('New welcome email sent to:', email);
  return null;
}

// Sends a goodbye email to the given user.
async function sendGoodbyeEmail(email, displayName) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email,
  };

  // The user unsubscribed to the newsletter.
  mailOptions.subject = `مع السلامة!`;
  mailOptions.text = `مرحباً ${displayName || ''}!, تم مسح حساب ${APP_NAME} الخاص بكم.`;
  await mailTransport.sendMail(mailOptions);
  //console.log('Account deletion confirmation email sent to:', email);
  return null;
}


//generic email function
//contact form
exports.sendEmailNotification = functions.https.onCall((data, context) => {
  const mailOptions = {
    from: "firstspecialisedmedicalcenter@gmail.com",
    replyTo: "firstspecialisedmedicalcenter@gmail.com",
    to: "firstspecialisedmedicalcenter@gmail.com",
    subject: `${data.title}`,
    text: data.content,
    html: `
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td style="padding: 20px 0 30px 0;">

                <table align="center" border="0" cellpadding="0" cellspacing="0" width="90%"
                    style="border-collapse: collapse;">
                    <tr>
                        <td align="right" bgcolor="#fff" style="padding: 20px 0 10px 0;">
                            <img src="https://fsmc360.com/static/media/logo.e429f2d1.png" alt="Creating Email Magic."
                                width="300" height="77" style="display: block;" />
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" style="padding: 20px 10px 20px 10px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                style="border-collapse: collapse;">
                                <tr>
                                    <td style="color: #929292; font-family: Arial, sans-serif; text-align: right;">
                                        <h6 style="font-size: 16px; margin: 0;">: المحتوى</h6>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="color: #000; font-family: Arial, sans-serif; text-align: right; line-height: 24px; font-size: 24px; padding: 0 0 30px 0;">
                                        <h5 style="margin: 0;">${data.content}</h5>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
             
                </table>

            </td>
        </tr>
    </table>
        `,
  }

  return mailTransport.sendMail(mailOptions).then(() => {
    //console.log('New email sent to:', "firstspecialisedmedicalcenter@gmail.com")
    return ({
      isEmailSend: true
    })
  })
})
//end generic email function


exports.createUser = functions.https.onCall((data, context) => {
  if (context.auth.token.admin !== true) {
    return { error: 'Only admins can create users' }
  }
  // get user and add admin custom claim
  return admin.auth().createUser(data).then((userRecord) => {
    return {
      message: userRecord
    };
  }).catch((error) => {
    console.log(error)
    let mailOptions = emailOptions("Create User Email", "Create User Function Error: " + err)
    return mailTransport.sendMail(mailOptions).then(() => {
      //console.log('New email sent to:', "firstspecialisedmedicalcenter@gmail.com")
      return ({
        isEmailSend: true
      })
    })
  });
})

exports.updatePassword = functions.https.onCall((data, context) => {
  if (context.auth.token.admin !== true) {
    return { error: 'Only admins can update users' }
  }
  return admin
    .auth()
    .getUserByEmail("egmixer+2@gmail.com")
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
    return admin
        .auth()
        .updateUser(userRecord.uid, {
          password: data.password
        })
        .then((userRecord) => {
          // See the UserRecord reference doc for the contents of userRecord.
          return ({
            message: userRecord
          });
        })
        .catch((error) => {
          console.log('Error updating user:', error);
          let mailOptions = emailOptions("Update password Email", "Update password Function Error: " + err)
          return mailTransport.sendMail(mailOptions).then(() => {
            //console.log('New email sent to:', "firstspecialisedmedicalcenter@gmail.com")
            return ({
              isEmailSend: true
            })
          })
        });
    })
    .catch((error) => {
      console.log('Error fetching user data:', error);
    });

})

exports.deleteUser = functions.https.onCall((data, context) => {
  if (context.auth.token.admin !== true) {
    return { error: 'Only admins can delete users' }
  }
  // get user and add admin custom claim
  return admin.auth().deleteUser(data.uid).then(() => {
    return {
      message: 'Successfully deleted user'
    };
  }).catch((error) => {
    console.log(error)
    let mailOptions = emailOptions("Delete User Email", "Delete User Function Error: " + err)
    return mailTransport.sendMail(mailOptions).then(() => {
      //console.log('New email sent to:', "firstspecialisedmedicalcenter@gmail.com")
      return ({
        isEmailSend: true
      })
    })
  });
})



exports.addAdminRole = functions.https.onCall((data, context) => {
  if (context.auth.token.admin !== true) {
    return { error: 'Only admins can add admins' }
  }
  // get user and add admin custom claim
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true,
      employee: false
    })
  }).then(() => {
    return {
      message: `Success! ${data.email} has been made an admin.`
    }
  }).catch(err => {
    console.log(err)
  });
});



exports.removeAdminRole = functions.https.onCall((data, context) => {
  if (context.auth.token.admin !== true) {
    return { error: 'Only admins can remove admin roles' }
  }
  // get user and add admin custom claim
  return admin.auth().setCustomUserClaims(data.uid, {
    employee: true,
    admin: false
  }).then(() => {
    return {
      message: `Success! employee has been set`
    }
  }).catch(err => {
    console.log(err)
    let mailOptions = emailOptions("Remove Admin Role Email", "Remove Admin Role Function Error: " + err)
    return mailTransport.sendMail(mailOptions).then(() => {
      //console.log('New email sent to:', "firstspecialisedmedicalcenter@gmail.com")
      return ({
        isEmailSend: true
      })
    })
  });
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
// 

exports.getIp = functions.https.onCall((data, context) => {
  return context.rawRequest.ip
});


//request order
exports.reqPay = functions.https.onCall((data, context) => {

  let orderId = nanoid()
  let terminalId = urwayTerminalId;// Will be provided by URWAY
  let password = urwayPassword;// Will be provided by URWAY
  let merchant_key = urwayMerchantKey;// Will be provided by URWAY
  let currencycode = "SAR";
  let amount = data.amount;
  let paymentMethod = data.values.paymentMethod === "mada" ? "1" : "13";
  console.log(data.values.paymentMethod)
  /**let clientIp = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  let cleanedClientIp = cleanupAddress(clientIp); */

  let txn_details = orderId + '|' + terminalId + '|' + password + '|' + merchant_key + '|' + amount + '|' + currencycode;
  let hash = sha256(txn_details);



  return admin.firestore().collection('bookings').add({ ...data.values, timestamp: admin.firestore.FieldValue.serverTimestamp() }).then(writeResult => {

    let fields = {
      'trackid': orderId,
      'terminalId': terminalId,
      'customerEmail': "firstspecialisedmedicalcenter@gmail.com",
      'action': paymentMethod,  // action is always 1 
      'merchantIp': "188.30.135.122",
      'password': password,
      'currency': currencycode,
      'country': "SA",
      'amount': amount,
      'udf1': writeResult.id,//Response page URL
      'udf2': "http://fsmc360.com/confirm-order",//Response page URL
      'udf3': data.values.phoneNumber,
      'udf4': "",
      'udf5': "",
      'requestHash': hash  //generated Hash  
    }

    let dataStuff = JSON.stringify(fields)
    // write is complete here
    return fetch(urwayUrl, {
      method: 'post',
      body: dataStuff,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': dataStuff.length
      },
    })
      .then(res => res.json())
      .then(json => {
        return ({
          json
        })
      }).catch(err => {
        console.log(err)
        let mailOptions = emailOptions("Request Payment Redirection Email", "Request Payment Redirection Function Error: " + err)
        return mailTransport.sendMail(mailOptions).then(() => {
          //console.log('New email sent to:', "firstspecialisedmedicalcenter@gmail.com")
          return ({
            isEmailSend: true
          })
        })
      });
  }).catch(err => {
    console.log(err)
    let mailOptions = emailOptions("Request Payment Redirection Email", "Request Payment Redirection Function Error: " + err)
    return mailTransport.sendMail(mailOptions).then(() => {
      //console.log('New email sent to:', "firstspecialisedmedicalcenter@gmail.com")
      return ({
        isEmailSend: true
      })
    })
  })

})

//confirm order
exports.confPay = functions.https.onCall((data, context) => {
  let terminalId = urwayTerminalId;// Will be provided by URWAY
  let password = urwayPassword;// Will be provided by URWAY
  let merchant_key = urwayMerchantKey;// Will be provided by URWAY

  let requestHash = '' + data.params.TranId + '|' + merchant_key + '|' + data.params.ResponseCode + '|' + data.params.amount + '';
  let hash = sha256(requestHash);
  if (data.params.responseHash !== hash) {
    return ({
      message: "nomatch"
    });
  }
  let txn_details1 = '' + data.params.TrackId + '|' + terminalId + '|' + password + '|' + merchant_key + '|' + data.params.amount + '|SAR';
  let requestHash1 = sha256(txn_details1);

  let fields = {
    'trackid': data.params.TrackId,
    'terminalId': terminalId,
    'action': "10",
    'merchantIp': "188.30.135.122",
    'password': password,
    'currency': "SAR",
    'transid': data.params.TranId,
    'country': "SA",
    'amount': data.params.amount,
    'udf1': "",
    'udf2': "",//Response page URL
    'udf3': "",
    'udf4': "",
    'udf5': "Test5",
    'requestHash': requestHash1  //generated Hash  
  }

  let fieldsString = JSON.stringify(fields);

  return fetch(urwayUrl, {
    method: 'post',
    body: fieldsString,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': fieldsString.length
    },
  })
    .then(res => res.json())
    .then(json => {
      return admin.firestore().collection('bookings').doc(json.udf1).get().then(snapshot => {
        let needToContact = snapshot.data() ? snapshot.data().needToContact : false;

        if (needToContact === undefined) {
          admin.firestore().collection('bookings').doc(json.udf1).update({
            paid: json.result === "Successful" ? "yes" : "no",
            responseCode: data.params.ResponseCode,
            maskedPAN: json.maskedPAN,
            needToContact: json.result === "Successful" ? true : "no",
            amount: json.amount,
            authcode: json.authcode,
            cardBrand: json.cardBrand,
            cardToken: json.cardToken,
            eci: json.eci,
            intUrl: json.intUrl,
            integrationData: json.integrationData,
            integrationModule: json.integrationModule,
            payid: json.payid,
            postData: json.postData,
            responseHash: json.responseHash,
            result: json.result,
            rrn: json.rrn,
            subscriptionId: json.subscriptionId,
            targetUrl: json.targetUrl,
            terminalid: json.terminalid,
            trackid: json.trackid,
            tranType: json.tranType,
            trandate: json.trandate,
            tranid: json.tranid
          }).then(function () {
            if (json.result === "Successful") {
              const mailOptions = {
                from: "firstspecialisedmedicalcenter@gmail.com",
                replyTo: "firstspecialisedmedicalcenter@gmail.com",
                to: "firstspecialisedmedicalcenter@gmail.com",
                subject: `حجز جديد - ${json.amount} ريال`,
                text: data.content,
                html: `
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td style="padding: 20px 0 30px 0;">
            
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="90%"
                                style="border-collapse: collapse;">
                                <tr>
                                    <td align="right" bgcolor="#fff" style="padding: 20px 0 10px 0;">
                                        <img src="https://fsmc360.com/static/media/logo.e429f2d1.png" alt="Creating Email Magic."
                                            width="300" height="77" style="display: block;" />
                                    </td>
                                </tr>
                                <tr>
                                    <td bgcolor="#ffffff" style="padding: 20px 10px 20px 10px;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                            style="border-collapse: collapse;">
                                            <tr>
                                                <td style="color: #929292; font-family: Arial, sans-serif; text-align: right;">
                                                    <h6 style="font-size: 16px; margin: 0;">: المحتوى</h6>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="color: #000; font-family: Arial, sans-serif; text-align: right; line-height: 24px; font-size: 24px; padding: 0 0 30px 0;">
                                                    <h5 style="margin: 0;"><br>
                                                    المبلغ: ${json.amount} ريال <br><br>
                                                    مرجعية الحوالة: ${json.trackid} <br></h5>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                         
                            </table>
            
                        </td>
                    </tr>
                </table>
                    `,
              }

              mailTransport.sendMail(mailOptions)
            }

          }).catch(err => { // level 1 error
            console.log(err)
            let mailOptions = emailOptions("Confirm Email", "Confirm Payment Function Error: " + err)
            return mailTransport.sendMail(mailOptions).then(() => {
              //console.log('New email sent to:', "firstspecialisedmedicalcenter@gmail.com")
              return ({
                isEmailSend: true
              })
            })
          })


        }
      }).then(writeResult => {
        return ({
          json
        });
      }).catch(err => { // level 2 error
        console.log(err)
        let mailOptions = emailOptions("Confirm Email", "Confirm Payment Function Error: " + err)
        return mailTransport.sendMail(mailOptions).then(() => {
          //console.log('New email sent to:', "firstspecialisedmedicalcenter@gmail.com")
          return ({
            isEmailSend: true
          })
        })
      })

    }).catch(err => {
      console.log(err)

      let mailOptions = emailOptions("Confirm Email", "Confirm Payment Function Error: " + err)
      return mailTransport.sendMail(mailOptions).then(() => {
        //console.log('New email sent to:', "firstspecialisedmedicalcenter@gmail.com")
        return ({
          isEmailSend: true
        })
      })
    })
})


exports.sendEmail = functions.https.onCall((data, context) => {

  // get user and add admin custom claim
  const mailOptions = {
    from: data.email,
    replyTo: data.email,
    to: "firstspecialisedmedicalcenter@gmail.com",
    subject: `${data.name} ترك ملاحظة`,
    text: data.content,
    html: `
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td style="padding: 20px 0 30px 0;">

            <table align="center" border="0" cellpadding="0" cellspacing="0" width="90%"
                style="border-collapse: collapse;">
                <tr>
                    <td align="right" bgcolor="#fff" style="padding: 20px 0 10px 0;">
                        <img src="https://fsmc360.com/static/media/logo.e429f2d1.png" alt="Creating Email Magic."
                            width="300" height="77" style="display: block;" />
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#ffffff" style="padding: 20px 10px 20px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%"
                            style="border-collapse: collapse;">
                            <tr>
                                <td style="color: #929292; font-family: Arial, sans-serif; text-align: right;">
                                    <h6 style="font-size: 16px; margin: 0;">: الإسم</h6>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style="color: #000; font-family: Arial, sans-serif; text-align: right; line-height: 24px; font-size: 24px; padding: 0 0 30px 0;">
                                    <h5 style="margin: 0;">${data.name}</h5>
                                </td>
                            </tr>

                            <tr>
                                <td style="color: #929292; font-family: Arial, sans-serif; text-align: right;">
                                    <h6 style="font-size: 16px; margin: 0;">: البريد الإلكتروني</h6>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style="color: #000; font-family: Arial, sans-serif; text-align: right; line-height: 24px; font-size: 24px; padding: 0 0 30px 0;">
                                    <h5 style="margin: 0;">${data.email}</h5>
                                </td>
                            </tr>

                            <tr>
                                <td style="color: #929292; font-family: Arial, sans-serif; text-align: right;">
                                    <h6 style="font-size: 16px; margin: 0;">: رقم الجوال</h6>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style="color: #000; font-family: Arial, sans-serif; text-align: right; line-height: 24px; font-size: 24px; padding: 0 0 30px 0;">
                                    <h5 style="margin: 0;"><a href="tel:${data.phoneNumber}">${data.phoneNumber}</a></h5>
                                </td>
                            </tr>
                            <tr>
                                <td style="color: #929292; font-family: Arial, sans-serif; text-align: right;">
                                    <h6 style="font-size: 16px; margin: 0;">: المحتوى</h6>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style="color: #000; font-family: Arial, sans-serif; text-align: right; line-height: 24px; font-size: 24px; padding: 0 0 30px 0;">
                                    <h5 style="margin: 0;">${data.content}</h5>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
         
            </table>

        </td>
    </tr>
</table>
    `,
  }

  return mailTransport.sendMail(mailOptions).then(() => {
    //console.log('New email sent to:', "firstspecialisedmedicalcenter@gmail.com")
    return ({
      isEmailSend: true
    })
  })
})


// errors in database
exports.localstorageErrors = functions.https.onCall((data, context) => {
  return admin.firestore().collection('localstorageErrors').add({ ip: context.rawRequest.ip, timestamp: admin.firestore.FieldValue.serverTimestamp() }).then(writeResult => {
    return ({
      json
    });
  }).catch(err => {
    console.log(err)
    let mailOptions = emailOptions("Localstorage Error", "Local Storage Function error: " + err)
    return mailTransport.sendMail(mailOptions).then(() => {
      //console.log('New email sent to:', "firstspecialisedmedicalcenter@gmail.com")
      return ({
        isEmailSend: true,
      })
    })
  })
})
exports.redirectionErrors = functions.https.onCall((data, context) => {
  return admin.firestore().collection('redirectionErrors').add({ ...data, ip: context.rawRequest.ip, timestamp: admin.firestore.FieldValue.serverTimestamp() }).then(writeResult => {
    return ({
      json
    });
  }).catch(err => {
    console.log(err)
    let mailOptions = emailOptions("Redirect Error", "Rediretion Function error: " + err)
    return mailTransport.sendMail(mailOptions).then(() => {
      //console.log('New email sent to:', "firstspecialisedmedicalcenter@gmail.com")
      return ({
        isEmailSend: true
      })
    })
  })
})




//double check payment

exports.doubleCheckPay = functions.https.onCall((data, context) => {
  let terminalId = urwayTerminalId;// Will be provided by URWAY
  let password = urwayPassword;// Will be provided by URWAY
  let merchant_key = urwayMerchantKey;// Will be provided by URWAY

  /* let requestHash = '' + data.params.TranId + '|' + merchant_key + '|' + data.params.ResponseCode + '|' + data.params.amount + '';
  let hash = sha256(requestHash);
  if (data.params.responseHash !== hash) {
    return ({
      message: "nomatch"
    });
  } */
  let txn_details1 = '' + data.params.id + '|' + terminalId + '|' + password + '|' + merchant_key + '|' + data.params.amount + '|SAR';
  let requestHash1 = sha256(txn_details1);

  let fields = {
    'action': "10",
    'merchantIp': "188.30.135.122",
    'password': password,
    'currency': "SAR",
    'country': "SA",
    'udf1': data.params.id,
    'udf2': "",//Response page URL
    'udf3': "",
    'udf4': "",
    'udf5': "Test5",
    'requestHash': requestHash1  //generated Hash  
  }

  let fieldsString = JSON.stringify(fields);

  return fetch(urwayUrl, {
    method: 'post',
    body: fieldsString,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': fieldsString.length
    },
  })
    .then(res => res.json())
    .then(json => {
      return admin.firestore().collection('bookings').doc(json.udf1).get().then(snapshot => {
        let needToContact = snapshot.data() ? snapshot.data().needToContact : false;

        if (needToContact === undefined) {
          admin.firestore().collection('bookings').doc(json.udf1).update({
            paid: json.result === "Successful" ? "yes" : "no",
            responseCode: data.params.ResponseCode,
            maskedPAN: json.maskedPAN,
            needToContact: json.result === "Successful" ? true : "no",
            amount: json.amount,
            authcode: json.authcode,
            cardBrand: json.cardBrand,
            cardToken: json.cardToken,
            eci: json.eci,
            intUrl: json.intUrl,
            integrationData: json.integrationData,
            integrationModule: json.integrationModule,
            payid: json.payid,
            postData: json.postData,
            responseHash: json.responseHash,
            result: json.result,
            rrn: json.rrn,
            subscriptionId: json.subscriptionId,
            targetUrl: json.targetUrl,
            terminalid: json.terminalid,
            trackid: json.trackid,
            tranType: json.tranType,
            trandate: json.trandate,
            tranid: json.tranid
          }).then(function () {
            if (json.result === "Successful") {
              const mailOptions = {
                from: "firstspecialisedmedicalcenter@gmail.com",
                replyTo: "firstspecialisedmedicalcenter@gmail.com",
                to: "firstspecialisedmedicalcenter@gmail.com",
                subject: `حجز جديد - ${json.amount} ريال`,
                text: data.content,
                html: `
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td style="padding: 20px 0 30px 0;">
            
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="90%"
                                style="border-collapse: collapse;">
                                <tr>
                                    <td align="right" bgcolor="#fff" style="padding: 20px 0 10px 0;">
                                        <img src="https://fsmc360.com/static/media/logo.e429f2d1.png" alt="Creating Email Magic."
                                            width="300" height="77" style="display: block;" />
                                    </td>
                                </tr>
                                <tr>
                                    <td bgcolor="#ffffff" style="padding: 20px 10px 20px 10px;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                            style="border-collapse: collapse;">
                                            <tr>
                                                <td style="color: #929292; font-family: Arial, sans-serif; text-align: right;">
                                                    <h6 style="font-size: 16px; margin: 0;">: المحتوى</h6>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="color: #000; font-family: Arial, sans-serif; text-align: right; line-height: 24px; font-size: 24px; padding: 0 0 30px 0;">
                                                    <h5 style="margin: 0;"><br>
                                                    المبلغ: ${json.amount} ريال <br><br>
                                                    مرجعية الحوالة: ${json.trackid} <br></h5>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                         
                            </table>
            
                        </td>
                    </tr>
                </table>
                    `,
              }

              mailTransport.sendMail(mailOptions)
            }

          }).catch(err => { // level 1 error
            console.log(err)
            let mailOptions = emailOptions("Confirm Email", "Confirm Payment Function Error: " + err)
            return mailTransport.sendMail(mailOptions).then(() => {
              //console.log('New email sent to:', "firstspecialisedmedicalcenter@gmail.com")
              return ({
                isEmailSend: true
              })
            })
          })


        }
      }).then(writeResult => {
        return ({
          json
        });
      }).catch(err => { // level 2 error
        console.log(err)
        let mailOptions = emailOptions("Confirm Email", "Confirm Payment Function Error: " + err)
        return mailTransport.sendMail(mailOptions).then(() => {
          //console.log('New email sent to:', "firstspecialisedmedicalcenter@gmail.com")
          return ({
            isEmailSend: true
          })
        })
      })

    }).catch(err => {
      console.log(err)

      let mailOptions = emailOptions("Confirm Email", "Confirm Payment Function Error: " + err)
      return mailTransport.sendMail(mailOptions).then(() => {
        //console.log('New email sent to:', "firstspecialisedmedicalcenter@gmail.com")
        return ({
          isEmailSend: true
        })
      })
    })
})